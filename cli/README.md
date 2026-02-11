# 多 Agent 增长团队 CLI

基于 Vercel AI SDK 的终端工具：**消息总线 + 多 Agent 并发**。每条用户消息会广播给所有 Agent，Agent 并发运行，可自主决定是否回复或调用工具修改 mock 数据。

## 运行

```bash
export OPENAI_API_KEY=sk-...
pnpm run agent
```

## Mock 数据位置（Agent 可读写）

- `data/data.json` - 首页 / 聊天页等 UI 文案
- `data/chat-mock.json` - 聊天室预置消息
- `data/blog-mock.json` - 博客文章列表
- `data/shop-mock.json` - 电商商品

## 架构

- **消息总线**：用户输入 → 广播给所有 Agent
- **Agent**：增长-A（首页转化）、增长-B（互动/聊天/博客）、运营（商品/内容），均具备 `readMockData` / `writeMockData` 工具
- **并发**：`Promise.all` 同时跑多个 Agent，谁要发言或改数据谁就执行

Next.js 电商+博客+聊天室后续会对齐上述 data 下的 JSON 格式。
