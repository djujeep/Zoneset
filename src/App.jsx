import { useState } from 'react'
import useSky from './hooks/useSky.js'
import nightPhoto from './assets/sky/night.webp'
import morningPhoto from './assets/sky/morning.webp'
import dayPhoto from './assets/sky/day.webp'
import duskPhoto from './assets/sky/dusk.webp'
import {
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  LockSimpleIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'
import Snow from './components/Snow.jsx'
import Logo from './components/Logo.jsx'
import { isChristmasSeason, localTime } from './utils/sky.js'
import TurnstileBox from './components/TurnstileBox.jsx'
import ZoneMockup from './components/ZoneMockup.jsx'

const photos = { night: nightPhoto, morning: morningPhoto, day: dayPhoto, dusk: duskPhoto }

const points = [
  { title: "See every client's time at once", text: 'Add cities and watch their clocks, weather and day side by side.' },
  { title: 'Know your working time before a deadline', text: 'See how many of your own working hours you have before it is due.' },
  { title: 'Get warned before it goes wrong', text: "Public holidays and clock changes in your client's country are flagged for you." },
]
const APP_NAME = 'Zoneset'
const WORKER_URL = 'https://zoneset-signup.girlytech.workers.dev'
const TURNSTILE_SITE_KEY = '0x4AAAAAAGKJ5HyVkD5memqp'
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
  const { sky: realSky, now } = useSky()
  const forced = new URLSearchParams(window.location.search).get('sky')
  const sky = photos[forced] ? forced : realSky
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [consent, setConsent] = useState(false)
  const [token, setToken] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const canJoin = /\S+@\S+\.\S+/.test(email) && consent && token !== '' && !sending

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canJoin) return
    setSending(true)
    setError('')
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, token }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setJoined(true)
      } else if (data.error === 'invalid_email') {
        setError('That email address does not look right. Please check it and try again.')
      } else if (data.error === 'bot_check_failed') {
        setError('The security check did not pass. Please try again.')
      } else {
        setError('Something went wrong on our side. Please try again in a moment.')
      }
    } catch {
      setError('We could not reach the server. Check your connection and try again.')
    } finally {
      setSending(false)
      setToken('')
      window.turnstile?.reset()
    }
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

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 sm:px-12 lg:pt-32">
        {/* Hero: message + form on the left, product on the right */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <section>
            <p className="rise text-sm font-semibold text-sky-accent">Early access opening soon</p>

            <h1
              className={`${font.headline} rise mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl`}
              style={{ animationDelay: '100ms' }}
            >
              Never miss a client deadline because of time zones.
            </h1>

            <p className="rise mt-4 max-w-lg text-base text-sky-muted" style={{ animationDelay: '200ms' }}>
              {APP_NAME} shows your client's local time, how many of your working hours you have
              before a deadline, and warns you about holidays and clock changes abroad.
            </p>

            <div
              className="rise mt-8 w-full max-w-md rounded-xl border border-white/60 bg-gradient-to-b from-white/85 to-white/60 p-6 text-[#1b1b2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8"
              style={{ animationDelay: '300ms' }}
            >
              {joined ? (
                <div className="rise" aria-live="polite">
                  <CheckCircleIcon size={40} weight="fill" aria-hidden="true" className="text-accent" />
                  <h2 className="mt-3 text-xl font-semibold">You're on the list.</h2>
                  <p className="mt-2 text-[#5d6178]">
                    We'll send updates about Zoneset to{' '}
                    <span className="font-medium text-[#1b1b2f]">{email}</span>.
                  </p>

                  {CHANNEL_URL && (
                    <p className="mt-4 text-sm">
                      Want updates sooner?{' '}
                      <a
                        href={CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4"
                      >
                        Follow the WhatsApp Channel
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      .
                    </p>
                  )}
                </div>
              ) : (
                <form
                id="waitlist" 
                className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Get early access</h2>
                    <p className="mt-1 text-sm text-[#5d6178]">
                      Join the waitlist and be first to try Zoneset when it launches.
                    </p>
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
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                    />
                    <span>I agree to receive updates about Zoneset by email. I can unsubscribe at any time.</span>
                  </label>

                  <TurnstileBox siteKey={TURNSTILE_SITE_KEY} onToken={setToken} />

                  {error && (
                    <p role="alert" className="text-sm text-[#b42318]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canJoin}
                    className="rounded-lg bg-accent py-3.5 text-base font-semibold text-white disabled:opacity-40"
                  >
                    {sending ? 'Joining...' : 'Join the waitlist'}
                  </button>

                  <p className="flex items-center justify-center gap-2 text-xs text-[#5d6178]">
                    <LockSimpleIcon size={14} aria-hidden="true" />
                    No spam. One email when we launch. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </section>

          <div className="rise flex justify-center lg:justify-end" style={{ animationDelay: '400ms' }}>
            <ZoneMockup />
          </div>
        </div>

        {/* Benefits: a row of three under the hero */}
        <ul
          className="rise mt-16 grid gap-8 border-t border-sky-muted/30 pt-8 md:grid-cols-3"
          style={{ animationDelay: '500ms' }}
        >
          {points.map(({ title, text }) => (
            <li key={title} className="flex gap-3">
              <CheckCircleIcon
                size={22}
                weight="fill"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-sky-accent"
              />
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-sky-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className="bg-[var(--sky-footer)] px-6 py-10 text-[#fff1e6] backdrop-blur-md sm:px-12">
  <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
    <div>
      <div className="inline-flex items-center gap-2 text-lg font-bold">
        <Logo />
        {APP_NAME}
      </div>
      <p className="mt-2 max-w-sm text-sm text-[#fff1e6]/80">
        Built for freelancers and remote professionals, wherever your clients are.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <a
        href="#waitlist"
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
      >
        Join the waitlist
      </a>
      {CHANNEL_URL && (
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold"
        >
          <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
          Follow on WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  </div>

  <p className="mx-auto mt-8 max-w-6xl border-t border-white/20 pt-6 text-xs text-[#fff1e6]/70">
    © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
  </p>
</footer>
    </main>
  )
}