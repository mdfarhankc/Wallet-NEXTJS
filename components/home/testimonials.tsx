import React from "react";

export default async function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied users who have transformed their
              financial lives with Budget Buddy.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
          <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">
                  Marketing Manager
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              &quot;Budget Buddy has completely changed how I manage my
              finances. The visualization tools make it so easy to see where my
              money is going.&quot;
            </p>
          </div>
          <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div>
                <p className="text-sm font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">
                  Software Engineer
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              &quot;I love how I can tag transactions and create custom
              categories. It&quot;s helped me identify spending patterns I never
              noticed before.&quot;
            </p>
          </div>
          <div className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div>
                <p className="text-sm font-medium">Emily Rodriguez</p>
                <p className="text-sm text-muted-foreground">
                  Small Business Owner
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              &quot;Managing both personal and business finances is so much
              easier with Budget Buddy. The multiple account feature is a
              game-changer.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
