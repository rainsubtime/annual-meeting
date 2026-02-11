# 🚀 Multi-Agent Growth Team

一个基于 AI SDK 的多 Agent 框架，模拟一个完整的增长团队协作。

## 架构

### 核心组件

1. **MessageBus** (`agents/message-bus.ts`)
   - 消息广播系统
   - 所有消息都通过这个总线传递
   - 维护消息历史记录

2. **BaseAgent** (`agents/base-agent.ts`)
   - Agent 基类
   - 实现消息处理逻辑
   - 使用 DeepSeek API
   - 自动判断是否需要响应

3. **AgentCoordinator** (`agents/agent-coordinator.ts`)
   - 协调所有 Agent
   - 并发处理消息
   - 管理 Agent 生命周期

### Growth Agents

1. **ContentCreatorAgent** 📝
   - 创建博客内容
   - 撰写产品描述
   - 内容营销建议

2. **DataAnalystAgent** 📊
   - 数据分析
   - 识别增长机会
   - A/B 测试建议

3. **ProductManagerAgent** 🎯
   - 产品策略
   - 功能优先级
   - 产品路线图

4. **CommunityManagerAgent** 💬
   - 社区管理
   - 用户互动
   - 聊天室内容

## 使用方法

### 1. 安装依赖

```bash
npm install @ai-sdk/openai nanoid
```

需要的核心依赖：
- `ai` - Vercel AI SDK ✅
- `@ai-sdk/openai` - OpenAI 兼容 provider（用于 DeepSeek）⚠️ 需要安装
- `tsx` - TypeScript 执行器 ✅
- `nanoid` - ID 生成 ⚠️ 需要安装
- `dotenv` - 环境变量 ✅

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的 DeepSeek API Key：

```
DEEPSEEK_API_KEY=sk-xxx
```

### 3. 运行 CLI

```bash
npm run agent
```

### 4. 使用命令

- 直接输入消息与 Agent 团队对话
- `agents` - 查看所有激活的 Agent
- `clear` - 清除对话历史
- `exit` - 退出程序

## 工作原理

1. **消息广播**
   - 用户发送消息 → MessageBus 广播给所有 Agent

2. **并发处理**
   - 所有 Agent 同时收到消息
   - 每个 Agent 独立判断是否要响应

3. **智能响应**
   - Agent 通过 LLM 判断消息是否与自己职责相关
   - 相关则生成回复
   - 不相关则跳过

4. **异步协作**
   - 多个 Agent 可能同时响应
   - 响应按完成顺序显示

## 示例对话

```
👤 You: 我们需要为新产品写一篇博客文章

🤖 ContentCreator: 好的！我来创建一篇引人入胜的博客文章...
🤖 ProductManager: 我建议先确定产品的核心卖点...
🤖 DataAnalyst: 我可以分析哪些话题最受欢迎...
```

## 扩展 Agent

创建新 Agent：

```typescript
import { BaseAgent } from '../base-agent';

export class MyNewAgent extends BaseAgent {
  constructor() {
    super({
      name: 'MyAgent',
      role: 'My Role',
      systemPrompt: `You are...`,
      temperature: 0.7,
    });
  }
}
```

注册到 coordinator：

```typescript
coordinator.registerAgent(new MyNewAgent());
```

## 下一步

- [ ] 添加 Mock 数据操作功能
- [ ] 实现 Agent Actions（CREATE_PRODUCT, CREATE_POST 等）
- [ ] 与 Next.js 前端对接
- [ ] 数据持久化
- [ ] Web 界面查看 Agent 活动
