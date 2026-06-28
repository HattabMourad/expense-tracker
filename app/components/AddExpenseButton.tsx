"use client";

import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

export default function AddExpenseButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        + Add expense
      </button>

      {open && <ExpenseForm onClose={() => setOpen(false)} />}
    </>
  );
}
