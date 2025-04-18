"use client";

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
import { ReactNode, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createTransactionAction } from "@/app/(main)/dashboard/actions";
import {
  createTransactionSchema,
  CreateTransactionValues,
} from "@/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../common/loading-button";
import CategoryPicker from "../common/CategoryPicker";
import AccountPicker from "../common/AccountPicker";
import TagsPicker from "../common/TagsPicker";
import { useQueryClient } from "@tanstack/react-query";

interface CreateTransactionDialogProps {
  type: "income" | "expense";
  trigger: ReactNode;
}

export default function CreateTransactionDialog({
  type,
  trigger,
}: CreateTransactionDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<CreateTransactionValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      date: new Date(),
      type: type,
      account: "",
      category: "",
      tags: [],
    },
  });

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  const handleAccountChange = useCallback(
    (value: string) => {
      form.setValue("account", value);
    },
    [form]
  );

  const handleTagsChange = useCallback(
    (values: string[]) => {
      form.setValue("tags", values);
    },
    [form]
  );

  const onSubmit = async (values: CreateTransactionValues) => {
    try {
      await createTransactionAction(values);
      form.reset({
        description: "",
        amount: 0,
        date: new Date(),
        type: type,
        account: "",
        category: "",
        tags: [],
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Category created successfully.");
      setOpen((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong!");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new{" "}
            <span
              className={cn(
                type === "income" ? "text-green-500" : "text-red-500"
              )}
            >
              {type}
            </span>{" "}
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Salary..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="account"
                render={() => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <FormControl>
                      <AccountPicker onChange={handleAccountChange} />
                    </FormControl>
                    <FormDescription>
                      Select a account for this transaction
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategoryPicker
                        type={type}
                        onChange={handleCategoryChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Select a category for this transaction
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsPicker onChange={handleTagsChange} />
                  </FormControl>
                  <FormDescription>
                    (Optional) Add relevant tags
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
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
