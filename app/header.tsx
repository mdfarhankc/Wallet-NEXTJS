"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Logo from "@/components/common/logo";
import ThemeToggle from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/common/user-button";

export default function Header() {
  const { data: session } = useSession();
  const href = session?.user ? "/dashboard" : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur">
      <div className="max-w-7xl mx-auto container flex h-16 items-center justify-between">
        <Logo href={href} />
        <div className="flex items-center gap-4">
          {session?.user ? (
            <UserButton />
          ) : (
            <Button size={"sm"} asChild className="font-bold">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
