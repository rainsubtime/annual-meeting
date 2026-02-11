import { MessageBus } from './message-bus';
import { BaseAgent } from './base-agent';
import { Message, AgentResponse } from './types';
import { nanoid } from 'nanoid';

export class AgentCoordinator {
  private agents: BaseAgent[] = [];
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;

    // Listen to message bus
    this.messageBus.on('message', (message: Message) => {
      this.handleNewMessage(message);
    });
  }

  registerAgent(agent: BaseAgent) {
    this.agents.push(agent);
    console.log(`✅ Registered agent: ${(agent as any).config.name}`);
  }

  async handleNewMessage(message: Message) {
    // Get conversation history
    const history = this.messageBus.getHistory(15);

    // Process message concurrently with all agents
    console.log(`\n⚡ Processing message with ${this.agents.length} agents concurrently...`);

    const responses = await Promise.all(
      this.agents.map(agent => agent.processMessage(message, history))
    );

    // Filter agents that want to respond
    const activeResponses = responses.filter(r => r.shouldRespond);

    console.log(`\n💬 ${activeResponses.length} agents want to respond\n`);

    // Broadcast each response
    for (const response of activeResponses) {
      if (response.message) {
        const agentMessage: Message = {
          id: nanoid(),
          role: 'agent',
          content: response.message,
          agentName: response.agentName,
          timestamp: Date.now(),
          metadata: {
            reasoning: response.reasoning,
            actions: response.actions,
          },
        };

        // Add small delay to avoid message flooding
        await new Promise(resolve => setTimeout(resolve, 500));
        this.messageBus.broadcast(agentMessage);
      }
    }
  }

  getAgents() {
    return this.agents;
  }
}
