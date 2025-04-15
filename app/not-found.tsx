import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white gap-6">
      <div className="text-center px-4 py-8 max-w-lg">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button asChild>
          <Link
            className="px-4 py-2 rounded hover:bg-primary/80 transition-colors duration-200"
            href="/"
          >
            Return Home
          </Link>
        </Button>
      </div>
      <Image
        className="hidden md:flex"
        src={"./error.svg"}
        width={400}
        height={200}
        alt="error image"
      />
    </div>
  );
}
