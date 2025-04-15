import Image from "next/image";
import React from "react";

export default async function DataVisualisation() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Data Visualization
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Visualize Your Financial Journey
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Interactive charts and graphs provide clear insights into your
                spending habits, income trends, and budget progress.
              </p>
            </div>
            <ul className="grid gap-2 py-4">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>Monthly spending breakdowns by category</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>Income vs. expense tracking over time</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>Budget progress indicators</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>Customizable reports and dashboards</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Financial Charts and Graphs"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
