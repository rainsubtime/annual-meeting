import { AgentAction } from './types';
import { dataManager } from '../mock-data/data-manager';
import { addMessage } from '../lib/chat-store';

export class ActionExecutor {
  async executeActions(actions: AgentAction[], agentName: string): Promise<string[]> {
    const results: string[] = [];

    for (const action of actions) {
      try {
        const result = await this.executeAction(action, agentName);
        results.push(result);
      } catch (error) {
        results.push(`❌ Failed to execute ${action.type}: ${error}`);
      }
    }

    return results;
  }

  private async executeAction(action: AgentAction, agentName: string): Promise<string> {
    switch (action.type) {
      case 'CREATE_PRODUCT':
        return this.createProduct(action.data, agentName);

      case 'CREATE_POST':
        return this.createBlogPost(action.data, agentName);

      case 'SEND_MESSAGE':
        return this.sendChatMessage(action.data, agentName);

      case 'UPDATE_DATA':
        return this.updateData(action.data, agentName);

      default:
        throw new Error(`Unknown action type: ${(action as any).type}`);
    }
  }

  private createProduct(data: any, agentName: string): string {
    const product = dataManager.addProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category || 'General',
      stock: data.stock || 100,
      tags: data.tags || [],
      image: data.image,
      createdBy: agentName,
    });

    return `✅ Created product: ${product.name} ($${product.price})`;
  }

  private createBlogPost(data: any, agentName: string): string {
    const post = dataManager.addBlogPost({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || data.content.substring(0, 150) + '...',
      author: agentName,
      tags: data.tags || [],
      createdBy: agentName,
    });

    return `✅ Created blog post: "${post.title}"`;
  }

  private sendChatMessage(data: any, agentName: string): string {
    // 使用 chat-store 的 addMessage 函数
    const message = addMessage(
      data.user || data.username || agentName,
      data.text || data.message
    );

    return `✅ Sent chat message as ${message.user}: "${message.text}"`;
  }

  private updateData(data: any, agentName: string): string {
    // Generic update handler
    if (data.type === 'product' && data.id) {
      const updated = dataManager.updateProduct(data.id, data.updates);
      return updated
        ? `✅ Updated product: ${updated.name}`
        : `❌ Product not found: ${data.id}`;
    }

    if (data.type === 'blogPost' && data.id) {
      const updated = dataManager.updateBlogPost(data.id, data.updates);
      return updated
        ? `✅ Updated blog post: ${updated.title}`
        : `❌ Blog post not found: ${data.id}`;
    }

    return `❌ Invalid update data`;
  }
}

export const actionExecutor = new ActionExecutor();
