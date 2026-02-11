#!/usr/bin/env node
import * as readline from 'node:readline/promises';
import { messageBus } from '../agents/message-bus';
import { AgentCoordinator } from '../agents/agent-coordinator';
import {
  ContentCreatorAgent,
  DataAnalystAgent,
  ProductManagerAgent,
  CommunityManagerAgent,
} from '../agents/growth-agents';
import { Message } from '../agents/types';
import { nanoid } from 'nanoid';
import { dataManager } from '../mock-data/data-manager';
import 'dotenv/config';

// ASCII Art Banner
const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 MULTI-AGENT GROWTH TEAM 💥                          ║
║                                                           ║
║   Autonomous agents working together to grow your        ║
║   e-commerce site, blog, and community! 🔥               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;

async function main() {
  console.clear();
  console.log(banner);

  // Check for API key
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('\n❌ Error: DEEPSEEK_API_KEY not found in environment variables');
    console.log('\n💡 Create a .env file with:');
    console.log('   DEEPSEEK_API_KEY=your_api_key_here\n');
    process.exit(1);
  }

  console.log('\n🔧 Initializing Growth Team...\n');

  // Load mock data
  await dataManager.load();

  // Create coordinator
  const coordinator = new AgentCoordinator(messageBus);

  // Register agents
  coordinator.registerAgent(new ContentCreatorAgent());
  coordinator.registerAgent(new DataAnalystAgent());
  coordinator.registerAgent(new ProductManagerAgent());
  coordinator.registerAgent(new CommunityManagerAgent());

  console.log('\n✨ All agents ready!\n');
  console.log('💾 Data files:');
  console.log('   • data/shop-mock.json  - Products');
  console.log('   • data/blog-mock.json  - Blog posts');
  console.log('   • lib/chat-store.ts    - Chat messages (memory)\n');
  console.log('Commands:');
  console.log('   • Type anything to chat with the team');
  console.log('   • "agents"   - View all agents');
  console.log('   • "stats"    - View data statistics');
  console.log('   • "products" - List all products');
  console.log('   • "posts"    - List all blog posts');
  console.log('   • "messages" - List recent chat messages');
  console.log('   • "clear"    - Clear chat history');
  console.log('   • "exit"     - Quit\n');

  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const userInput = await terminal.question('\n👤 You: ');

    if (!userInput.trim()) continue;

    const input = userInput.trim().toLowerCase();

    // Handle commands
    if (input === 'exit' || input === 'quit') {
      console.log('\n👋 Goodbye! Keep growing! 🚀\n');
      terminal.close();
      process.exit(0);
    }

    if (input === 'clear') {
      messageBus.clear();
      console.clear();
      console.log(banner);
      console.log('\n🧹 Chat history cleared!\n');
      continue;
    }

    if (input === 'agents') {
      const agents = coordinator.getAgents();
      console.log('\n📋 Active Agents:\n');
      agents.forEach((agent: any, index) => {
        console.log(`   ${index + 1}. ${agent.config.name} - ${agent.config.role}`);
      });
      continue;
    }

    if (input === 'stats') {
      const stats = dataManager.getStats();
      const { getMessages } = await import('../lib/chat-store');
      const chatMessages = getMessages();
      console.log('\n📊 Mock Data Statistics:\n');
      console.log(`   Products: ${stats.totalProducts}`);
      console.log(`   Blog Posts: ${stats.totalBlogPosts}`);
      console.log(`   Chat Messages: ${chatMessages.length}`);
      console.log(`   Total Blog Views: ${stats.totalViews}`);
      continue;
    }

    if (input === 'products') {
      const products = dataManager.getProducts();
      console.log('\n🛍️ Products:\n');
      products.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name} - $${p.price} (${p.category})`);
        if (p.createdBy) console.log(`      Created by: ${p.createdBy}`);
      });
      continue;
    }

    if (input === 'posts') {
      const posts = dataManager.getBlogPosts();
      console.log('\n📝 Blog Posts:\n');
      posts.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.title}`);
        console.log(`      By: ${p.author} | Views: ${p.views}`);
        if (p.createdBy) console.log(`      Created by agent: ${p.createdBy}`);
      });
      continue;
    }

    if (input === 'messages') {
      const { getMessages } = await import('../lib/chat-store');
      const messages = getMessages().slice(-10);
      console.log('\n💬 Recent Chat Messages:\n');
      messages.forEach((m, i) => {
        console.log(`   ${i + 1}. ${m.user}: ${m.text}`);
        const time = new Date(m.time).toLocaleTimeString();
        console.log(`      ${time}`);
      });
      continue;
    }

    // Create user message
    const message: Message = {
      id: nanoid(),
      role: 'user',
      content: userInput,
      timestamp: Date.now(),
    };

    // Broadcast to all agents
    messageBus.broadcast(message);

    // Wait a bit for agents to process (they run concurrently)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(error => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
