# 多Agent增长团队框架 - 实现计划

## 📋 项目概述

创建一个基于 `aisdk` 的多Agent对话框架，作为命令行工具运行。该框架模拟一个增长团队，多个Agent可以并发工作，通过消息总线进行通信，并能够自动修改mock数据来为电商网站、博客和聊天室生成内容。

## 🎯 核心功能

### 1. 消息总线系统 (Message Bus)
- **广播机制**: 每条消息自动发送给所有注册的Agent
- **消息格式**: 统一的消息结构，包含发送者、内容、类型、时间戳等
- **消息队列**: 支持异步消息处理，避免阻塞
- **消息过滤**: Agent可以订阅特定类型的消息

### 2. 多Agent并发系统
- **并发执行**: 所有Agent同时监听消息总线，独立决策
- **自动发言**: Agent根据消息内容自动决定是否响应
- **任务执行**: Agent可以执行各种操作（修改mock数据、生成内容等）
- **状态管理**: 每个Agent维护自己的状态和上下文

### 3. Agent角色定义
增长团队包含以下Agent角色：

#### 📊 数据分析师 (Data Analyst)
- **职责**: 分析网站数据，提出增长建议
- **能力**: 生成数据报告、识别增长机会
- **操作**: 读取mock数据，生成分析报告

#### ✍️ 内容创作者 (Content Creator)
- **职责**: 为博客和网站创建内容
- **能力**: 撰写文章、产品描述、营销文案
- **操作**: 创建/修改博客文章、产品描述

#### 🛒 产品经理 (Product Manager)
- **职责**: 管理电商产品目录
- **能力**: 添加产品、优化产品信息、管理库存
- **操作**: 添加/修改/删除产品数据

#### 💬 社区运营 (Community Manager)
- **职责**: 管理聊天室和用户互动
- **能力**: 生成聊天消息、回复用户、创建话题
- **操作**: 添加聊天消息、创建讨论话题

#### 📈 增长黑客 (Growth Hacker)
- **职责**: 协调团队，执行增长策略
- **能力**: 制定策略、协调其他Agent、执行A/B测试
- **操作**: 协调其他Agent，执行综合增长任务

## 🏗️ 架构设计

### 目录结构
```
multi-agent-framework/
├── src/
│   ├── core/
│   │   ├── MessageBus.ts          # 消息总线核心
│   │   ├── Agent.ts                # Agent基类
│   │   ├── Message.ts              # 消息类型定义
│   │   └── AgentRegistry.ts        # Agent注册表
│   ├── agents/
│   │   ├── BaseAgent.ts            # Agent抽象基类
│   │   ├── DataAnalyst.ts          # 数据分析师
│   │   ├── ContentCreator.ts       # 内容创作者
│   │   ├── ProductManager.ts       # 产品经理
│   │   ├── CommunityManager.ts     # 社区运营
│   │   └── GrowthHacker.ts         # 增长黑客
│   ├── data/
│   │   ├── MockDataStore.ts        # Mock数据存储
│   │   ├── schemas/
│   │   │   ├── product.ts          # 产品数据schema
│   │   │   ├── blog.ts             # 博客数据schema
│   │   │   └── chat.ts             # 聊天数据schema
│   │   └── stores/
│   │       ├── ProductStore.ts     # 产品数据存储
│   │       ├── BlogStore.ts        # 博客数据存储
│   │       └── ChatStore.ts        # 聊天数据存储
│   ├── utils/
│   │   ├── logger.ts               # 日志工具
│   │   └── config.ts                # 配置管理
│   └── cli/
│       ├── index.ts                 # CLI入口
│       ├── commands.ts              # 命令处理
│       └── repl.ts                  # 交互式REPL
├── data/
│   ├── products.json                # 产品mock数据
│   ├── blogs.json                   # 博客mock数据
│   └── chats.json                   # 聊天mock数据
├── package.json
├── tsconfig.json
└── README.md
```

### 核心类设计

#### MessageBus (消息总线)
```typescript
class MessageBus {
  private subscribers: Map<string, Agent[]>
  private messageQueue: Message[]
  
  // 订阅消息
  subscribe(agent: Agent, messageTypes?: string[]): void
  
  // 发布消息（广播给所有订阅者）
  publish(message: Message): Promise<void>
  
  // 处理消息队列
  private processQueue(): Promise<void>
}
```

#### Agent基类
```typescript
abstract class BaseAgent {
  protected name: string
  protected role: string
  protected messageBus: MessageBus
  protected dataStore: MockDataStore
  
  // 处理接收到的消息
  abstract onMessage(message: Message): Promise<void>
  
  // 决定是否响应消息
  protected shouldRespond(message: Message): Promise<boolean>
  
  // 发送消息到总线
  protected sendMessage(content: string, type: string): Promise<void>
  
  // 执行操作
  protected executeAction(action: Action): Promise<void>
}
```

#### MockDataStore (数据存储)
```typescript
class MockDataStore {
  private products: Product[]
  private blogs: BlogPost[]
  private chats: ChatMessage[]
  
  // 产品操作
  addProduct(product: Product): void
  updateProduct(id: string, updates: Partial<Product>): void
  getProducts(): Product[]
  
  // 博客操作
  addBlogPost(post: BlogPost): void
  updateBlogPost(id: string, updates: Partial<BlogPost>): void
  getBlogPosts(): BlogPost[]
  
  // 聊天操作
  addChatMessage(message: ChatMessage): void
  getChatMessages(): ChatMessage[]
  
  // 持久化
  save(): Promise<void>
  load(): Promise<void>
}
```

