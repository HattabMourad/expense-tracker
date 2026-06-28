import { Expense } from "@/types";

export function exportToCsv(expenses: Expense[]) {
  const headers = ["Date", "Category", "Description", "Amount"];

  const rows = expenses.map((e) => [
    `\t${e.date}`,
    e.category,
    e.description ?? "",
    e.amount.toFixed(2),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expenses-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
