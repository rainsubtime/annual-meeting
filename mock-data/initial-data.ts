import { MockData } from './types';

export const initialData: MockData = {
  products: [
    {
      id: 'prod-1',
      name: 'Wireless Headphones Pro',
      description: 'Premium noise-canceling headphones with 30-hour battery life',
      price: 299.99,
      category: 'Electronics',
      stock: 50,
      tags: ['audio', 'wireless', 'premium'],
      createdAt: Date.now() - 86400000 * 7,
    },
    {
      id: 'prod-2',
      name: 'Smart Watch X1',
      description: 'Fitness tracker with heart rate monitoring and GPS',
      price: 199.99,
      category: 'Wearables',
      stock: 100,
      tags: ['fitness', 'smart', 'health'],
      createdAt: Date.now() - 86400000 * 5,
    },
  ],
  blogPosts: [
    {
      id: 'post-1',
      title: '5 Tech Trends to Watch in 2026',
      content: 'The tech landscape is evolving rapidly. Here are the top trends...',
      excerpt: 'Discover the most exciting tech trends of 2026',
      author: 'Tech Team',
      tags: ['technology', 'trends', 'future'],
      publishedAt: Date.now() - 86400000 * 3,
      views: 1234,
    },
  ],
};
