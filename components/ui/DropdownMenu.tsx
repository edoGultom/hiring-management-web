"use client";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownMenuProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  trigger?: React.ReactNode; // custom trigger, misal avatar
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  value,
  placeholder = "Select an option...",
  onChange,
  trigger,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  // close dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={clsx("relative", className)} ref={dropdownRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="focus:outline-none w-full flex items-center justify-end"
      >
        {trigger ? (
          trigger
        ) : (
          <span
            className={clsx(
              "truncate px-4 py-3 border rounded-lg bg-white text-sm shadow-sm transition",
              open ? "border-primary-main" : "border-neutral-200",
              "hover:border-primary-main focus:outline-none",
              !selected ? "text-neutral-400" : "text-neutral-900"
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
        )}

        {!trigger && (
          <svg
            className={clsx(
              "w-4 h-4 ml-2 transition-transform",
              open ? "rotate-180 text-primary-main" : "text-neutral-500"
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        )}
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 border border-neutral-200 rounded-lg bg-white shadow-md overflow-hidden">
          {options.map((option) => {
            const isActive = value === option.value;
            const isDisabled = option.disabled;

            return (
              <button
                key={option.value}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    onChange?.(option.value);
                    setOpen(false);
                  }
                }}
                className={clsx(
                  "w-full flex items-center justify-between px-4 py-2 text-sm transition-colors text-left",
                  {
                    "text-neutral-900 bg-white": !isActive && !isDisabled,
                    "hover:text-primary-main hover:bg-primary-main/5":
                      !isActive && !isDisabled,
                    "text-primary-main bg-primary-main/10 font-medium":
                      isActive && !isDisabled,
                    "text-neutral-400 cursor-not-allowed bg-white": isDisabled,
                  }
                )}
              >
                <span>{option.label}</span>
                {/* {!isDisabled && (
                  <span
                    className={clsx(
                      "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors",
                      {
                        "border-neutral-900": !isActive,
                        "border-primary-main": isActive,
                      }
                    )}
                  />
                )} */}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
