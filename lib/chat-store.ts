/**
 * In-memory chat store with SSE broadcast.
 * Messages are lost on server restart (single process).
 */

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: number;
}

const messages: ChatMessage[] = [];
const subscribers = new Set<(msg: ChatMessage) => void>();

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getMessages(): ChatMessage[] {
  return [...messages];
}

export function addMessage(user: string, text: string): ChatMessage {
  const msg: ChatMessage = {
    id: generateId(),
    user: user.trim() || '匿名',
    text: text.trim(),
    time: Date.now(),
  };
  messages.push(msg);
  // Keep last 500 messages
  if (messages.length > 500) messages.splice(0, messages.length - 500);
  subscribers.forEach((cb) => cb(msg));
  return msg;
}

export function subscribe(callback: (msg: ChatMessage) => void): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}
