import React, { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

interface LoadingButtonProps extends ComponentProps<"button"> {
  children: ReactNode | string;
  isLoading: boolean;
}

export default function LoadingButton({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Loading /> : children}
    </Button>
  );
}
