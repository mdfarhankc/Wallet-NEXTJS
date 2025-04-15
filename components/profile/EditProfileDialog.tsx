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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editProfileSchema, EditProfileValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@/components/common/loading-button";
import { toast } from "sonner";
import { Session } from "next-auth";
import CurrencyPicker from "@/components/common/CurrencyPicker";
import { editProfileAction } from "@/app/(main)/profile/actions";

export default function EditProfileDialog({ user }: { user: Session["user"] }) {
  const [open, setOpen] = useState(false);
  const form = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name,
      currency: user?.currency.id,
    },
  });

  const handleCurrencyChange = useCallback(
    (value: string) => {
      form.setValue("currency", value);
    },
    [form]
  );

  const onSubmit = async (values: EditProfileValues) => {
    try {
      await editProfileAction(values);
      toast.success("Profile updated successfully.");
      setOpen((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong!");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <CurrencyPicker
                      defaultValue={field.value}
                      onChange={handleCurrencyChange}
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
              Save
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
