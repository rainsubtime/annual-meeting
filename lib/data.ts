import data from '@/data/data.json';

export type AppData = typeof data;
export const appData: AppData = data;

export const homeData = data.home;
export const chatData = data.chat;
