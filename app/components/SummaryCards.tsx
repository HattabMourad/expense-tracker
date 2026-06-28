import { Expense } from "@/types";

type Props = {
  expenses: Expense[];
};

export default function SummaryCards({ expenses }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const thisMonth = expenses.filter((e) => {
    const expenseDate = new Date(e.date);
    const now = new Date();
    return (
      expenseDate.getMonth() === now.getMonth() &&
      expenseDate.getFullYear() === now.getFullYear()
    );
  });

  const thisMonthTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  const highestExpense = expenses.reduce(
    (max, e) => (e.amount > max ? e.amount : max),
    0,
  );

  const categoryTotals = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const cards = [
    {
      label: "Total spent",
      value: `$${total.toFixed(2)}`,
      sub: `${expenses.length} transactions`,
    },
    {
      label: "This month",
      value: `$${thisMonthTotal.toFixed(2)}`,
      sub: `${thisMonth.length} transactions`,
    },
    {
      label: "Highest expense",
      value: `$${highestExpense.toFixed(2)}`,
      sub: "Single transaction",
    },
    {
      label: "Top category",
      value: topCategory ? topCategory[0] : "—",
      sub: topCategory ? `$${topCategory[1].toFixed(2)}` : "No data yet",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-gray-100 rounded-xl px-5 py-4"
        >
          <p className="text-xs text-gray-400 mb-1">{card.label}</p>
          <p className="text-xl font-semibold text-gray-900">{card.value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
