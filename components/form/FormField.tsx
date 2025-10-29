"use client";

import React, { useState } from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import clsx from "clsx";
import { Input } from "./Input";
import { CheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type DefaultFieldValues = FieldValues;

interface BaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  required?: boolean;
  prefix?: string;
}

export interface FormFieldProps<T extends FieldValues = DefaultFieldValues>
  extends BaseProps {
  name: Path<T>;
  control: Control<T>;
}

function FormFieldInner<T extends FieldValues = DefaultFieldValues>(
  {
    label,
    error,
    success,
    type = "text",
    className,
    required = false,
    prefix,
    control,
    name,
    placeholder,
    ...props
  }: FormFieldProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isNumber = type === "number";

  const togglePassword = () => setShowPassword((s) => !s);

  const formatCurrency = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {label && (
        <label
          htmlFor={String(name)}
          className="font-regular text-neutral-90 text-text-s"
        >
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => {
          const displayValue =
            isNumber && field.value !== undefined && field.value !== null
              ? formatCurrency(String(field.value))
              : field.value ?? "";

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isNumber) {
              const raw = e.target.value;
              const numericValue = raw.replace(/\D/g, "");
              field.onChange(Number(numericValue));
            } else {
              field.onChange(e);
            }
          };

          return (
            <div className="relative w-full">
              {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-90 text-sm font-medium">
                  {prefix}
                </span>
              )}

              <Input
                id={String(name)}
                ref={ref}
                name={field.name}
                type={
                  isPassword && showPassword ? "text" : isNumber ? "text" : type
                }
                inputMode={isNumber ? "numeric" : undefined}
                value={displayValue}
                onChange={handleChange}
                onBlur={field.onBlur}
                required={required}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder={placeholder}
                className={clsx(
                  "h-10 w-full bg-neutral-10 rounded-lg border-2 border-neutral-40 py-2 transition-colors duration-150",
                  "font-regular text-text-m placeholder:text-neutral-60",
                  "focus:outline-none focus-visible:ring-0 focus:border-primary-main",
                  error && "!border-danger-main focus:border-danger-main",
                  prefix ? "pl-10 pr-4" : "px-4",
                  className
                )}
                {...props}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-3 flex items-center text-neutral-60 hover:text-neutral-80 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 fill-neutral-100" />
                  ) : (
                    <EyeIcon className="w-5 h-5 fill-neutral-100" />
                  )}
                </button>
              )}
            </div>
          );
        }}
      />

      {error && (
        <div className="flex justify-center items-center gap-[6px]">
          <ExclamationTriangleIcon className="w-[11px] h-[11px] stroke-danger-main stroke-[2.5]" />
          <span className="text-danger-main text-text-s font-regular">
            {error}
          </span>
        </div>
      )}

      {!error && success && (
        <div className="flex gap-1 items-center mt-2">
          <CheckIcon className="w-4 h-4 text-success-main" />
          <p className="text-text-s font-regular text-success-main">
            {success}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Tipe untuk komponen yang diexport — sertakan displayName agar bisa di-assign
 */
type FormFieldComponent = <T extends FieldValues = DefaultFieldValues>(
  props: FormFieldProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement | null;

/**
 * Export: forwardRef lalu cast ke FormFieldComponent & tambahkan displayName property
 */
const FormField = React.forwardRef(FormFieldInner) as FormFieldComponent & {
  displayName?: string;
};

FormField.displayName = "FormField";

export { FormField };
