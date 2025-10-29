'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

interface DropdownItem {
  label: string
  value: string
  disabled?: boolean
}

interface DropdownGroup {
  groupLabel?: string
  items: DropdownItem[]
}

interface DropdownMenuGroupProps {
  groups: DropdownGroup[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
  groups,
  value,
  placeholder = 'Select an option...',
  onChange,
}) => {
  const [open, setOpen] = useState(false)
  const selected = groups
    .flatMap((g) => g.items)
    .find((item) => item.value === value)

  return (
    <div className="relative w-64">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          'w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white text-sm shadow-sm transition',
          open ? 'border-primary-main' : 'border-neutral-200',
          'hover:border-primary-main focus:outline-none'
        )}
      >
        <span
          className={clsx(
            'truncate',
            !selected ? 'text-neutral-400' : 'text-neutral-900'
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={clsx(
            'w-4 h-4 transition-transform',
            open ? 'rotate-180 text-primary-main' : 'text-neutral-500'
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute z-10 mt-2 w-full border border-neutral-200 rounded-lg bg-white shadow-md overflow-hidden max-h-80 overflow-y-auto">
          {groups.map((group, gIdx) => (
            <div key={gIdx}>
              {group.groupLabel && (
                <div className="px-4 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide bg-neutral-50">
                  {group.groupLabel}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = value === item.value
                const isDisabled = item.disabled

                return (
                  <button
                    key={item.value}
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) {
                        onChange?.(item.value)
                        setOpen(false)
                      }
                    }}
                    className={clsx(
                      'w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left',
                      {
                        // default
                        'text-neutral-900 bg-white': !isActive && !isDisabled,
                        // hover
                        'hover:text-primary-main hover:bg-primary-main/5':
                          !isActive && !isDisabled,
                        // active
                        'text-primary-main bg-primary-main/10 font-medium':
                          isActive && !isDisabled,
                        // disabled
                        'text-neutral-400 cursor-not-allowed bg-white': isDisabled,
                      }
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={clsx(
                        'w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors',
                        {
                          'border-neutral-900': !isActive && !isDisabled,
                          'border-primary-main': isActive && !isDisabled,
                          'border-neutral-400': isDisabled,
                        }
                      )}
                    />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
