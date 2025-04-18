import React, { Suspense } from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileUserInfoSectionSkeleton from "@/components/profile/ProfileUserInfoSectionSkeleton";
import ProfileUserInfoSection from "@/components/profile/ProfileUserInfoSection";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsSectionSkeleton from "@/components/profile/AccountsSectionSkeleton";
import AccountsSection from "@/components/profile/AccountsSection";
import TagsSectionSkeleton from "@/components/profile/TagsSectionSkeleton";
import TagsSection from "@/components/profile/TagsSection";
import CategoriesSection from "@/components/profile/CategoriesSection";
import CategoriesSectionSkeleton from "@/components/profile/CategoriesSectionSkeleton";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: { currency: true },
  });
  if (!user) return redirect("/sign-in");

  return (
    <main className="flex-1 px-4 py-3">
      <h1 className="text-5xl tracking-wide font-extrabold text-center my-3 underline">
        Profile
      </h1>
      {/* User Info Section */}
      <Suspense fallback={<ProfileUserInfoSectionSkeleton />}>
        <ProfileUserInfoSection user={user} />
      </Suspense>
      <Separator className="my-4" />
      {/* Accounts, Categories, Tags */}
      <section className="max-w-7xl mx-auto container space-y-3">
        <Tabs
          defaultValue="account"
          className="w-full flex items-center justify-center"
        >
          <TabsList className="flex flex-wrap justify-center">
            <TabsTrigger value="account">Accounts</TabsTrigger>
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="tag">Tags</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Suspense fallback={<AccountsSectionSkeleton />}>
              <AccountsSection user={user} />
            </Suspense>
          </TabsContent>
          <TabsContent value="category">
            <Suspense fallback={<CategoriesSectionSkeleton />}>
              <CategoriesSection user={user} />
            </Suspense>
          </TabsContent>
          <TabsContent value="tag">
            <Suspense fallback={<TagsSectionSkeleton />}>
              <TagsSection user={user} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
