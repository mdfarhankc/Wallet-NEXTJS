import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import DataVisualisation from "@/components/home/data-visualisation";
import CTA from "@/components/home/cta";
import Testimonials from "@/components/home/testimonials";
import HowItWorks from "@/components/home/how-it-works";
import Logo from "@/components/common/logo";

export default async function HomePage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        {/* Features Section */}
        <Features />
        {/* Data Visualization Section */}
        <DataVisualisation />
        {/* How It Works Section */}
        <HowItWorks />
        {/* Testimonials Section */}
        <Testimonials />
        {/* CTA Section */}
        <CTA />
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <Logo href="/" />
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Budget Buddy. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
