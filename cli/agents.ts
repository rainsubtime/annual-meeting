import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { mockDataTools } from './tools';

const apiKey = process.env.OPENAI_API_KEY ?? '';
const openai = createOpenAI({ apiKey });

const SYSTEM = `You are part of a growth team for a product that has: 1) E-commerce site (mock: data/shop-mock.json), 2) Blog (mock: data/blog-mock.json), 3) Chat room (mock: data/chat-mock.json, and main UI copy in data/data.json).
You can read and write these mock files with readMockData and writeMockData. Only speak when you have something useful to say or an action to take. Reply in Chinese unless the user writes in English.`;

export const AGENTS = [
  {
    name: '增长-A',
    system: SYSTEM + '\nYou focus on homepage and conversion. Suggest or add banners, promos, copy in data.json.',
  },
  {
    name: '增长-B',
    system: SYSTEM + '\nYou focus on engagement. Add chat welcome messages to chat-mock.json, or blog posts to blog-mock.json.',
  },
  {
    name: '运营',
    system: SYSTEM + '\nYou focus on content and catalog. Add or edit products in shop-mock.json, articles in blog-mock.json.',
  },
] as const;

export type AgentReply = { name: string; text: string; toolUsed?: boolean };

export async function runAgent(
  name: string,
  system: string,
  userMessage: string,
  recentHistory: { role: string; content: string }[]
): Promise<AgentReply> {
  const messages = [
    ...recentHistory.slice(-6),
    { role: 'user' as const, content: userMessage },
  ];
  try {
    const { text, toolCalls } = await generateText({
      model: openai('gpt-4o-mini'),
      system,
      messages,
      tools: mockDataTools,
      maxSteps: 5,
    });
    const toolUsed = (toolCalls?.length ?? 0) > 0;
    const reply = (text || '').trim();
    if (!reply && !toolUsed) return { name, text: '', toolUsed: false };
    return { name, text: reply || '[已执行工具，无额外回复]', toolUsed };
  } catch (e) {
    return { name, text: `[错误] ${String(e)}`, toolUsed: false };
  }
}