## 🔄 工作流程

### 1. 初始化流程
```
1. 加载配置文件
2. 初始化消息总线
3. 初始化Mock数据存储
4. 创建所有Agent实例
5. 注册Agent到消息总线
6. 启动CLI/REPL
```

### 2. 消息处理流程
```
用户输入/Agent发送消息
    ↓
消息总线接收消息
    ↓
广播给所有Agent（并发）
    ↓
每个Agent独立判断是否响应
    ↓
响应的Agent执行操作
    ↓
Agent发送新消息到总线（可选）
    ↓
循环处理
```

### 3. Agent决策流程
```
Agent接收消息
    ↓
分析消息内容（使用AI SDK）
    ↓
判断是否与自己的职责相关
    ↓
如果相关，生成响应计划
    ↓
执行操作（修改数据、生成内容等）
    ↓
发送结果消息到总线
```

## 🛠️ 技术栈

### 核心依赖
- **@ai-sdk/core**: AI SDK核心库
- **@ai-sdk/anthropic** 或 **@ai-sdk/openai**: AI提供商
- **commander**: CLI命令行解析
- **chalk**: 终端颜色输出
- **ora**: 加载动画
- **inquirer**: 交互式提示

### 开发依赖
- **typescript**: TypeScript支持
- **tsx**: TypeScript执行器
- **@types/node**: Node.js类型定义

## 📝 实现步骤

### Phase 1: 基础框架搭建
1. ✅ 创建项目结构和配置文件
2. ✅ 实现MessageBus核心类
3. ✅ 实现BaseAgent抽象类
4. ✅ 实现MockDataStore数据存储
5. ✅ 定义数据Schema（Product, BlogPost, ChatMessage）

### Phase 2: CLI工具开发
1. ✅ 实现命令行入口
2. ✅ 实现REPL交互式界面
3. ✅ 添加命令：start, stop, status, agents
4. ✅ 实现消息发送功能
5. ✅ 实现日志输出和格式化

### Phase 3: Agent实现
1. ✅ 实现DataAnalyst Agent
2. ✅ 实现ContentCreator Agent
3. ✅ 实现ProductManager Agent
4. ✅ 实现CommunityManager Agent
5. ✅ 实现GrowthHacker Agent

### Phase 4: AI集成
1. ✅ 集成AI SDK
2. ✅ 实现Agent决策逻辑（shouldRespond）
3. ✅ 实现Agent响应生成
4. ✅ 实现Agent操作执行

### Phase 5: 数据操作
1. ✅ 实现产品数据CRUD操作
2. ✅ 实现博客数据CRUD操作
3. ✅ 实现聊天数据CRUD操作
4. ✅ 实现数据持久化（JSON文件）

### Phase 6: 测试和优化
1. ✅ 单元测试
2. ✅ 集成测试
3. ✅ 性能优化
4. ✅ 错误处理完善

## 🎮 CLI使用示例

### 启动框架
```bash
multi-agent start
```

### 交互式对话
```bash
multi-agent chat
# 进入REPL模式，可以输入消息，Agent会自动响应
```

### 发送消息
```bash
multi-agent send "我们需要增加一些新产品来提升销售额"
```

### 查看Agent状态
```bash
multi-agent status
```

### 查看数据
```bash
multi-agent data products
multi-agent data blogs
multi-agent data chats
```

## 📊 数据格式（Mock数据）

### Product Schema
```typescript
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  createdAt: string
  updatedAt: string
}
```

### BlogPost Schema
```typescript
interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: string
  views: number
}
```

### ChatMessage Schema
```typescript
interface ChatMessage {
  id: string
  userId: string
  username: string
  content: string
  room: string
  timestamp: string
}
```

## 🔐 配置管理

### 配置文件 (config.json)
```json
{
  "ai": {
    "provider": "anthropic",
    "apiKey": "env:ANTHROPIC_API_KEY",
    "model": "claude-3-5-sonnet-20241022"
  },
  "agents": {
    "dataAnalyst": { "enabled": true },
    "contentCreator": { "enabled": true },
    "productManager": { "enabled": true },
    "communityManager": { "enabled": true },
    "growthHacker": { "enabled": true }
  },
  "data": {
    "path": "./data",
    "autoSave": true,
    "saveInterval": 5000
  }
}
```

## 🚀 未来扩展

1. **WebSocket支持**: 支持实时通信
2. **Agent插件系统**: 允许自定义Agent
3. **数据可视化**: 展示Agent活动和数据变化
4. **策略配置**: 允许配置Agent行为策略
5. **历史记录**: 保存对话历史和分析
6. **性能监控**: 监控Agent响应时间和资源使用

## 📚 注意事项

1. **并发安全**: 确保多个Agent同时修改数据时的线程安全
2. **消息去重**: 避免消息循环和重复处理
3. **错误处理**: 完善的错误处理和恢复机制
4. **资源限制**: 限制AI API调用频率和成本
5. **数据备份**: 定期备份mock数据

## 🎯 成功标准

- ✅ 多个Agent可以并发运行
- ✅ 消息总线正确广播消息
- ✅ Agent能够自动决策和响应
- ✅ Agent可以修改mock数据
- ✅ CLI工具友好易用
- ✅ 数据持久化正常
- ✅ 错误处理完善
