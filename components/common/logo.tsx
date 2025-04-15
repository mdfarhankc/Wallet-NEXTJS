import { Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center justify-center gap-2">
      <Wallet className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold tracking-tight">Wallet</span>
    </Link>
  );
}
