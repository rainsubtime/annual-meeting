import { getMessages, addMessage, subscribe } from '@/lib/chat-store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = typeof body.user === 'string' ? body.user : '';
    const text = typeof body.text === 'string' ? body.text : '';
    if (!text) {
      return Response.json({ error: '消息不能为空' }, { status: 400 });
    }
    const msg = addMessage(user, text);
    return Response.json(msg);
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const send = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      // Send initial messages
      const initial = getMessages();
      send(JSON.stringify({ type: 'init', messages: initial }));

      const unsubscribe = subscribe((msg) => {
        try {
          send(JSON.stringify({ type: 'message', message: msg }));
        } catch {
          // client may have closed
        }
      });

      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'));
        } catch {
          clearInterval(keepAlive);
        }
      }, 15000);

      const onAbort = () => {
        clearInterval(keepAlive);
        unsubscribe();
        try {
          controller.close();
        } catch {
          // already closed
        }
      };
      request.signal?.addEventListener?.('abort', onAbort);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Connection: 'keep-alive',
    },
  });
}
