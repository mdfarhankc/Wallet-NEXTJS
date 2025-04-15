import React from "react";

export default async function HowItWorks() {
  return (
    <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple Steps to Financial Freedom
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Getting started with Budget Buddy is easy. Follow these simple
              steps to take control of your finances.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="text-xl font-bold">Create an Account</h3>
            <p className="text-center text-muted-foreground">
              Sign up for Budget Buddy and set up your profile in just a few
              minutes.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="text-xl font-bold">Connect Your Accounts</h3>
            <p className="text-center text-muted-foreground">
              Link your bank accounts, credit cards, and other financial
              accounts securely.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="text-xl font-bold">Start Tracking</h3>
            <p className="text-center text-muted-foreground">
              Watch as your transactions are automatically categorized and
              visualized in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
