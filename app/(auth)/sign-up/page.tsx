import React from "react";
import { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Signup",
};

export default async function SignUpPage() {
  return <SignUpForm />;
}
