export type Category = 'general' | 'work' | 'hobby';

export interface Task {
    name: string;
    done: boolean;
    category?: Category;
  }