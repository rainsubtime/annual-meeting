# 项目规则 - UI 组件库使用指南

## 组件库规范

本项目使用**后现代主义涂鸦风格**的自定义 UI 组件库，位于 `/components/ui`。

### 强制规则

1. **必须使用项目组件库**
   - 所有 UI 组件必须从 `@/components/ui` 导入
   - 禁止使用外部 UI 库（shadcn/ui、MUI、Ant Design 等）
   - 禁止手写原始 HTML 按钮、输入框等基础组件

2. **可用组件清单**
   ```typescript
   import {
     // 基础组件
     Button,
     Input,
     Textarea,

     // 容器组件
     Card,
     CardHeader,
     CardBody,
     CardFooter,

     // 反馈组件
     Badge,
     Toast,
     ToastProvider,
     useToast,

     // 交互组件
     Modal,
     ModalHeader,
     ModalBody,
     ModalFooter,

     Tabs,
     TabsList,
     TabsTrigger,
     TabsContent,

     Dropdown,
     DropdownItem,
     DropdownSeparator,
     DropdownLabel,
   } from '@/components/ui';
   ```

3. **设计风格要求**
   - 必须保持涂鸦风格的一致性
   - 使用大写字母 + 宽字距（`uppercase tracking-wide`）
   - 使用粗体字（`font-bold` 或 `font-black`）
   - 添加适当的表情符号增强街头感
   - 文案要有态度，避免过于正式

4. **配色方案**
   - 主色：`var(--primary)` 霓虹粉 #ff006e
   - 辅助色：`var(--secondary)` 电光青 #00e0ff
   - 强调色：`var(--accent)` 鲜艳黄 #ffd60a
   - 成功：`var(--success)` 霓虹绿 #00ff88
   - 警告：`var(--warning)` 鲜艳黄 #ffd60a
   - 错误：`var(--error)` 霓虹粉 #ff006e
   - 信息：`var(--info)` 紫色 #8338ec

5. **Toast 使用规范**
   - 应用根部必须包裹 `<ToastProvider>`
   - 在组件中使用 `useToast()` hook
   - Toast 消息要有趣、有态度

   ```typescript
   // ✅ 正确示例
   const { addToast } = useToast();
   addToast({
     title: 'Boom! Success! 💥',
     description: 'Your changes are locked in!',
     status: 'success',
   });

   // ❌ 错误示例
   addToast({
     title: 'Success',
     description: 'Operation completed successfully.',
     status: 'success',
   });
   ```

6. **按钮变体选择**
   - `primary` - 主要操作（霓虹粉背景）
   - `secondary` - 次要操作（电光青背景）
   - `outline` - 辅助操作（粗边框）
   - `ghost` - 轻量操作（悬停显示）
   - `danger` - 危险操作（删除、取消等）

7. **Card 组件使用**
   - 大部分内容区块应该使用 Card 包裹
   - 启用 `hover` 效果增加互动性
   - 使用 `CardHeader`, `CardBody`, `CardFooter` 结构化内容

## 示例代码

### 表单示例
```typescript
<Card hover>
  <CardHeader title="User Info" subtitle="Update your profile 🎨" />
  <CardBody>
    <div className="space-y-4">
      <Input
        label="Username"
        placeholder="Your cool name"
        leftIcon={<UserIcon />}
      />
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        status="success"
      />
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        rows={4}
      />
    </div>
  </CardBody>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button variant="primary">Save Changes 🚀</Button>
  </CardFooter>
</Card>
```

### Modal 示例
```typescript
const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} size="lg">
  <ModalHeader title="Confirm Action 🤔" />
  <ModalBody>
    <p className="font-semibold text-lg">
      Are you sure you want to do this? This action cannot be undone!
    </p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>
      Nah, Cancel
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Yeah, Delete It! 🗑️
    </Button>
  </ModalFooter>
</Modal>
```

### Tabs 示例
```typescript
<Tabs defaultValue="overview" variant="pills">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="stats">Stats 📊</TabsTrigger>
    <TabsTrigger value="settings">Settings ⚙️</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    {/* Content */}
  </TabsContent>
</Tabs>
```

## 禁止事项

❌ **绝对不要做的事：**
1. 使用 `<button>` 替代 `<Button>`
2. 使用 `<input>` 替代 `<Input>`
3. 安装或使用其他 UI 库
4. 使用温和、正式的文案（这是涂鸦风格！）
5. 使用微妙的颜色（要大胆、鲜艳！）
6. 创建没有边框的平面设计
7. 使用小写字母作为标题或按钮文字

## 扩展组件

如果需要新组件：
1. 必须遵循涂鸦风格设计系统
2. 使用相同的设计 tokens（CSS 变量）
3. 包含粗边框、平移阴影、轻微旋转
4. 添加弹跳或倾斜动画
5. 保持大写文字和宽字距
6. 参考现有组件的实现模式

## 文案风格指南

### ✅ 推荐
- "Boom! Success! 💥"
- "Let's Go! 🚀"
- "Nah, Cancel"
- "Yeah, Delete It! 🗑️"
- "Hold Up! ⚠️"
- "Yo! Check This Out 👀"

### ❌ 避免
- "Operation completed successfully"
- "Please confirm"
- "Action cancelled"
- "Are you certain?"
- "Submit form"

## 记住

这是一个**充满态度的涂鸦风格组件库**！保持大胆、鲜艳、有趣！🎨💥🔥
