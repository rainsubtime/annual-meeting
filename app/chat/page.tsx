'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/ui';
import { chatData } from '@/lib/data';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: number;
}

function MoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M6.75 6.75h.75v.75h-.75v-.75zM8.25 6.75h.75v.75h-.75v-.75zM9.75 8.25h.75v.75h-.75v-.75zM8.25 9.75h.75v.75h-.75v-.75zM10.5 6.75h.75v.75h-.75v-.75zM11.25 8.25h.75v.75h-.75v-.75zM9.75 9.75h.75v.75h-.75v-.75zM11.25 9.75h.75v.75h-.75v-.75z" />
    </svg>
  );
}

function ChatRoom() {
  const d = chatData.page;
  const t = chatData.toasts;
  const a = chatData.about;
  const [nickname, setNickname] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { addToast } = useToast();

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/chat');
      setConnected(true);
      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'init' && Array.isArray(data.messages)) {
            setMessages(data.messages);
          } else if (data.type === 'message' && data.message) {
            setMessages((prev) => [...prev, data.message]);
          }
        } catch {
          // ignore
        }
      };
      eventSource.onerror = () => {
        setConnected(false);
        eventSource?.close();
      };
    } catch {
      setConnected(false);
    }
    return () => eventSource?.close();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const user = nickname.trim() || chatData.defaultNickname;
    setSending(true);
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, text }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        addToast({
          title: t.sendFailTitle,
          description: (err as { error?: string }).error || t.sendFailDesc,
          status: 'error',
        });
      }
    } catch {
      addToast({
        title: t.networkErrorTitle,
        description: t.networkErrorDesc,
        status: 'error',
      });
    } finally {
      setSending(false);
    }
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex justify-start">
          <Link href={d.backHref}>
            <Button variant="ghost" size="sm">{d.backLabel}</Button>
          </Link>
        </div>
        <Card hover bordered shadowed padding="lg">
          <CardHeader
            title={d.title}
            subtitle={d.subtitle}
            action={
              <div className="flex items-center gap-2">
                <Badge variant={connected ? 'success' : 'error'} dot={connected}>
                  {connected ? d.connectedLabel : d.disconnectedLabel}
                </Badge>
                <Dropdown
                  trigger={<Button variant="ghost" size="sm" rightIcon={<MoreIcon />}>{d.dropdownTrigger}</Button>}
                  align="right"
                >
                  <DropdownLabel>{d.dropdownLabel}</DropdownLabel>
                  <DropdownItem onClick={() => setAboutOpen(true)}>{d.dropdownAbout}</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem onClick={() => addToast({ title: t.refreshSuccess, status: 'success' })}>
                    {d.dropdownRefresh}
                  </DropdownItem>
                </Dropdown>
              </div>
            }
          />
          <CardBody className="p-0">
            <div className="px-6 pb-2">
              <Input
                label={d.nicknameLabel}
                placeholder={d.nicknamePlaceholder}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div
              ref={listRef}
              className="h-[360px] overflow-y-auto border-t border-b border-[var(--border)] bg-[var(--neutral-50)] px-4 py-3 space-y-3"
            >
              {messages.length === 0 && (
                <p className="text-center text-[var(--neutral-500)] font-semibold py-8">{d.emptyMessage}</p>
              )}
              {messages.map((msg) => (
                <Card key={msg.id} bordered shadowed padding="sm" className="animate-slide-up">
                  <CardBody className="p-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="primary" size="sm">{msg.user}</Badge>
                      <span className="text-xs text-[var(--neutral-500)]">{formatTime(msg.time)}</span>
                    </div>
                    <p className="mt-2 text-[var(--foreground)] font-medium break-words">{msg.text}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 flex gap-3 items-end">
              <div className="flex-1">
                <Textarea
                  label={d.messageLabel}
                  placeholder={d.messagePlaceholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={sending}
                  rows={2}
                  fullWidth
                  aria-label={d.messageLabel}
                />
              </div>
              <Button type="submit" disabled={sending} loading={sending}>{d.sendLabel}</Button>
            </form>
          </CardBody>
          <CardFooter align="center" className="text-sm text-[var(--neutral-500)]">
            {d.footerCount.replace('{count}', String(messages.length))}
          </CardFooter>
        </Card>

        <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} size="md">
          <ModalHeader title={a.title} />
          <ModalBody>
            <p className="text-[var(--neutral-600)] font-semibold">{a.body}</p>
          </ModalBody>
          <ModalFooter align="right">
            <Button variant="outline" onClick={() => setAboutOpen(false)}>{a.closeLabel}</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <ToastProvider>
      <ChatRoom />
    </ToastProvider>
  );
}
