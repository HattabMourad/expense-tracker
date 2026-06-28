"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Expense } from "@/types";

type Props = {
  expenses: Expense[];
};

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#f97316",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#6b7280",
];

export default function ExpenseCharts({ expenses }: Props) {
  const categoryData = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));

  const monthlyData = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      const month = new Date(e.date).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      acc[month] = (acc[month] ?? 0) + e.amount;
      return acc;
    }, {}),
  )
    .map(([month, total]) => ({ month, total: parseFloat(total.toFixed(2)) }))
    .slice(-6);

  if (expenses.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Spending by category
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Monthly spending
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} barSize={28}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
