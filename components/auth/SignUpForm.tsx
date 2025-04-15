"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { signUpSchema, SignUpValues } from "@/validations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignUp } from "@/app/(auth)/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "male",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    try {
      await SignUp(values);
      toast.success("User registered successfully!");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error in Signup: ", error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong!");
    }
  };
  return (
    <main className="max-w-7xl container mx-auto flex flex-1 items-center justify-center">
      <Card className="max-w-xl w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Signup</CardTitle>
          <CardDescription>Signup with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                        disabled={form.formState.isSubmitting}
                      >
                        <FormItem className="flex gap-2">
                          <FormControl>
                            <RadioGroupItem value="male" id="male" />
                          </FormControl>
                          <FormLabel htmlFor="male">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex gap-2">
                          <FormControl>
                            <RadioGroupItem value="female" id="female" />
                          </FormControl>
                          <FormLabel htmlFor="female">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                Signup
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center gap-1">
            <p className="text-muted-foreground">
              {"Already have an account?"}
            </p>
            <Button asChild variant={"link"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
