import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { contactCopy, profile } from '../data/portfolio'
import { ease, reveal } from '../lib/motion'

// Any endpoint that accepts a JSON POST works (Formspree, Web3Forms, your own API).
// Without one, the form hands the message to the visitor's email client instead.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

type Fields = { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Tell me what to call you.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'That email doesn’t look quite right.'
  if (f.message.trim().length < 10) e.message = 'A sentence or two, at least (10+ characters).'
  return e
}

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: {
  id: keyof Fields
  label: string
  error?: string
  textarea?: boolean
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  type?: string
  autoComplete?: string
}) {
  const common = {
    id,
    name: id,
    value: props.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onChange(e.target.value),
    onBlur: props.onBlur,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    placeholder: ' ',
    className:
      'peer w-full border-b bg-transparent pt-6 pb-2 text-[var(--color-ink)] outline-none transition-colors placeholder-transparent ' +
      (error ? 'border-[var(--color-accent-2)]' : 'border-[var(--color-line)] focus:border-[var(--color-accent)]'),
  }
  return (
    <div className="relative">
      {textarea ? <textarea rows={4} {...common} className={common.className + ' resize-none'} /> : <input type={props.type ?? 'text'} autoComplete={props.autoComplete} {...common} />}
      <label
        htmlFor={id}
        className="font-mono-tight pointer-events-none absolute top-0 left-0 text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-[var(--color-accent)]"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-[var(--color-accent-2)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const errors = validate(fields)
  const shownErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k as keyof Fields]),
  ) as typeof errors

  const set = (k: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [k]: v }))
    if (status === 'error') setStatus('idle')
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(errors).length) return

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Hello from ${fields.name.trim()}`)
      const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setFields({ name: '', email: '', message: '' })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden section-y">
      <div
        className="pointer-events-none absolute -top-40 right-[-20%] h-[70vw] max-h-[800px] w-[70vw] max-w-[800px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)' }}
      />

      <div className="relative z-10">
        <motion.div {...reveal} className="font-mono-tight mb-6 text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase">
          06 — Contact
        </motion.div>

        <motion.h2
          {...reveal}
          className="max-w-5xl text-[clamp(2.4rem,7vw,5.75rem)] leading-[1.02] font-medium text-[var(--color-ink)]"
        >
          {contactCopy.headlinePlain} {contactCopy.headlineMid}{' '}
          <em className="font-normal text-[var(--color-accent)] italic">{contactCopy.headlineAccent}</em>
        </motion.h2>

        <div className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:gap-16">
          <motion.div {...reveal} className="lg:col-span-5">
            <p className="max-w-[40ch] text-[var(--color-muted)] sm:text-lg">{contactCopy.sub}</p>

            <MagneticButton
              as="a"
              href={`mailto:${profile.email}`}
              data-cursor-text="EMAIL"
              className="group font-display mt-8 inline-flex items-center gap-3 border-b border-[var(--color-line)] pb-2 text-[clamp(1.05rem,2.2vw,1.5rem)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]"
            >
              <span className="break-all">{profile.email}</span>
              <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </MagneticButton>

            <ul className="mt-10 grid gap-0 border-t border-[var(--color-line)]">
              <li>
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  data-cursor-text="PDF"
                  className="group flex items-center justify-between border-b border-[var(--color-line)] py-4 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <span className="font-mono-tight text-xs tracking-[0.2em] uppercase">Résumé · PDF</span>
                  <span aria-hidden className="text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </a>
              </li>
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-[var(--color-line)] py-4 text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    <span className="font-mono-tight text-xs tracking-[0.2em] uppercase">{s.label}</span>
                    <span className="arrow-slide text-[var(--color-accent)]" aria-hidden>
                      <span>↗</span>
                      <span>↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            {...reveal}
            noValidate
            onSubmit={onSubmit}
            className="relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 p-6 backdrop-blur-sm sm:p-8 lg:col-span-7"
          >
            <div className="font-mono-tight mb-6 flex items-center justify-between text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
              <span>New message</span>
              <span>{ENDPOINT ? 'Goes straight to my inbox' : 'Opens in your email app'}</span>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="name" label="Your name" autoComplete="name" value={fields.name} onChange={set('name')} onBlur={() => setTouched((t) => ({ ...t, name: true }))} error={shownErrors.name} />
              <Field id="email" label="Email" type="email" autoComplete="email" value={fields.email} onChange={set('email')} onBlur={() => setTouched((t) => ({ ...t, email: true }))} error={shownErrors.email} />
              <div className="sm:col-span-2">
                <Field id="message" label="What are you working on?" textarea value={fields.message} onChange={set('message')} onBlur={() => setTouched((t) => ({ ...t, message: true }))} error={shownErrors.message} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="press group font-mono-tight inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-6 py-3 text-xs font-medium tracking-[0.15em] text-[var(--color-on-accent)] uppercase disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--color-on-accent)] border-t-transparent" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <span aria-hidden className="arrow-slide">
                      <span>→</span>
                      <span>→</span>
                    </span>
                  </>
                )}
              </button>

              <div aria-live="polite" className="text-sm">
                <AnimatePresence mode="wait">
                  {status === 'sent' && (
                    <motion.p key="sent" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ ease: ease.out }} className="text-[var(--color-accent)]">
                      ✓ Message sent — I’ll get back to you soon.
                    </motion.p>
                  )}
                  {status === 'mailto' && (
                    <motion.p key="mailto" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[var(--color-muted)]">
                      Your email app should have opened with the message — hit send there.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p key="error" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[var(--color-accent-2)]">
                      Couldn’t send that. Try again, or email me directly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
