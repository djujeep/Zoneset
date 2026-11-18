import { DesktopIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'

const options = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'system', label: 'System', Icon: DesktopIcon },
]

export default function ThemeToggle({ choice, onChange }) {
  return (
    <div role="radiogroup" aria-label="Colour mode" className="inline-flex gap-4">
      {options.map(({ value, label, Icon }) => {
        const selected = choice === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            onClick={() => onChange(value)}
           className={selected ? 'text-ink' : 'text-muted hover:text-ink'}
          >
            <Icon size={22} weight={selected ? 'fill' : 'regular'} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}