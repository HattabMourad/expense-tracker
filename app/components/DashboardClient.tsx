"use client";

import { useState, useMemo } from "react";
import { Expense } from "@/types";
import ExpenseList from "./ExpenseList";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseCharts from "./ExpenseCharts";
import SummaryCards from "./SummaryCards";
import ExportButton from "./ExportButton";

type Props = {
  expenses: Expense[];
};

const DEFAULT_FILTERS = {
  category: "",
  search: "",
  dateFrom: "",
  dateTo: "",
};

export default function DashboardClient({ expenses }: Props) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (filters.category && e.category !== filters.category) return false;
      if (
        filters.search &&
        !e.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.dateFrom && e.date < filters.dateFrom) return false;
      if (filters.dateTo && e.date > filters.dateTo) return false;
      return true;
    });
  }, [expenses, filters]);

  return (
    <>
      <SummaryCards expenses={filtered} />
      <ExpenseCharts expenses={filtered} />
      <div className="flex items-center justify-between mb-2">
        <ExpenseFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
        <div className="ml-3 flex-shrink-0">
          <ExportButton expenses={filtered} />
        </div>
      </div>
      <ExpenseList expenses={filtered} />
    </>
  );
}
