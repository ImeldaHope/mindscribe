
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  entries: Entry[];
  categories: Category[];
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  user: User;
  entries: Entry[];
}

export interface Entry {
  id: string;
  title: string;
  content: string;
  mood?: Mood;
  // tags: Tag[];
  createdAt: Date;
  updatedAt: Date;  
  // categoryId: string;
  category: Category;  
}

export interface Tag {
  id: string;
  name: string;
  entries: Entry[];
  userId: string;
  user: User;
}

export enum Mood {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ANXIOUS = "ANXIOUS",
  CALM = "CALM",
  EXCITED = "EXCITED",
  TIRED = "TIRED",
}

export interface Summary {
  totalEntries: number;
  writingStreak: number;
  averageWordsPerEntry: number;
  numberOfCategories: number;
}

export interface Attachment {
  id: string;
  journal_entry_id: string;
  file_url: string;
  file_type: string;
  created_at: Date;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  theme: "light" | "dark" | "system";
  created_at: Date;
  updated_at: Date;
}