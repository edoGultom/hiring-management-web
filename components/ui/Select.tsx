"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import * as React from "react";

interface SelectItemType {
  value: string;
  label: React.ReactNode;
}

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SelectItemType[];
  registerItem: (item: SelectItemType) => void;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined
);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select");
  }
  return context;
};

// ==========================
// Root
// ==========================
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<SelectItemType[]>([]);

  const registerItem = React.useCallback((item: SelectItemType) => {
    setItems((prev) => {
      // hindari duplikat value
      if (prev.find((i) => i.value === item.value)) return prev;
      return [...prev, item];
    });
  }, []);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange,
        open,
        onOpenChange: setOpen,
        items,
        registerItem,
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

// ==========================
// Trigger
// ==========================
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useSelectContext();

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-[8px] border-2 border-neutral-40 bg-transparent px-4 py-2 text-text-m ring-offset-background",
        "focus:outline-none focus:ring-1 focus:ring-primary-main disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => onOpenChange(!open)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

// ==========================
// Value
// ==========================
export const SelectValue: React.FC<{ placeholder?: string }> = ({
  placeholder,
}) => {
  const { value, items } = useSelectContext();
  const selected = items.find((i) => i.value === value);
  const isPlaceholder = !selected;

  return (
    <span
      className={clsx(isPlaceholder ? "text-neutral-60" : "text-neutral-100")}
    >
      {selected ? selected.label : placeholder}
    </span>
  );
};

// ==========================
// Content
// ==========================
export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "popper" | "item-aligned";
  }
>(({ className, children, position = "popper", ...props }, ref) => {
  const { open, onOpenChange } = useSelectContext();

  if (!open) return null;

  return (
    <>
      {/* Klik di luar menutup dropdown */}
      <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} />

      <div
        ref={ref}
        className={clsx(
          "absolute z-50 max-h-96 overflow-hidden rounded-[8px] border border-neutral-40 bg-white text-neutral-100 mt-1 shadow-modal",
          position === "popper" && "w-full",
          className
        )}
        {...props}
      >
        <div>{children}</div>
      </div>
    </>
  );
});
SelectContent.displayName = "SelectContent";

// ==========================
// Item
// ==========================
export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className, children, value, ...props }, ref) => {
  const {
    value: selectedValue,
    onValueChange,
    onOpenChange,
    registerItem,
  } = useSelectContext();
  const isSelected = selectedValue === value;

  React.useEffect(() => {
    registerItem({ value, label: children });
  }, [value, children, registerItem]);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex w-full cursor-pointer select-none items-center font-bold text-text-s px-4 py-2",
        "hover:bg-neutral-20 hover:text-neutral-100",
        isSelected && "bg-primary-main/10 text-primary-main",
        className
      )}
      onClick={() => {
        onValueChange?.(value);
        onOpenChange(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

// ==========================
// Separator
// ==========================
export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("my-1 h-px bg-neutral-30", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";
