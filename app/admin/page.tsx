'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

interface Stats {
  totalProducts: number;
  totalBlogPosts: number;
  totalChatMessages: number;
  totalViews: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdBy?: string;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  views: number;
  createdBy?: string;
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, productsRes, postsRes, messagesRes] = await Promise.all([
        fetch('/api/agents?type=stats'),
        fetch('/api/agents?type=products'),
        fetch('/api/agents?type=posts'),
        fetch('/api/agents?type=messages&limit=20'),
      ]);

      const [statsData, productsData, postsData, messagesData] = await Promise.all([
        statsRes.json(),
        productsRes.json(),
        postsRes.json(),
        messagesRes.json(),
      ]);

      setStats(statsData);
      setProducts(productsData);
      setPosts(postsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="text-4xl font-black text-white uppercase tracking-wider">
          Loading... 🚀
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-black text-white uppercase tracking-wider mb-2">
            Agent Dashboard 🤖
          </h1>
          <p className="text-xl text-purple-300 font-bold uppercase">
            Monitor Your Growth Team&apos;s Work
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card hover>
            <CardBody>
              <div className="text-center">
                <div className="text-5xl font-black text-pink-500 mb-2">
                  {stats?.totalProducts || 0}
                </div>
                <div className="text-lg font-bold uppercase text-white">
                  Products 🛍️
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover>
            <CardBody>
              <div className="text-center">
                <div className="text-5xl font-black text-cyan-400 mb-2">
                  {stats?.totalBlogPosts || 0}
                </div>
                <div className="text-lg font-bold uppercase text-white">
                  Blog Posts 📝
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover>
            <CardBody>
              <div className="text-center">
                <div className="text-5xl font-black text-yellow-400 mb-2">
                  {stats?.totalChatMessages || 0}
                </div>
                <div className="text-lg font-bold uppercase text-white">
                  Messages 💬
                </div>
              </div>
            </CardBody>
          </Card>

          <Card hover>
            <CardBody>
              <div className="text-center">
                <div className="text-5xl font-black text-green-400 mb-2">
                  {stats?.totalViews || 0}
                </div>
                <div className="text-lg font-bold uppercase text-white">
                  Total Views 👀
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Data Tables */}
        <Card>
          <CardHeader
            title="Agent Generated Content"
            subtitle="Real-time data from your AI growth team 🔥"
          />
          <CardBody>
            <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="posts">Blog Posts</TabsTrigger>
                <TabsTrigger value="messages">Chat Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 bg-black/40 border-4 border-white/20 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-black text-white uppercase">
                            {product.name}
                          </h3>
                          <p className="text-purple-300 font-bold">
                            ${product.price} • {product.category}
                          </p>
                        </div>
                        {product.createdBy && (
                          <Badge variant="success">
                            By {product.createdBy} 🤖
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts">
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 bg-black/40 border-4 border-white/20 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-black text-white uppercase">
                            {post.title}
                          </h3>
                          <p className="text-purple-300 font-bold">
                            By {post.author} • {post.views} views
                          </p>
                        </div>
                        {post.createdBy && (
                          <Badge variant="success">
                            By {post.createdBy} 🤖
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="messages">
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 bg-black/40 border-2 border-white/20 rounded"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-cyan-400 uppercase">
                              {msg.user}:
                            </span>
                            <span className="text-xs text-purple-300">
                              {new Date(msg.time).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-white font-bold mt-1">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white font-bold uppercase text-sm">
            Auto-refreshing every 5 seconds ⚡
          </p>
        </div>
      </div>
    </div>
  );
}
