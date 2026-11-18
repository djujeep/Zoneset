import { useState } from 'react'
import useSky from './hooks/useSky.js'
import nightPhoto from './assets/sky/night.webp'
import morningPhoto from './assets/sky/morning.webp'
import dayPhoto from './assets/sky/day.webp'
import duskPhoto from './assets/sky/dusk.webp'
import {
  CheckCircleIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  LockSimpleIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'
import Snow from './components/Snow.jsx'
import Logo from './components/Logo.jsx'
import { isChristmasSeason, localTime } from './utils/sky.js'


const photos = { night: nightPhoto, morning: morningPhoto, day: dayPhoto, dusk: duskPhoto }

const points = [
  { title: "See every client's time at once", text: 'Add cities and watch their clocks, weather and day side by side.' },
  { title: 'Know your working time before a deadline', text: 'See how many of your own working hours you have before it is due.' },
  { title: 'Get warned before it goes wrong', text: "Public holidays and clock changes in your client's country are flagged for you." },
]
const APP_NAME = 'Zoneset'
const BUTTONDOWN_USERNAME = 'eluwa'
const CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb9Zbl1L7UVSBebIoI15'


const FONT = 'phone'

const fonts = {
  friendly: { body: 'font-friendly', headline: 'font-friendly' },
  clean: { body: 'font-clean', headline: 'font-clean' },
  serif: { body: 'font-clean', headline: 'font-headline' },
  phone: { body: 'font-phone', headline: 'font-phone' },
sansnew: { body: 'font-sans-new', headline: 'font-sans-new' },
}
export default function App() {
  const font = fonts[FONT]
  const { sky, now } = useSky()
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const canJoin = /\S+@\S+\.\S+/.test(email)

  const handleSubmit = () => {
    setTimeout(() => setJoined(true), 300)
  }
  const christmas = isChristmasSeason(now)

    return (
    <main
      data-sky={sky}
      className={`${font.body} relative isolate min-h-screen overflow-hidden bg-sky text-sky-ink transition-colors duration-[1500ms] motion-reduce:transition-none`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${photos[sky]})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: 'var(--sky-scrim)' }}
      />
 {christmas && <Snow />}
 <header className="absolute inset-x-0 top-0 z-10 px-4 pt-4 sm:px-8">
  <nav className="nav-glow mx-auto flex max-w-6xl items-center justify-between rounded-full bg-[var(--sky-chip)] py-2 pl-5 pr-2 backdrop-blur-md">
    <div className="inline-flex items-center gap-2 text-base font-semibold">
      <Logo />
      {APP_NAME}
    </div>

    {CHANNEL_URL && (
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#0f7f72] px-4 py-2 text-sm font-semibold text-white"
      >
        <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
        Follow on WhatsApp
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )}
  </nav>
</header>
      <div className="grid min-h-dvh lg:grid-cols-2">
        <section className="flex flex-col justify-center px-6 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-12 xl:px-24">
  <div className="max-w-lg">
    <p className="rise text-sm font-semibold text-sky-accent">Early access opening soon</p>

    <h1
  className={`${font.headline} rise mt-4 text-xl font-semibold leading-snug`}
  style={{ animationDelay: '100ms' }}
>
  A time zone planner for freelancers.
</h1>

    <p className="rise mt-3 text-base text-sky-muted" style={{ animationDelay: '200ms' }}>
  {APP_NAME} shows each client's local time, your working hours before a deadline, and
  holidays abroad.
</p>

    <ul className="rise mt-8 border-t border-sky-muted/30" style={{ animationDelay: '300ms' }}>
      {points.map(({ title, text }) => (
        <li key={title} className="flex gap-4 border-b border-sky-muted/30 py-4">
          <CheckCircleIcon
            size={22}
            weight="fill"
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-sky-accent"
          />
          <div>
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-0.5 text-sm text-sky-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>

    <p className="rise mt-6 text-sm text-sky-muted" style={{ animationDelay: '400ms' }}>
      Made for all kinds of freelancers.
    </p>
  </div>
</section>

               <div
  className="rise flex items-center justify-center px-6 py-12 sm:px-12"
  style={{ animationDelay: '400ms' }}
>
  <div className="w-full max-w-sm rounded-xl border border-white/60 bg-gradient-to-b from-white/85 to-white/60 p-6 text-[#1b1b2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8">
          {joined ? (
           <div className="rise" aria-live="polite">
  <CheckCircleIcon size={40} className="text-accent" weight="fill" aria-hidden="true" />
  <h2 className="mt-3 text-xl font-semibold">You're on the list.</h2>
  <p className="mt-2 text-[#5d6178]">
    We sent a message to <span className="font-medium text-[#1b1b2f]">{email}</span>.
  </p>

  <ol className="mt-5 border-t border-[#e3e5ee]">
    <li className="flex gap-3 border-b border-[#e3e5ee] py-3">
      <span className="font-semibold">1</span>
      <span>Open the email from Buttondown. If it isn't in your inbox, check spam.</span>
    </li>
    <li className="flex gap-3 border-b border-[#e3e5ee] py-3">
      <span className="font-semibold">2</span>
      <span>Click the confirm link, so we know it's really you.</span>
    </li>
    {CHANNEL_URL && (
      <li className="flex gap-3 border-b border-[#e3e5ee] py-3">
        <span className="font-semibold">3</span>
        <span>
          Follow the{' '}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            WhatsApp Channel
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{' '}
          for updates before launch.
        </span>
      </li>
    )}
  </ol>

  <button
    type="button"
    onClick={() => setJoined(false)}
    className="mt-5 text-sm text-[#5d6178] underline underline-offset-4"
  >
    Used the wrong email? Go back
  </button>
</div>
          ) : (
            <form
  action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`}
  className="flex flex-col gap-4"
  method="post"
  target="buttondown-frame"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="embed" value="1" />
  <input type="hidden" name="tag" value="waitlist" />

  <div className="text-center">
    <h2 className="text-xl font-semibold">Get early access</h2>
<p className="mt-1 text-sm text-[#5d6178]">Join the waitlist and be first to try know when the site launches.</p>
  </div>

  <label htmlFor="email" className="sr-only">
    Your email
  </label>
  <div className="flex items-center gap-3 rounded-lg border border-accent bg-white/80 px-4 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
    <EnvelopeSimpleIcon size={20} aria-hidden="true" className="shrink-0 text-[#5d6178]" />
    <input
      id="email"
      name="email"
      type="email"
      required
      autoComplete="email"
      placeholder="Enter your email address"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      className="min-w-0 flex-1 bg-transparent py-3.5 text-base text-[#1b1b2f] placeholder:text-[#6b6f85] focus:outline-none"
    />
  </div>

  <label className="flex items-start gap-3 text-sm">
    <input type="checkbox" name="tag" value="newsletter" className="mt-0.5 h-4 w-4 shrink-0 accent-accent" />
    <span>Also send me news and tips about the app after launch.</span>
  </label>

  <button
    type="submit"
    disabled={!canJoin}
    className="rounded-lg bg-accent py-3.5 text-base font-semibold text-white disabled:opacity-40"
  >
    Join the waitlist
  </button>

  <p className="flex items-center justify-center gap-2 text-xs text-[#5d6178]">
    <LockSimpleIcon size={14} aria-hidden="true" />
    We respect your privacy. Unsubscribe at any time.
  </p>
</form>
                    )}
          </div>
        </div>
</div>
    <iframe name="buttondown-frame" title="Waitlist signup" className="hidden" />
    </main>
  )
}