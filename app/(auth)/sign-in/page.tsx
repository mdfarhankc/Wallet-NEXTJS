import React from "react";
import { Metadata } from "next";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Signin",
};

export default async function SignInPage() {
  return <SignInForm />;
}
