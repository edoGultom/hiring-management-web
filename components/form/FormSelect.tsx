"use client";

import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FormState,
} from "react-hook-form";
import clsx from "clsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";

interface Option {
  value: string;
  label: React.ReactNode;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  formState: FormState<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  className?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  formState,
  label,
  placeholder,
  options,
  required,
  className,
}: FormSelectProps<T>) {
  const error = formState.errors[name]?.message as string | undefined;

  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="mb-1 font-regular text-neutral-90 text-text-s"
        >
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}

      {/* Select input */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={clsx(
                "text-neutral-90 placeholder:text-neutral-60 w-full",
                error
                  ? "border-danger-main focus:border-danger-main"
                  : "border-neutral-40 focus:border-primary-main"
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* Error message */}
      {error && (
        <span className="mt-1 text-xs text-danger-main font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
