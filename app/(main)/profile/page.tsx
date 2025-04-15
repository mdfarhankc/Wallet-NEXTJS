import React, { Suspense } from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileUserInfoSectionSkeleton from "@/components/profile/ProfileUserInfoSectionSkeleton";
import ProfileUserInfoSection from "@/components/profile/ProfileUserInfoSection";

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
    </main>
  );
}
