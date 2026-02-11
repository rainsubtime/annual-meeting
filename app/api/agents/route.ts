import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/mock-data/data-manager';
import { getMessages } from '@/lib/chat-store';

// Initialize data manager
let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await dataManager.load();
    initialized = true;
  }
}

export async function GET(request: NextRequest) {
  await ensureInitialized();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'stats') {
    const stats = dataManager.getStats();
    const chatMessages = getMessages();
    return NextResponse.json({
      ...stats,
      totalChatMessages: chatMessages.length,
    });
  }

  if (type === 'products') {
    return NextResponse.json(dataManager.getProducts());
  }

  if (type === 'posts') {
    return NextResponse.json(dataManager.getBlogPosts());
  }

  if (type === 'messages') {
    const limit = parseInt(searchParams.get('limit') || '50');
    const messages = getMessages();
    return NextResponse.json(messages.slice(-limit));
  }

  if (type === 'all') {
    return NextResponse.json({
      ...dataManager.getAllData(),
      chatMessages: getMessages(),
    });
  }

  return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
}
