'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { homeData } from '@/lib/data';

const sizeMap = { 'Small': 'sm', 'Medium': 'md', 'Large': 'lg', 'Extra Large': 'xl' } as const;
const variantMap = { Primary: 'primary', Secondary: 'secondary', Outline: 'outline', Ghost: 'ghost', Danger: 'danger', Default: 'default', Success: 'success', Warning: 'warning', Error: 'error', Info: 'info' } as const;

function PageHeader() {
  const { header } = homeData;
  return (
    <div className="text-center space-y-6 animate-bounce-in">
      <h1 className="text-6xl md:text-7xl font-black uppercase transform -rotate-2 leading-tight">
        <span className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-[var(--radius-lg)] border-[var(--border-width)] border-[var(--foreground)] shadow-[var(--shadow-lg)] transform rotate-2">
          {header.titlePrimary}
        </span>
        <br />
        <span className="inline-block bg-[var(--secondary)] text-[var(--foreground)] px-6 py-3 rounded-[var(--radius-lg)] border-[var(--border-width)] border-[var(--foreground)] shadow-[var(--shadow-lg)] transform -rotate-1 mt-4">
          {header.titleSecondary}
        </span>
      </h1>
      <p className="text-2xl font-bold text-[var(--foreground)] transform rotate-1">
        {header.subtitle}
      </p>
      <div className="flex gap-3 justify-center flex-wrap items-center">
        <Link href={header.nav.href}>
          <Button variant="primary" size="lg">{header.nav.label}</Button>
        </Link>
        {header.badges.map((b) => (
          <Badge key={b.label} variant={variantMap[b.variant as keyof typeof variantMap] ?? 'default'} size={b.size as 'sm' | 'md' | 'lg'} dot={b.dot}>
            {b.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ButtonsSection() {
  const { buttons } = homeData.sections;
  return (
    <Card hover>
      <CardHeader title={buttons.title} subtitle={buttons.subtitle} />
      <CardBody>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[var(--neutral-500)] uppercase">{buttons.variants.label}</h3>
            <div className="flex flex-wrap gap-3">
              {buttons.variants.items.map((v) => (
                <Button key={v} variant={variantMap[v as keyof typeof variantMap] ?? 'primary'}>{v}</Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[var(--neutral-500)] uppercase">{buttons.sizes.label}</h3>
            <div className="flex flex-wrap items-center gap-3">
              {buttons.sizes.items.map((s) => (
                <Button key={s} size={sizeMap[s as keyof typeof sizeMap] ?? 'md'}>{s}</Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[var(--neutral-500)] uppercase">{buttons.states.label}</h3>
            <div className="flex flex-wrap gap-3">
              <Button loading>{buttons.states.loading}</Button>
              <Button disabled>{buttons.states.disabled}</Button>
              <Button leftIcon={<PlusIcon />}>{buttons.states.withIcon}</Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  );
}

function InputsSection() {
  const { inputs } = homeData.sections;
  return (
    <Card hover>
      <CardHeader title={inputs.title} subtitle={inputs.subtitle} />
      <CardBody>
        <div className="space-y-4">
          {inputs.fields.map((f) => (
            f.type === 'email' ? (
              <Input
                key={f.label}
                label={f.label}
                type="email"
                placeholder={f.placeholder}
                status={f.status as 'success' | undefined}
                leftIcon={<EmailIcon />}
              />
            ) : 'rows' in f && f.rows ? (
              <Textarea
                key={f.label}
                label={f.label}
                placeholder={f.placeholder}
                hint={f.hint}
                rows={f.rows}
              />
            ) : (
              <Input
                key={f.label}
                label={f.label}
                type={f.type ?? 'text'}
                placeholder={f.placeholder}
                hint={f.hint}
                error={f.error}
              />
            )
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );
}

function BadgesSection() {
  const { badges } = homeData.sections;
  return (
    <Card hover>
      <CardHeader title={badges.title} subtitle={badges.subtitle} />
      <CardBody>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {badges.variants.map((v) => (
              <Badge key={v} variant={variantMap[v as keyof typeof variantMap] ?? 'default'}>{v}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.extras.map((e) => (
              <Badge key={e.label} variant={variantMap[e.variant as keyof typeof variantMap] ?? 'primary'} rounded={e.rounded} dot={e.dot} removable={e.removable} onRemove={e.removable ? () => {} : undefined}>{e.label}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {badges.sizes.map((s) => (
              <Badge key={s} size={sizeMap[s as keyof typeof sizeMap] ?? 'md'}>{s}</Badge>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function CardsSection() {
  const { cards } = homeData.sections;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.items.map((item) => (
        <Card key={item.title} hover bordered shadowed padding={item.padding === 'lg' ? 'lg' : 'md'}>
          {item.padding !== 'lg' && (
            <CardHeader
              title={item.title}
              action={item.actionLabel ? <Button size="sm" variant="secondary">{item.actionLabel}</Button> : undefined}
            />
          )}
          <CardBody>
            {item.padding === 'lg' ? (
              <>
                <h3 className="text-lg font-extrabold mb-2 uppercase">{item.title}</h3>
                <p className="text-[var(--neutral-600)] font-semibold">{item.body}</p>
              </>
            ) : (
              item.body && <p className="text-[var(--neutral-600)] font-semibold">{item.body}</p>
            )}
          </CardBody>
          {item.footer && (
            <CardFooter>
              <Button size="sm" variant="outline">{item.footer.cancel}</Button>
              <Button size="sm">{item.footer.submit}</Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}

function TabsSection() {
  const { tabs } = homeData.sections;
  return (
    <Card hover>
      <CardHeader title={tabs.title} subtitle={tabs.subtitle} />
      <CardBody>
        <Tabs defaultValue={tabs.line.tabs[0].value}>
          <TabsList>
            {tabs.line.tabs.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
          </TabsList>
          {tabs.line.tabs.map((t) => (
            <TabsContent key={t.value} value={t.value}>
              <p className="text-[var(--neutral-600)] font-semibold text-lg">{t.content}</p>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-8">
          <h4 className="text-sm font-black mb-4 uppercase tracking-wide">{tabs.pills.label}</h4>
          <Tabs defaultValue={tabs.pills.tabs[0].value} variant="pills">
            <TabsList>
              {tabs.pills.tabs.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
            </TabsList>
            {tabs.pills.tabs.map((t) => (
              <TabsContent key={t.value} value={t.value}>
                <p className="font-semibold">{t.content}</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}

function InteractiveSection() {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const { interactive } = homeData.sections;
  const m = homeData.sections.modal;
  return (
    <>
      <Card hover>
        <CardHeader title={interactive.title} subtitle={interactive.subtitle} />
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setModalOpen(true)}>{interactive.modalTrigger}</Button>
            {interactive.toasts.map((t) => (
              <Button
                key={t.button}
                variant={t.status === 'success' ? 'secondary' : t.status === 'warning' ? 'outline' : 'danger'}
                onClick={() => addToast({ title: t.title, description: t.description, status: t.status as 'success' | 'warning' | 'error' })}
              >
                {t.button}
              </Button>
            ))}
            <Dropdown
              trigger={
                <Button variant="ghost" rightIcon={<ChevronDownIcon />}>
                  {interactive.dropdown.trigger}
                </Button>
              }
            >
              <DropdownLabel>{interactive.dropdown.label}</DropdownLabel>
              {interactive.dropdown.items.slice(0, -1).map((item) => (
                <DropdownItem
                  key={item.label}
                  icon={item.icon ? <PlusIcon /> : undefined}
                  onClick={() => {}}
                >
                  {item.label}
                </DropdownItem>
              ))}
              <DropdownSeparator />
              <DropdownItem destructive onClick={() => {}}>
                {interactive.dropdown.items[interactive.dropdown.items.length - 1].label}
              </DropdownItem>
            </Dropdown>
          </div>
        </CardBody>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="lg">
        <ModalHeader title={m.title} />
        <ModalBody>
          <p className="text-[var(--neutral-600)] mb-6 font-semibold text-lg">{m.body}</p>
          <Input label={m.inputLabel} placeholder={m.inputPlaceholder} fullWidth />
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>{m.cancel}</Button>
          <Button onClick={() => setModalOpen(false)}>{m.submit}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function HomeContent() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <PageHeader />
        <ButtonsSection />
        <InputsSection />
        <BadgesSection />
        <CardsSection />
        <TabsSection />
        <InteractiveSection />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
