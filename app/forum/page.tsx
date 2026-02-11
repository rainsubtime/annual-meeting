'use client';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToastProvider,
  useToast,
} from '@/components/ui';
import postsData from '../data.json';

type ForumCategory = '深度避雷' | '极致省钱' | '情绪求助';

type EngagementMetrics = {
  likes: number;
  saves: number;
};

type Comment = {
  user: string;
  content: string;
  createdAt: string;
};

type ForumPost = {
  id: string;
  title: string;
  description: string;
  category: ForumCategory;
  topic: string;
  tags: string[];
  engagement: EngagementMetrics;
  comments: Comment[];
};

const posts = postsData as ForumPost[];

const CATEGORY_LABELS: { value: ForumCategory | '全部'; badgeVariant: 'primary' | 'secondary' | 'info' }[] = [
  { value: '全部', badgeVariant: 'info' },
  { value: '深度避雷', badgeVariant: 'primary' },
  { value: '极致省钱', badgeVariant: 'secondary' },
  { value: '情绪求助', badgeVariant: 'info' },
];

function formatNumber(num: number) {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1).replace(/\.0$/, '')}w`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(num);
}

function ForumCard({ post }: { post: ForumPost }) {
  const { addToast } = useToast();

  return (
    <Card hover bordered shadowed padding="lg" className="flex flex-col h-full animate-slide-up">
      <CardHeader
        title={post.title}
        subtitle={post.topic}
        action={
          <Badge variant="primary" size="sm">
            {post.category}
          </Badge>
        }
      />
      <CardBody>
        <p className="text-[var(--card-foreground)] font-semibold text-sm leading-relaxed whitespace-pre-line">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm" rounded>
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between text-xs font-black uppercase tracking-wide text-[var(--neutral-600)]">
          <div className="flex items-center gap-4">
            <span>赞 {formatNumber(post.engagement.likes)}</span>
            <span>收藏 {formatNumber(post.engagement.saves)}</span>
          </div>
          <span className="text-[var(--neutral-500)]">评论 {post.comments.length}</span>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-stretch gap-3 pt-4 border-t border-dashed border-[var(--neutral-200)]">
        <div className="space-y-2">
          {post.comments.slice(0, 3).map((comment) => (
            <div key={`${post.id}-${comment.user}-${comment.createdAt}`} className="text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black uppercase tracking-wide text-[var(--neutral-700)]">
                  {comment.user}
                </span>
                <span className="text-[var(--neutral-500)] font-semibold">{comment.createdAt}</span>
              </div>
              <p className="text-[var(--neutral-800)] font-semibold mt-1">{comment.content}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              addToast({
                title: 'YO! 已收藏 💾',
                description: '这篇经验被你收入“避坑宝典”啦！',
                status: 'success',
              })
            }
          >
            想试但先收藏
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              addToast({
                title: '写点真心话 📝',
                description: '你的一条评论，也许刚好救到同样迷茫的人。',
                status: 'info',
              })
            }
          >
            我也想说两句
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function ForumPage() {
  const total = posts.length;
  const byCategory = (category: ForumCategory) =>
    posts.filter((post) => post.category === category);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-6 animate-bounce-in">
          <h1 className="text-5xl md:text-6xl font-black uppercase leading-tight graffiti-outline">
            <span className="inline-block bg-[var(--primary)] text-[var(--on-primary)] px-5 py-2 rounded-[var(--radius-lg)] border-[var(--border-width-thick)] border-[var(--border)] shadow-[var(--shadow-xl)] transform -rotate-2">
              生活雷达站
            </span>
            <br />
            <span className="inline-block bg-[var(--secondary)] text-[var(--on-secondary)] px-4 py-2 mt-3 rounded-[var(--radius-lg)] border-[var(--border-width)] border-[var(--border)] shadow-[var(--shadow-lg)] transform rotate-1">
              仿小红书 · 城市打工人实录
            </span>
          </h1>
          <p className="max-w-3xl text-[var(--neutral-900)] font-bold text-base md:text-lg transform -rotate-1">
            这里不卖梦想，只说<strong>真实体验</strong>。深度避雷、极致省钱、情绪求助，全部来自 25-35 岁城市打工人的生活实验，
            方便你、也方便商业分析爬虫，抓住每一个细小但致命的痛点。
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary" size="lg" dot>
              共 {total} 篇真人故事
            </Badge>
            <Badge variant="secondary" size="lg">
              深度避雷 {byCategory('深度避雷').length}
            </Badge>
            <Badge variant="secondary" size="lg">
              极致省钱 {byCategory('极致省钱').length}
            </Badge>
            <Badge variant="info" size="lg">
              情绪求助 {byCategory('情绪求助').length}
            </Badge>
          </div>
        </header>

        <Card hover bordered shadowed>
          <CardHeader
            title="话题导航"
            subtitle="按类型刷贴，更快锁定你关心的生活场景 🔍"
          />
          <CardBody>
            <Tabs defaultValue="全部" variant="pills">
              <TabsList>
                {CATEGORY_LABELS.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.value === '全部' ? '全部笔记' : item.value}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="全部">
                <section
                  aria-label="全部帖子"
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {posts.map((post) => (
                    <ForumCard key={post.id} post={post} />
                  ))}
                </section>
              </TabsContent>

              <TabsContent value="深度避雷">
                <section
                  aria-label="深度避雷类帖子"
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {byCategory('深度避雷').map((post) => (
                    <ForumCard key={post.id} post={post} />
                  ))}
                </section>
              </TabsContent>

              <TabsContent value="极致省钱">
                <section
                  aria-label="极致省钱类帖子"
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {byCategory('极致省钱').map((post) => (
                    <ForumCard key={post.id} post={post} />
                  ))}
                </section>
              </TabsContent>

              <TabsContent value="情绪求助">
                <section
                  aria-label="情绪求助类帖子"
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {byCategory('情绪求助').map((post) => (
                    <ForumCard key={post.id} post={post} />
                  ))}
                </section>
              </TabsContent>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default function Forum() {
  return (
    <ToastProvider>
      <ForumPage />
    </ToastProvider>
  );
}

