'use client'
import React from 'react'
import clsx from 'clsx'

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label, disabled, ...props }) => {
  return (
    <label
      className={clsx(
        'inline-flex items-center gap-2 cursor-pointer',
        disabled && 'cursor-not-allowed opacity-70'
      )}
    >
      <span className="relative flex items-center justify-center">
        <input
          type="radio"
          disabled={disabled}
          className={clsx(
            'appearance-none w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            '',
            {
              'border-primary-main': props.checked && !disabled,
              'border-neutral-40 cursor-not-allowed': disabled,
              'border-neutral-90': !disabled,
            }
          )}
          {...props}
        />
        {/* inner circle */}
        <span
          className={clsx(
            'absolute w-3 h-3 rounded-full transition-all duration-200',
            props.checked
              ? disabled
                ? 'bg-neutral-60'
                : 'bg-primary-main'
              : 'bg-transparent'
          )}
        />
      </span>

      {label && (
        <span
          className={clsx(
            'text-sm select-none',
            disabled ? 'text-neutral-60' : 'text-neutral-90'
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}
