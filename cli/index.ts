#!/usr/bin/env node
import * as readline from 'node:readline';

import { broadcast } from './bus';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const history: { role: string; content: string }[] = [];

function prompt(): void {
  rl.question('\n你> ', async (line) => {
    const msg = (line ?? '').trim();
    if (msg === '' || msg === 'exit' || msg === 'quit') {
      if (msg) process.exit(0);
      prompt();
      return;
    }
    history.push({ role: 'user', content: msg });
    process.stdout.write('\n[总线] 已广播给所有 agent，等待并发回复…\n');
    const replies = await broadcast(msg, history);
    for (const r of replies) {
      const tag = r.toolUsed ? ` [用了工具]` : '';
      process.stdout.write(`\n${r.name}${tag}: ${r.text}\n`);
      history.push({ role: 'assistant', content: `[${r.name}]: ${r.text}` });
    }
    if (replies.length === 0) process.stdout.write('\n(本轮无人回复)\n');
    prompt();
  });
}

console.log('多 Agent 增长团队 (消息总线 + 并发)\n');
console.log('Mock 数据目录: data/ (data.json, chat-mock.json, blog-mock.json, shop-mock.json)');
console.log('请设置 OPENAI_API_KEY。输入 exit 退出。\n');
prompt();
