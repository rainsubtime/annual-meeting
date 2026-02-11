import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { Message, AgentConfig, AgentResponse, AgentAction } from './types';
import { MessageBus } from './message-bus';
import { actionExecutor } from './action-executor';

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected model: any;

  constructor(config: AgentConfig) {
    this.config = config;

    // DeepSeek配置
    const deepseek = createOpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    });

    // 使用 chat 模型
    this.model = deepseek.chat(config.model || 'deepseek-chat');
  }

  async processMessage(message: Message, history: Message[]): Promise<AgentResponse> {
    console.log(`\n🤖 [${this.config.name}] Processing message...`);

    const shouldRespond = await this.decideShouldRespond(message, history);

    if (!shouldRespond) {
      console.log(`   ⏭️  Skipping - not relevant to ${this.config.role}`);
      return {
        agentName: this.config.name,
        shouldRespond: false,
      };
    }

    console.log(`   ✅ Deciding to respond!`);

    const response = await this.generateResponse(message, history);

    // Execute actions if any
    if (response.actions && response.actions.length > 0) {
      console.log(`   🎬 Executing ${response.actions.length} actions...`);
      const results = await actionExecutor.executeActions(response.actions, this.config.name);

      // Append action results to message
      if (response.message) {
        response.message += '\n\n' + results.join('\n');
      }
    }

    return response;
  }

  protected async decideShouldRespond(message: Message, history: Message[]): Promise<boolean> {
    // Skip own messages
    if (message.agentName === this.config.name) {
      return false;
    }

    const recentHistory = history.slice(-5).map(m =>
      `${m.agentName || m.role}: ${m.content}`
    ).join('\n');

    const prompt = `You are ${this.config.name}, a ${this.config.role}.

Recent conversation:
${recentHistory}

New message: ${message.content}

Should you respond to this message based on your role?
Consider:
1. Is this relevant to your expertise (${this.config.role})?
2. Can you add value to the conversation?
3. Is someone asking for your specific input?

Answer ONLY with "yes" or "no".`;

    try {
      const { text } = await generateText({
        model: this.model,
        prompt,
        temperature: 0.3,
      });

      return text.toLowerCase().includes('yes');
    } catch (error) {
      console.error(`Error in decideShouldRespond for ${this.config.name}:`, error);
      return false;
    }
  }

  protected async generateResponse(message: Message, history: Message[]): Promise<AgentResponse> {
    const recentHistory = history.slice(-8).map(m =>
      `${m.agentName || m.role}: ${m.content}`
    ).join('\n');

    const prompt = `${this.config.systemPrompt}

Recent conversation:
${recentHistory}

Current message: ${message.content}

Respond as ${this.config.name}.

IMPORTANT: You can take REAL ACTIONS! If you want to:
- Create a product: mention "CREATE_PRODUCT: {name, description, price, category, tags}"
- Create a blog post: mention "CREATE_POST: {title, content, tags}"
- Send chat message: mention "SEND_MESSAGE: {user, text}" (user is username, text is message content)

Example responses:
"Great idea! I'll create a blog post about this. CREATE_POST: {title: '5 Tips for...', content: 'Here are...', tags: ['tips', 'guide']}"
"Let me add a new product! CREATE_PRODUCT: {name: 'Cool Gadget', description: 'Amazing device', price: 99.99, category: 'Tech', tags: ['new']}"
"I'll post in the chatroom! SEND_MESSAGE: {user: 'ProductBot', text: 'Check out our new products! 🎉'}"

Be concise and actionable.`;

    try {
      const { text } = await generateText({
        model: this.model,
        prompt,
        temperature: this.config.temperature || 0.7,
      });

      // Parse actions from response
      const actions = this.parseActions(text);

      return {
        agentName: this.config.name,
        shouldRespond: true,
        message: text,
        actions,
        reasoning: `Responded as ${this.config.role}`,
      };
    } catch (error) {
      console.error(`Error in generateResponse for ${this.config.name}:`, error);
      return {
        agentName: this.config.name,
        shouldRespond: false,
      };
    }
  }

  private parseActions(text: string): AgentAction[] {
    const actions: AgentAction[] = [];

    // Parse CREATE_PRODUCT
    const productMatches = text.matchAll(/CREATE_PRODUCT:\s*(\{[^}]+\})/g);
    for (const match of productMatches) {
      try {
        const data = JSON.parse(match[1]);
        actions.push({ type: 'CREATE_PRODUCT', data });
      } catch (e) {
        console.error('Failed to parse CREATE_PRODUCT:', e);
      }
    }

    // Parse CREATE_POST
    const postMatches = text.matchAll(/CREATE_POST:\s*(\{[^}]+\})/g);
    for (const match of postMatches) {
      try {
        const data = JSON.parse(match[1]);
        actions.push({ type: 'CREATE_POST', data });
      } catch (e) {
        console.error('Failed to parse CREATE_POST:', e);
      }
    }

    // Parse SEND_MESSAGE
    const messageMatches = text.matchAll(/SEND_MESSAGE:\s*(\{[^}]+\})/g);
    for (const match of messageMatches) {
      try {
        const data = JSON.parse(match[1]);
        actions.push({ type: 'SEND_MESSAGE', data });
      } catch (e) {
        console.error('Failed to parse SEND_MESSAGE:', e);
      }
    }

    return actions;
  }
}
