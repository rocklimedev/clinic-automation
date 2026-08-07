import { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const current = value ?? internalValue;

  const setValue = (next) => {
    if (value === undefined) {
      setInternalValue(next);
    }

    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider
      value={{
        value: current,
        setValue,
      }}
    >
      <div className={cn("space-y-6", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center rounded-lg bg-[rgb(var(--border))]/50 p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, disabled = false, className, children }) {
  const { value: active, setValue } = useContext(TabsContext);

  const selected = active === value;

  return (
    <button
      disabled={disabled}
      onClick={() => !disabled && setValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all",
        selected
          ? "bg-[rgb(var(--card))] text-[rgb(var(--fg))] shadow-soft"
          : "text-[rgb(var(--muted-fg))] hover:text-[rgb(var(--fg))]",
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }) {
  const { value: active } = useContext(TabsContext);

  if (active !== value) return null;

  return (
    <div className={cn("animate-[var(--animate-in)]", className)}>
      {children}
    </div>
  );
}
