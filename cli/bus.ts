import { AGENTS, runAgent, type AgentReply } from './agents';

export type BusMessage = { role: string; content: string };

/** Broadcast user message to all agents in parallel; each may reply and/or use tools. */
export async function broadcast(
  userMessage: string,
  recentHistory: BusMessage[]
): Promise<AgentReply[]> {
  const history = recentHistory.map((m) => ({ role: m.role, content: m.content }));
  const results = await Promise.all(
    AGENTS.map((a) => runAgent(a.name, a.system, userMessage, history))
  );
  return results.filter((r) => r.text.length > 0 || r.toolUsed);
}
