import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getExpenses } from "@/app/actions/expenses";
import AddExpenseButton from "@/app/components/AddExpenseButton";
import DashboardClient from "@/app/components/DashboardClient";
import LogoutButton from "@/app/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const expenses = await getExpenses();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Expense Tracker</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
          <AddExpenseButton />
        </div>

        <DashboardClient expenses={expenses ?? []} />
      </main>
    </div>
  );
}
