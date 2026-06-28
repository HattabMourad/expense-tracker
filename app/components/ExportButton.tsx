"use client";

import { exportToCsv } from "@/utils/exportCsv";
import { Expense } from "@/types";

type Props = {
  expenses: Expense[];
};

export default function ExportButton({ expenses }: Props) {
  return (
    <button
      onClick={() => exportToCsv(expenses)}
      disabled={expenses.length === 0}
      className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Export CSV
    </button>
  );
}
