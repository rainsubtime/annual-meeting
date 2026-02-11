import path from 'node:path';
import fs from 'node:fs';
import { tool } from 'ai';
import { z } from 'zod';

const DATA_DIR = path.join(process.cwd(), 'data');

function resolveDataFile(fileKey: string): string {
  const normalized = path.normalize(fileKey).replace(/^(\.\.\/|data\/)/, '');
  const full = path.join(DATA_DIR, normalized);
  if (!full.startsWith(DATA_DIR)) throw new Error('Invalid path');
  return full;
}

export const readMockData = tool({
  description: 'Read mock JSON file under data/ (e.g. data.json, chat-mock.json, blog-mock.json, shop-mock.json). Use to see current content before editing.',
  parameters: z.object({
    file: z.string().describe('File name under data/, e.g. data.json or chat-mock.json'),
  }),
  execute: async ({ file }) => {
    const filePath = resolveDataFile(file);
    if (!fs.existsSync(filePath)) return { ok: false, error: 'File not found', path: filePath };
    const raw = fs.readFileSync(filePath, 'utf-8');
    try {
      const data = JSON.parse(raw);
      return { ok: true, data, path: filePath };
    } catch (e) {
      return { ok: false, error: String(e), path: filePath };
    }
  },
});

export const writeMockData = tool({
  description: 'Write (overwrite) mock JSON file under data/. Use to add or update content for the e-commerce site, blog, or chat room. Pass valid JSON string.',
  parameters: z.object({
    file: z.string().describe('File name under data/, e.g. data.json or chat-mock.json'),
    content: z.string().describe('Valid JSON string to write (object or array)'),
  }),
  execute: async ({ file, content }) => {
    const filePath = resolveDataFile(file);
    try {
      JSON.parse(content);
    } catch (e) {
      return { ok: false, error: 'Invalid JSON: ' + String(e) };
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    return { ok: true, path: filePath };
  },
});

export const mockDataTools = { readMockData, writeMockData };
