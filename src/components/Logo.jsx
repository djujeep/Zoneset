export default function Logo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 9H22" />
      <path d="M10 23H24" />
      <path d="M22 9L10 23" className="stroke-sky-accent" />
    </svg>
  )
}