"use client";
import React from "react";
import clsx from "clsx";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface TextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  id?: string;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
}

export function TextArea<T extends FieldValues>({
  name,
  control,
  label,
  id,
  error,
  required,
  className,
  placeholder,
  rows = 3,
}: TextAreaProps<T>) {
  const inputId = id ?? (name as string);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // 🧠 HANDLE PASTE
        const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
          e.preventDefault();
          const pastedText = e.clipboardData.getData("text");
          const lines = pastedText
            .split(/\r?\n/)
            .filter((line) => line.trim() !== "");

          const bulleted = lines.map((line) => `• ${line}`).join("\n");

          const el = textareaRef.current;
          if (!el) return;

          const { selectionStart, selectionEnd, value } = el;

          // Jika user menyeleksi teks tertentu → gantikan bagian itu saja
          // Kalau tidak → timpa seluruh teks
          let newValue: string;
          if (selectionStart !== selectionEnd) {
            newValue =
              value.substring(0, selectionStart) +
              bulleted +
              value.substring(selectionEnd);
          } else {
            newValue = bulleted; // timpa isi lama
          }

          field.onChange(newValue);

          // Geser cursor ke akhir paste
          setTimeout(() => {
            const realEl = textareaRef.current;
            if (realEl) {
              realEl.focus();
              const pos = newValue.length;
              realEl.selectionStart = pos;
              realEl.selectionEnd = pos;
            }
          }, 0);
        };

        // 🧠 HANDLE ENTER
        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();

            const el = textareaRef.current;
            if (!el) return;

            const { selectionStart, selectionEnd, value } = el;
            const before = value.substring(0, selectionStart);
            const after = value.substring(selectionEnd);

            const insertion = "\n• ";
            const newValue = before + insertion + after;

            field.onChange(newValue);

            // Geser kursor ke posisi setelah bullet
            const cursorPos = selectionStart + insertion.length;

            setTimeout(() => {
              const realEl = textareaRef.current;
              if (realEl) {
                realEl.focus();
                realEl.selectionStart = cursorPos;
                realEl.selectionEnd = cursorPos;
              }
            }, 0);
          }
        };

        return (
          <div className="flex flex-col items-start gap-2 w-full">
            {label && (
              <label
                htmlFor={inputId}
                className="font-regular text-neutral-90 text-text-s"
              >
                {label}
                {required && <span className="text-danger-main ml-1">*</span>}
              </label>
            )}

            <textarea
              id={inputId}
              {...field}
              ref={textareaRef}
              rows={rows}
              placeholder={placeholder}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              className={clsx(
                "w-full border-2 border-neutral-40 rounded-lg px-4 py-2",
                "focus:border-primary-main focus:outline-none",
                "font-sans whitespace-pre-wrap",
                error && "border-danger-main",
                className
              )}
            />

            {error && (
              <span className="text-danger-main text-[12px]">{error}</span>
            )}
          </div>
        );
      }}
    />
  );
}
