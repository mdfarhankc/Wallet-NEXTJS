import React, { useEffect, useState } from "react";
import { Account } from "@prisma/client";
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
import { useAccounts } from "@/hooks/useAccounts";
import { Skeleton } from "../ui/skeleton";

interface AccountPickerProps {
  onChange: (value: string) => void;
}

export default function AccountPicker({ onChange }: AccountPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { accounts, isLoading } = useAccounts();

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const selectedaccount = accounts?.find(
    (account: Account) => account.id === value
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
          {selectedaccount ? (
            <AccountRow account={selectedaccount} />
          ) : (
            "Select Account"
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
          <CommandInput placeholder="Search account..." />
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
              ) : accounts?.length ? (
                accounts.map((account: Account) => (
                  <CommandItem
                    key={account.id}
                    onSelect={() => {
                      setValue(account.id);
                      setOpen(false);
                    }}
                  >
                    <AccountRow account={account} />
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 opacity-0",
                        value === account.id && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  No accounts found.
                </div>
              )}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function AccountRow({ account }: { account: Account }) {
  return (
    <div className="flex items-center">
      <span>{account.name}</span>
    </div>
  );
}
