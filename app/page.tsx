'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  ToastProvider,
  useToast,
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

function ComponentShowcase() {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6 animate-bounce-in">
          <h1 className="text-6xl md:text-7xl font-black uppercase transform -rotate-2 leading-tight">
            <span className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-[var(--radius-lg)] border-[var(--border-width)] border-[var(--foreground)] shadow-[var(--shadow-lg)] transform rotate-2">
              UI Library
            </span>
            <br />
            <span className="inline-block bg-[var(--secondary)] text-[var(--foreground)] px-6 py-3 rounded-[var(--radius-lg)] border-[var(--border-width)] border-[var(--foreground)] shadow-[var(--shadow-lg)] transform -rotate-1 mt-4">
              Graffiti Style
            </span>
          </h1>
          <p className="text-2xl font-bold text-[var(--foreground)] transform rotate-1">
            后现代主义 × 涂鸦艺术 × React 组件
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Badge variant="primary" size="lg">TypeScript</Badge>
            <Badge variant="secondary" size="lg">Tailwind CSS</Badge>
            <Badge variant="success" size="lg" dot>
              暗色模式
            </Badge>
            <Badge variant="warning" size="lg">
              街头风格
            </Badge>
          </div>
        </div>

        {/* Buttons Section */}
        <Card hover>
          <CardHeader title="Buttons" subtitle="爆炸性的按钮组件 💥" />
          <CardBody>
            <div className="space-y-6">
              {/* Variants */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[var(--neutral-500)] uppercase">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[var(--neutral-500)] uppercase">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* States */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[var(--neutral-500)] uppercase">
                  States
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button
                    leftIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    }
                  >
                    With Icon
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Inputs Section */}
        <Card hover>
          <CardHeader title="Inputs" subtitle="输入框，但更酷 ✨" />
          <CardBody>
            <div className="space-y-4">
              <Input
                label="Username"
                placeholder="Enter your username"
                hint="Choose a unique username"
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                status="success"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                }
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />
              <Textarea
                label="Description"
                placeholder="Write a description..."
                hint="Maximum 500 characters"
                rows={4}
              />
            </div>
          </CardBody>
        </Card>

        {/* Badges Section */}
        <Card hover>
          <CardHeader title="Badges" subtitle="标签也能很街头 🏷️" />
          <CardBody>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" rounded>
                  Rounded
                </Badge>
                <Badge variant="success" dot>
                  With Dot
                </Badge>
                <Badge variant="warning" removable onRemove={() => console.log('Removed')}>
                  Removable
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover bordered shadowed>
            <CardHeader title="Basic Card" />
            <CardBody>
              <p className="text-[var(--neutral-600)] font-semibold">
                This card has attitude! 😎
              </p>
            </CardBody>
          </Card>

          <Card hover bordered shadowed>
            <CardHeader
              title="With Actions"
              action={
                <Button size="sm" variant="secondary">
                  Edit ✏️
                </Button>
              }
            />
            <CardBody>
              <p className="text-[var(--neutral-600)] font-semibold">Card with header actions.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>

          <Card hover padding="lg" bordered shadowed>
            <CardBody>
              <h3 className="text-lg font-extrabold mb-2 uppercase">Large Padding</h3>
              <p className="text-[var(--neutral-600)] font-semibold">Extra room to breathe! 🌬️</p>
            </CardBody>
          </Card>
        </div>

        {/* Tabs Section */}
        <Card hover>
          <CardHeader title="Tabs" subtitle="切换，但更有风格 🔥" />
          <CardBody>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p className="text-[var(--neutral-600)] font-semibold text-lg">Overview content - where the magic happens! ✨</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p className="text-[var(--neutral-600)] font-semibold text-lg">Analytics content - check out these stats! 📊</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p className="text-[var(--neutral-600)] font-semibold text-lg">Settings content - tweak it your way! ⚙️</p>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h4 className="text-sm font-black mb-4 uppercase tracking-wide">Pills Variant 💊</h4>
              <Tabs defaultValue="pill1" variant="pills">
                <TabsList>
                  <TabsTrigger value="pill1">Home</TabsTrigger>
                  <TabsTrigger value="pill2">Profile</TabsTrigger>
                  <TabsTrigger value="pill3">Messages</TabsTrigger>
                </TabsList>
                <TabsContent value="pill1">
                  <p className="font-semibold">Home sweet home! 🏠</p>
                </TabsContent>
                <TabsContent value="pill2">
                  <p className="font-semibold">Your profile looks dope! 😎</p>
                </TabsContent>
                <TabsContent value="pill3">
                  <p className="font-semibold">You've got mail! 📬</p>
                </TabsContent>
              </Tabs>
            </div>
          </CardBody>
        </Card>

        {/* Interactive Components */}
        <Card hover>
          <CardHeader title="Interactive" subtitle="模态框、Toast 和下拉菜单 🎪" />
          <CardBody>
            <div className="flex flex-wrap gap-4">
              {/* Modal Trigger */}
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

              {/* Toast Triggers */}
              <Button
                variant="secondary"
                onClick={() =>
                  addToast({
                    title: 'Boom! Success! 💥',
                    description: 'Your changes are locked in!',
                    status: 'success',
                  })
                }
              >
                Success Toast
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  addToast({
                    title: 'Hold Up! ⚠️',
                    description: 'Better check that input again.',
                    status: 'warning',
                  })
                }
              >
                Warning Toast
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  addToast({
                    title: 'Uh Oh! 💀',
                    description: 'Something went sideways.',
                    status: 'error',
                  })
                }
              >
                Error Toast
              </Button>

              {/* Dropdown */}
              <Dropdown
                trigger={
                  <Button variant="ghost">
                    More Options
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                }
              >
                <DropdownLabel>Actions</DropdownLabel>
                <DropdownItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  }
                  onClick={() => console.log('Create new')}
                >
                  Create New
                </DropdownItem>
                <DropdownItem onClick={() => console.log('Edit')}>Edit</DropdownItem>
                <DropdownItem onClick={() => console.log('Duplicate')}>Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem destructive onClick={() => console.log('Delete')}>
                  Delete
                </DropdownItem>
              </Dropdown>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Modal Example */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="lg">
        <ModalHeader title="Yo! Modal 👋" />
        <ModalBody>
          <p className="text-[var(--neutral-600)] mb-6 font-semibold text-lg">
            This modal is straight fire! 🔥 It can contain anything you want - forms, images, or whatever else floats your boat.
          </p>
          <Input label="Your Name" placeholder="What should we call you?" fullWidth />
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Nah, Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>Let's Go! 🚀</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <ComponentShowcase />
    </ToastProvider>
  );
}
