'use client'
import React from 'react'
import clsx from 'clsx'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface ChipProps {
  label: string
  active?: boolean
  onRemove?: () => void
  disabled?: boolean
}

export const Chip: React.FC<ChipProps> = ({ label, active, onRemove, disabled }) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-text-s font-regular transition-all select-none',
        {
          // Active
          'border-primary-main text-primary-main bg-primary-surface':
            active && !disabled,
          // Rest
          'border-neutral-40 text-neutral-70 bg-neutral-10':
            !active && !disabled,
          // Disabled
          'border-neutral-40 text-neutral-50 bg-neutral-20 cursor-not-allowed':
            disabled,
        }
      )}
    >
      {/* Left icon */}
      <CheckIcon
        className={clsx('w-4 h-4', {
          'text-primary-main': active && !disabled,
          'text-neutral-60': !active && !disabled,
          'text-neutral-50': disabled,
        })}
      />

      {/* Label */}
      <span>{label}</span>

      {/* Remove icon */}
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        className={clsx('focus:outline-none', {
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
        })}
      >
        <XMarkIcon
          className={clsx('w-4 h-4', {
            'text-primary-main hover:text-primary-hover': active && !disabled,
            'text-neutral-60 hover:text-neutral-80': !active && !disabled,
            'text-neutral-50': disabled,
          })}
        />
      </button>
    </div>
  )
}
