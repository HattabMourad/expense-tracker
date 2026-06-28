# Expense Tracker

A full-stack expense tracking app built with Next.js 14, TypeScript, Supabase, and Tailwind CSS.

## Features

- Email authentication with protected routes
- Add, edit, and delete expenses
- Dashboard with summary cards (total spent, this month, highest expense, top category)
- Spending charts by category and month
- Filter by category, date range, and keyword
- Export filtered expenses to CSV
- Row Level Security — users can only access their own data

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Database + Auth** — Supabase (PostgreSQL + Row Level Security)
- **Styling** — Tailwind CSS
- **Charts** — Recharts
- **Deployment** — Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### Installation

1. Clone the repository

```bash
git clone https://github.com/HattabMourad/expense-tracker.git
cd expense-tracker
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database by running these queries in your Supabase SQL editor

```sql
create table expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  category text not null,
  description text,
  date date not null,
  created_at timestamp with time zone default now()
);

alter table expenses enable row level security;

create policy "Users can view own expenses" on expenses for select using (auth.uid() = user_id);
create policy "Users can insert own expenses" on expenses for insert with check (auth.uid() = user_id);
create policy "Users can update own expenses" on expenses for update using (auth.uid() = user_id);
create policy "Users can delete own expenses" on expenses for delete using (auth.uid() = user_id);
```

5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This app is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

## License

MIT
