"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { ExpenseFormData } from "@/types";

export async function getExpenses() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addExpense(formData: ExpenseFormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("expenses").insert({
    ...formData,
    user_id: user.id,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function updateExpense(id: string, formData: ExpenseFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("expenses")
    .update(formData)
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function deleteExpense(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}
