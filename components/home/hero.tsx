import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default async function Hero() {
  return (
    <section className="w-full py-12 md:py-28">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Take Control of Your Finances
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Budget Buddy helps you track, manage, and visualize your
                finances in one place. Start your journey to financial freedom
                today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full md:h-[400px] lg:h-[500px]">
              <Image
                src="/wallet.png"
                alt="Wallet"
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,129,0.3)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
