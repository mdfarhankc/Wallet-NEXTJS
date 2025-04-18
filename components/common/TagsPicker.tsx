"use client";

import { useTags } from "@/hooks/useTags";
import { Tag } from "@prisma/client";
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
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface TagsPickerProps {
  onChange: (values: string[]) => void;
}

export default function TagsPicker({ onChange }: TagsPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);
  const { tags, isLoading } = useTags();

  useEffect(() => {
    if (!values) return;
    onChange(values);
  }, [onChange, values]);

  const toggleTag = (id: string) => {
    setValues((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  const selectedTags =
    tags?.filter((tag: Tag) => values.includes(tag.id)) ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "min-h-[2.5rem] w-full justify-between gap-2 flex-wrap",
            selectedTags.length > 0 && "py-1"
          )}
        >
          {selectedTags.length > 0 ? (
            <div className="flex flex-wrap gap-1 max-w-full">
              {selectedTags.map((tag: Tag) => (
                <span
                  key={tag.id}
                  className="flex items-center gap-1 text-xs bg-muted px-2 py-0.5 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Select Tags</span>
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search tag..." />
          <CommandGroup>
            <CommandList>
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </>
              ) : tags?.length ? (
                tags.map((tag: Tag) => {
                  const isSelected = values.includes(tag.id);
                  return (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => toggleTag(tag.id)}
                    >
                      <TagRow tag={tag} />
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  No tags found.
                </div>
              )}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function TagRow({ tag }: { tag: Tag }) {
  return (
    <div className="flex items-center">
      <span>{tag.name}</span>
    </div>
  );
}
