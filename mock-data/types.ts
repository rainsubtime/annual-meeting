export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  tags: string[];
  createdAt: number;
  createdBy?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  publishedAt: number;
  views: number;
  createdBy?: string;
}

// 聊天消息使用 lib/chat-store.ts 中的定义
// 这里只管理产品和博客数据
export interface MockData {
  products: Product[];
  blogPosts: BlogPost[];
}
