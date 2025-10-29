'use client'
import React from 'react'
import clsx from 'clsx'
import { CheckIcon } from '@heroicons/react/20/solid'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, disabled, checked, ...props }) => {
  return (
    <label
      className={clsx(
        'inline-flex items-center gap-2 select-none',
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
      )}
    >
      <span className="relative flex items-center justify-center">
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          className={clsx(
            'appearance-none w-5 h-5 border-2 rounded-[4px] flex items-center justify-center transition-all duration-200',
            {
              // Normal state
              'border-primary-main hover:border-primary-main/80': !checked && !disabled,

              // Checked state
              'bg-primary-main border-primary-main': checked && !disabled,

              // Disabled unchecked
              'border-neutral-60 bg-neutral-20 cursor-not-allowed': !checked && disabled,

              // Disabled checked
              'bg-neutral-60 border-neutral-60 cursor-not-allowed': checked && disabled,
            }
          )}
          {...props}
        />

        {/* ✅ Check icon */}
        <CheckIcon
          className={clsx(
            'absolute w-[12px] h-[12px] text-white transition-all duration-200 pointer-events-none',
            checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          )}
        />
      </span>

      {label && (
        <span
          className={clsx(
            'text-sm',
            disabled ? 'text-neutral-60' : 'text-neutral-90'
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}
