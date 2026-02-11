import { Message } from './types';
import { EventEmitter } from 'events';

export class MessageBus extends EventEmitter {
  private messages: Message[] = [];

  constructor() {
    super();
  }

  broadcast(message: Message) {
    this.messages.push(message);
    this.emit('message', message);
    console.log(`\n📢 [MESSAGE BUS] Broadcasting from ${message.agentName || message.role}:`);
    console.log(`   ${message.content.substring(0, 100)}${message.content.length > 100 ? '...' : ''}`);
  }

  getHistory(limit = 10): Message[] {
    return this.messages.slice(-limit);
  }

  clear() {
    this.messages = [];
  }
}

export const messageBus = new MessageBus();
