// Made once, outside the component, so the flakes don't jump every time the page re-renders.
const flakes = Array.from({ length: 45 }, (_, id) => ({
  id,
  left: Math.random() * 100,
  size: 3 + Math.random() * 4,
  duration: 8 + Math.random() * 10,
  delay: -Math.random() * 15,
  drift: Math.random() * 40 - 20,
}))

export default function Snow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-5] overflow-hidden motion-reduce:hidden"
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            '--drift': `${flake.drift}px`,
          }}
        />
      ))}
    </div>
  )
}