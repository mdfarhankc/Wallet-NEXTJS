"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTagSchema, CreateTagValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@/components/common/loading-button";
import { createTagAction } from "@/app/(main)/profile/actions";
import { toast } from "sonner";

export default function CreateTagDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateTagValues>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: CreateTagValues) => {
    try {
      await createTagAction(values);
      form.reset({
        name: "",
      });
      toast.success("Tag created successfully.");
      setOpen((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant={"outline"}>
          Create Tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new tag</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg. Food..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your tag will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />
            <LoadingButton
              className="w-full"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
