"use client";

import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "../ui/ToggleGroup";

interface ToggleFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string;
  isRequired?: boolean;
}

export function ToggleField<T extends FieldValues>({
  name,
  control,
  defaultValue,
  isRequired = false,
}: ToggleFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: controllerField }) => {
        return (
          <ToggleGroup
            type="single"
            defaultValue={defaultValue}
            onValueChange={(val) =>
              controllerField.onChange(val === "mandatory")
            }
            className="inline-flex items-center gap-2"
          >
            <ToggleGroupItem
              name={name}
              value="mandatory"
              className="items-center px-3 py-1 data-[state=on]:border-primary-main border data-[state=off]:border-neutral-40 data-[state=on]:text-primary-main !rounded-2xl h-auto"
            >
              <span className="text-text-m font-regular">Mandatory</span>
            </ToggleGroupItem>

            <ToggleGroupItem
              value="optional"
              name={name}
              disabled={isRequired}
              className="disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-60  items-center px-3 py-1 bg-neutral-30 border border-neutral-40 text-neutral-90 data-[state=on]:!border-primary-border data-[state=on]:text-primary-main !rounded-2xl h-auto"
            >
              <span className="text-text-m font-regular">Optional</span>
            </ToggleGroupItem>

            <ToggleGroupItem
              name={name}
              value="off"
              disabled={isRequired}
              // disabled={
              //   controllerField.value !== false && defaultValue === "mandatory"
              // }
              className="disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-60 items-center px-3 py-1 bg-neutral-30 !rounded-2xl overflow-hidden border border-solid border-neutral-40  data-[state=on]:!border-primary-border h-auto text-neutral-90 data-[state=on]:text-primary-main"
            >
              <span className="items-center w-fit text-text-m font-regular">
                Off
              </span>
            </ToggleGroupItem>
          </ToggleGroup>
        );
      }}
    />
  );
}
