export type Expense = {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string | null;
  date: string;
  created_at: string;
};

export type ExpenseFormData = {
  amount: number;
  category: string;
  description: string;
  date: string;
};

export const CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
