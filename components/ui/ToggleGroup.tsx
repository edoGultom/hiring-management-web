import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { toggleVariants } from "./Toggle";
import clsx from "clsx";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    value?: string;
    onValueChange?: (value: string) => void;
  }
>({
  size: "default",
  variant: "default",
});

interface ToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  type?: "single" | "multiple";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      variant,
      size,
      children,
      //   type = "single",
      value,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || ""
    );
    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={clsx("flex items-center justify-center gap-1", className)}
        {...props}
      >
        <ToggleGroupContext.Provider
          value={{
            variant,
            size,
            value: currentValue,
            onValueChange: handleValueChange,
          }}
        >
          {children}
        </ToggleGroupContext.Provider>
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, children, variant, size, value, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const isActive = context.value === value;

  const handleClick = () => {
    context.onValueChange?.(value);
  };

  return (
    <button
      ref={ref}
      type="button"
      data-state={isActive ? "on" : "off"}
      className={clsx(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
