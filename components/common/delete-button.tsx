"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteButton() {
  return (
    <Button className="w-full cursor-pointer" variant={"destructive"}>
      <Trash2Icon /> Delete
    </Button>
  );
}
