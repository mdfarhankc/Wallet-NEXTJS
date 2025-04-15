"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import LoadingButton from "@/components/common/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInValues } from "@/validations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (result?.error) {
        toast.error(
          result.error === "CredentialsSignin"
            ? "Invalid email or password."
            : result.error
        );
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error in Signin: ", error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong!");
    }
  };
  return (
    <main className="max-w-7xl container mx-auto flex flex-1 items-center justify-center">
      <Card className="max-w-xl w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Login</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        type="email"
                        placeholder="johndoe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                isLoading={form.formState.isSubmitting}
                className="w-full"
              >
                Login
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center gap-1">
            <p className="text-muted-foreground">{"Don't have an account?"}</p>
            <Button asChild variant={"link"}>
              <Link href={"/sign-up"}>Create an account</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
