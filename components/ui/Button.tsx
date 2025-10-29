import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-text-l font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-main shadow-button hover:bg-primary-hover text-neutral-10",
        disabled:
          "border border-neutral-50 !bg-neutral-30 text-neutral-100 shadow-button hover:bg-neutral-20",
        outline:
          "border border-neutral-40 bg-neutral-10 text-neutral-100 shadow-button ",
        secondary:
          "bg-secondary-main text-neutral-90 shadow-button hover:bg-secondary-hover",
      },
      size: {
        default: "h-10 px-4 py-[6px]",
        sm: "h-8 rounded-[8px] px-3",
        xs: "h-7 rounded-[8px] px-4 py-1",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
