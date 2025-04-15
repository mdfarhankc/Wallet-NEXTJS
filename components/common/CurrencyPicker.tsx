import React, { useEffect, useState } from "react";
import { Currency } from "@prisma/client";
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
import { useGetCurrencies } from "@/hooks/useGetCurrencies";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyPickerProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

export default function CurrencyPicker({
  onChange,
  defaultValue,
}: CurrencyPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);
  const { currencies } = useGetCurrencies();

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const selectedcurrency = currencies?.find(
    (currency: Currency) => currency.id === value
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
          {selectedcurrency ? (
            <CurrencyRow currency={selectedcurrency} />
          ) : (
            "Select Currency"
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
          <CommandInput placeholder="Search currency..." />
          <CommandGroup>
            <CommandList>
              {currencies &&
                currencies.map((currency: Currency) => (
                  <CommandItem
                    key={currency.id}
                    onSelect={() => {
                      setValue(currency.id);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CurrencyRow currency={currency} />
                    <Check
                      className={cn(
                        "mr-2 w-4 h-4 opacity-0",
                        value === currency.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CurrencyRow({ currency }: { currency: Currency }) {
  return (
    <div className="flex items-center">
      <span>{currency.name}</span>
    </div>
  );
}
