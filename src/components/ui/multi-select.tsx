"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  maxCount?: number;
  disabled?: boolean;
  className?: string;
  renderChip?: (option: MultiSelectOption, onRemove: () => void) => React.ReactNode;
  renderOption?: (option: MultiSelectOption, isSelected: boolean) => React.ReactNode;
}

export function MultiSelect({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  maxCount = 0,
  disabled = false,
  className,
  renderChip,
  renderOption,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || []);

  const selected = controlledValue ?? internalValue;

  const setSelected = React.useCallback(
    (next: string[] | ((prev: string[]) => string[])) => {
      const nextValue = typeof next === "function" ? next(selected) : next;
      if (controlledValue === undefined) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [controlledValue, selected, onValueChange]
  );

  const selectedOptions = React.useMemo(
    () => options.filter((o) => selected.includes(o.value)),
    [options, selected]
  );

  const handleSelect = React.useCallback(
    (optionValue: string) => {
      setSelected((prev) => {
        if (prev.includes(optionValue)) {
          return prev.filter((v) => v !== optionValue);
        }
        if (maxCount > 0 && prev.length >= maxCount) {
          return prev;
        }
        return [...prev, optionValue];
      });
      setSearch("");
    },
    [setSelected, maxCount]
  );

  const handleRemove = React.useCallback(
    (optionValue: string) => {
      setSelected((prev) => prev.filter((v) => v !== optionValue));
    },
    [setSelected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && search === "" && selected.length > 0) {
        e.preventDefault();
        setSelected((prev) => prev.slice(0, -1));
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [search, selected.length, setSelected]
  );

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Anchor asChild>
        <div
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          data-slot="multi-select"
          className={cn(
            "flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 py-1.5 text-sm shadow-sm",
            "transition-[color,border-color,box-shadow] duration-200",
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20",
            disabled && "pointer-events-none opacity-50",
            className
          )}
          onClick={() => {
            if (!disabled) {
              setOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          {selectedOptions.map((option) =>
            renderChip ? (
              <React.Fragment key={option.value}>
                {renderChip(option, () => handleRemove(option.value))}
              </React.Fragment>
            ) : (
              <span
                key={option.value}
                className="group/chip flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground animate-in fade-in-0 zoom-in-95 duration-150"
              >
                {option.label}
                <button
                  type="button"
                  aria-label={`Remove ${option.label}`}
                  className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-sm opacity-50 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                  onPointerDown={(e) => e.preventDefault()}
                >
                  <XIcon className="size-3" />
                </button>
              </span>
            )
          )}

          <div className="flex flex-1 items-center gap-1.5">
            <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              className="min-w-20 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder={selectedOptions.length > 0 ? placeholder : placeholder}
              value={search}
              disabled={disabled}
              onChange={(e) => {
                setSearch(e.target.value);
                if (!open) setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              className="ml-auto shrink-0 rounded-sm p-0.5 transition-colors hover:bg-accent"
              aria-label="Toggle options"
              tabIndex={-1}
              disabled={disabled}
            >
              <ChevronDownIcon
                className={cn(
                  "size-4 text-muted-foreground transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>
          </PopoverPrimitive.Trigger>
        </div>
      </PopoverPrimitive.Anchor>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 w-[var(--radix-popover-trigger-width)] rounded-lg border bg-popover shadow-lg outline-hidden",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <CommandPrimitive shouldFilter={false}>
            <CommandPrimitive.List className="max-h-60 overflow-y-auto p-1 scroll-py-1">
              {options.filter((option) => {
                if (!search) return true;
                const q = search.toLowerCase();
                return (
                  option.label.toLowerCase().includes(q) ||
                  option.description?.toLowerCase().includes(q)
                );
              }).length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-1 py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                options
                  .filter((option) => {
                    if (!search) return true;
                    const q = search.toLowerCase();
                    return (
                      option.label.toLowerCase().includes(q) ||
                      option.description?.toLowerCase().includes(q)
                    );
                  })
                  .map((option) => {
                    const isSelected = selected.includes(option.value);
                    return (
                      <CommandPrimitive.Item
                        key={option.value}
                        value={option.label}
                        disabled={option.disabled}
                        onSelect={() => handleSelect(option.value)}
                        className={cn(
                          "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md py-2 pl-3 pr-9 text-sm outline-none",
                          "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                          isSelected && "font-medium"
                        )}
                      >
                        {renderOption ? (
                          renderOption(option, isSelected)
                        ) : (
                          <>
                            <div className="flex flex-col">
                              <span className="text-sm">{option.label}</span>
                              {option.description && (
                                <span className="text-xs text-muted-foreground">
                                  {option.description}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                        {isSelected && (
                          <span className="absolute right-2.5 flex size-4 items-center justify-center text-primary">
                            <CheckIcon className="size-4" strokeWidth={2.5} />
                          </span>
                        )}
                      </CommandPrimitive.Item>
                    );
                  })
              )}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
