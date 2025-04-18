import React, { useEffect, useState } from "react";
import { Category, TransactionType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "../ui/skeleton";

interface CategoryPickerProps {
  onChange: (value: string) => void;
  type: TransactionType;
}

export default function CategoryPicker({
  onChange,
  type,
}: CategoryPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { categories, isLoading } = useCategories(type);

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const selectedcategory = categories?.find(
    (category: Category) => category.id === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedcategory ? (
            <CategoryRow category={selectedcategory} />
          ) : (
            "Select Category"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category..." />
          <CommandGroup>
            <CommandList>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))
              ) : categories?.length ? (
                categories.map((category: Category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      setValue(category.id);
                      setOpen(false);
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 opacity-0",
                        value === category.id && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  No categories found.
                </div>
              )}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center">
      <span>{category.name}</span>
    </div>
  );
}
