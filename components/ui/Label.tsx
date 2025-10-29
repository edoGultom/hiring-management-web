import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";

const labelVariants = cva(
  "text-text-s font-regular text-neutral-90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={clsx(labelVariants(), className)} {...props} />
));
Label.displayName = "Label";

export { Label };
