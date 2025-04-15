import {
  BarChart3,
  CreditCard,
  Filter,
  PieChart,
  Tag,
  Wallet,
} from "lucide-react";
import React from "react";

export default async function Features() {
  return (
    <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need to Manage Your Finances
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Budget Buddy provides powerful tools to help you track,
              categorize, and visualize your financial data.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Multiple Accounts</h3>
            <p className="text-center text-muted-foreground">
              Manage all your accounts in one place. Connect bank accounts,
              credit cards, and more.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Smart Categorization</h3>
            <p className="text-center text-muted-foreground">
              Automatically categorize transactions and create custom categories
              to fit your needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Custom Tags</h3>
            <p className="text-center text-muted-foreground">
              Add tags to transactions for enhanced organization and detailed
              filtering.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Visual Insights</h3>
            <p className="text-center text-muted-foreground">
              Gain insights with interactive charts and graphs that visualize
              your spending patterns.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Budget Planning</h3>
            <p className="text-center text-muted-foreground">
              Create and track budgets for different categories to stay on top
              of your financial goals.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Transactions</h3>
            <p className="text-center text-muted-foreground">
              Bank-level security ensures your financial data is always
              protected and private.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
