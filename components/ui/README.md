# UI Component Library - Graffiti Edition 🎨

后现代主义涂鸦风格的 React 组件库 - 大胆、鲜艳、充满态度！

## 🎨 设计特色

- **配色方案**: 霓虹粉 × 电光青 × 鲜艳黄 - 超高对比度配色
- **字体**: Geist Sans - 粗体、大写、超宽字距
- **风格**: 后现代主义涂鸦美学 - 不规则边框、强烈阴影、手绘感
- **暗色模式**: 完整支持，霓虹发光效果
- **动画**: 弹跳、倾斜、旋转 - 充满能量的交互效果
- **特色元素**:
  - 粗边框（3-5px）
  - 强烈的平移阴影（box-shadow offset）
  - 元素轻微旋转（-2deg 到 2deg）
  - 悬停时的倾斜和位移效果
  - 虚线分隔符
  - 大写字母 + 宽字距

## 💥 视觉特点

这不是你祖母的 UI 库！这是街头风格的组件库：

- **粗暴的边框**: 2-5px 的粗黑边框，像手绘一样
- **炸裂的阴影**: 偏移的平移阴影，不是温柔的模糊
- **不规则的旋转**: 所有元素都轻微倾斜，充满动感
- **霓虹色彩**: 粉红、青色、黄色 - 高对比度配色方案
- **大写文字**: 全大写 + 超宽字距，态度十足
- **弹跳动画**: 元素出现时像街头篮球一样弹跳

## 📦 包含组件

### Button - 按钮
多种样式和尺寸的按钮组件，支持加载状态、禁用状态、图标等。

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" loading>Loading...</Button>
<Button variant="outline" leftIcon={<Icon />}>With Icon</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `loading`: boolean
- `disabled`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode

### Input & Textarea - 输入框
带标签、错误提示、图标的输入框组件。

```tsx
import { Input, Textarea } from '@/components/ui';

<Input
  label="Email"
  placeholder="your@email.com"
  leftIcon={<MailIcon />}
  error="Invalid email"
/>

<Textarea
  label="Description"
  rows={4}
  hint="Maximum 500 characters"
/>
```

**Props:**
- `label`: string
- `error`: string
- `hint`: string
- `status`: 'success' | 'warning' | 'error' | 'info'
- `leftIcon`, `rightIcon`: React.ReactNode

### Card - 卡片
灵活的卡片容器组件，包含 Header、Body、Footer。

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card hover shadowed>
  <CardHeader title="Card Title" subtitle="Subtitle" action={<Button>Edit</Button>} />
  <CardBody>
    Content goes here...
  </CardBody>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

**Props:**
- `hover`: boolean - 悬停效果
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `bordered`: boolean
- `shadowed`: boolean

### Badge - 徽章
小巧的标签组件，支持多种样式和状态。

```tsx
import { Badge } from '@/components/ui';

<Badge variant="primary">New</Badge>
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" removable onRemove={() => {}}>Tag</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: boolean
- `dot`: boolean
- `removable`: boolean

### Toast - 消息提示
全局消息提示组件，需要在应用根部使用 ToastProvider。

```tsx
import { ToastProvider, useToast } from '@/components/ui';

// 在 layout 或根组件中
<ToastProvider>
  <App />
</ToastProvider>

// 在组件中使用
function MyComponent() {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast({
      title: 'Success!',
      description: 'Operation completed',
      status: 'success',
      duration: 5000, // 可选，默认 5000ms
    });
  };
}
```

### Modal - 模态框
可定制的模态框组件，支持 ESC 关闭、背景点击关闭。

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui';

<Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
  <ModalHeader title="Modal Title" />
  <ModalBody>
    Modal content...
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={handleSave}>Save</Button>
  </ModalFooter>
</Modal>
```

**Props:**
- `open`: boolean
- `onClose`: () => void
- `size`: 'md' | 'lg' | 'xl'
- `closeOnOverlayClick`: boolean
- `closeOnEsc`: boolean
- `showCloseButton`: boolean

### Tabs - 标签页
标签页组件，支持 line 和 pills 两种样式。

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

<Tabs defaultValue="tab1" variant="line">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

**Props:**
- `defaultValue`: string
- `value`: string (受控)
- `onValueChange`: (value: string) => void
- `variant`: 'line' | 'pills'

### Dropdown - 下拉菜单
下拉菜单组件，支持图标、分隔符、危险操作等。

```tsx
import { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel } from '@/components/ui';

<Dropdown trigger={<Button>Actions</Button>}>
  <DropdownLabel>Options</DropdownLabel>
  <DropdownItem icon={<EditIcon />} onClick={() => {}}>Edit</DropdownItem>
  <DropdownItem onClick={() => {}}>Duplicate</DropdownItem>
  <DropdownSeparator />
  <DropdownItem destructive onClick={() => {}}>Delete</DropdownItem>
</Dropdown>
```

**Props:**
- `trigger`: React.ReactNode
- `align`: 'left' | 'right'
- `disabled`: boolean

## 🚀 使用方法

1. 所有组件都导出自 `@/components/ui`:

```tsx
import { Button, Input, Card, Modal, ... } from '@/components/ui';
```

2. Toast 组件需要在应用根部添加 Provider:

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

3. 查看示例页面 `app/page.tsx` 了解所有组件的使用示例。

## 🎨 自定义主题

所有颜色和样式都通过 CSS 变量定义在 `app/globals.css` 中，你可以轻松修改：

```css
:root {
  --primary: #ff006e;           /* 霓虹粉 */
  --secondary: #00e0ff;         /* 电光青 */
  --accent: #ffd60a;            /* 鲜艳黄 */
  --border-width: 3px;          /* 粗边框 */
  --border-width-thick: 5px;    /* 超粗边框 */
  --shadow: 5px 5px 0 rgba(0, 24, 88, 0.3);  /* 平移阴影 */
  /* ... 更多变量 */
}
```

### 涂鸦效果类

全局 CSS 中提供了特殊的涂鸦效果类：

- `.graffiti-text` - 双色阴影文字效果
- `.graffiti-outline` - 描边文字效果
- `.hand-drawn-border` - 手绘边框效果
- `.animate-wiggle` - 摇晃动画
- `.animate-bounce-in` - 弹入动画

## 📱 响应式设计

所有组件都支持响应式设计，在不同屏幕尺寸下都有良好的展示效果。

## ♿ 可访问性

组件遵循 WAI-ARIA 规范，支持键盘导航和屏幕阅读器。

## 🌙 暗色模式

组件库完整支持暗色模式，自动根据系统偏好切换。暗色模式下：
- 背景色变为深紫黑色
- 主色变得更亮更鲜艳（霓虹效果）
- 阴影带有发光效果
- 保持高对比度和涂鸦感

## 🎭 设计哲学

这个组件库拒绝：
- ❌ 通用的 AI 美学（Inter 字体、紫色渐变、千篇一律）
- ❌ 过于精致的企业风格
- ❌ 无聊的中性色调
- ❌ 谨慎保守的设计

这个组件库拥抱：
- ✅ 大胆的色彩对比
- ✅ 街头涂鸦的野性
- ✅ 不规则的、手绘感的元素
- ✅ 充满能量的动画
- ✅ 态度十足的设计语言

## 🚀 适用场景

完美适用于：
- 创意工作室网站
- 艺术家作品集
- 音乐/娱乐相关项目
- 潮流品牌网站
- 任何想要脱颖而出的项目

不太适合：
- 传统企业应用
- 银行/金融系统
- 医疗保健应用
- 需要极简风格的项目

记住：**这是一个有态度的组件库！** 🎨💥🔥

## 📄 License

MIT
