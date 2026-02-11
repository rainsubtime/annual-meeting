import { MockData, Product, BlogPost } from './types';
import fs from 'fs/promises';
import path from 'path';

// Data files
const SHOP_FILE = path.join(process.cwd(), 'data', 'shop-mock.json');
const BLOG_FILE = path.join(process.cwd(), 'data', 'blog-mock.json');

export class DataManager {
  private data: MockData;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = { products: [], blogPosts: [] };
  }

  async load() {
    try {
      // Load products
      const shopData = await fs.readFile(SHOP_FILE, 'utf-8');
      const shopJson = JSON.parse(shopData);
      this.data.products = shopJson.products || [];

      // Load blog posts
      const blogData = await fs.readFile(BLOG_FILE, 'utf-8');
      const blogJson = JSON.parse(blogData);
      this.data.blogPosts = Array.isArray(blogJson) ? blogJson : [];

      console.log('✅ Loaded data from shop-mock.json and blog-mock.json');
    } catch (error) {
      console.log('⚠️ Error loading data files, using empty data');
      this.data = { products: [], blogPosts: [] };
    }
  }

  async save() {
    // Debounce saves
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(async () => {
      try {
        // Save products
        await fs.writeFile(
          SHOP_FILE,
          JSON.stringify({ products: this.data.products }, null, 2)
        );

        // Save blog posts
        await fs.writeFile(
          BLOG_FILE,
          JSON.stringify(this.data.blogPosts, null, 2)
        );

        console.log('💾 Data saved to shop-mock.json and blog-mock.json');
      } catch (error) {
        console.error('❌ Failed to save data:', error);
      }
    }, 1000);
  }

  // Products
  addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    this.data.products.push(newProduct);
    this.save();
    return newProduct;
  }

  getProducts(): Product[] {
    return this.data.products;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.data.products[index] = { ...this.data.products[index], ...updates };
    this.save();
    return this.data.products[index];
  }

  deleteProduct(id: string): boolean {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.data.products.splice(index, 1);
    this.save();
    return true;
  }

  // Blog Posts
  addBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'views'>): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      publishedAt: Date.now(),
      views: 0,
    };
    this.data.blogPosts.push(newPost);
    this.save();
    return newPost;
  }

  getBlogPosts(): BlogPost[] {
    return this.data.blogPosts;
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const index = this.data.blogPosts.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.data.blogPosts[index] = { ...this.data.blogPosts[index], ...updates };
    this.save();
    return this.data.blogPosts[index];
  }

  // Stats
  getStats() {
    return {
      totalProducts: this.data.products.length,
      totalBlogPosts: this.data.blogPosts.length,
      totalViews: this.data.blogPosts.reduce((sum, post) => sum + post.views, 0),
    };
  }

  // Get all data
  getAllData(): MockData {
    return this.data;
  }
}

// Singleton instance
export const dataManager = new DataManager();
