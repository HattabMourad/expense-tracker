"use client";

import { useState } from "react";
import { deleteExpense } from "@/app/actions/expenses";
import { Expense } from "@/types";
import ExpenseForm from "./ExpenseForm";

type Props = {
  expenses: Expense[];
};

const CATEGORY_COLORS: Record<string, string> = {
  Food: "bg-orange-100 text-orange-700",
  Transport: "bg-blue-100 text-blue-700",
  Housing: "bg-purple-100 text-purple-700",
  Entertainment: "bg-pink-100 text-pink-700",
  Healthcare: "bg-green-100 text-green-700",
  Shopping: "bg-yellow-100 text-yellow-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function ExpenseList({ expenses }: Props) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteExpense(id);
    } finally {
      setDeletingId(null);
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg mb-1">No expenses yet</p>
        <p className="text-sm">Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[expense.category] ?? CATEGORY_COLORS.Other}`}
                  >
                    {expense.category}
                  </span>
                  {expense.description && (
                    <span className="text-sm text-gray-500">
                      {expense.description}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{expense.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base font-semibold text-gray-900">
                ${expense.amount.toFixed(2)}
              </span>
              <button
                onClick={() => setEditingExpense(expense)}
                className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(expense.id)}
                disabled={deletingId === expense.id}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {deletingId === expense.id ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingExpense && (
        <ExpenseForm
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </>
  );
}
