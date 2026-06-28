'use client';

import Link from 'next/link';
import { ArrowRight, Users, Eye, Settings, CircleCheck } from 'lucide-react';

const whatYouGet = [
  {
    icon: Users,
    title: 'A steady stream of people who want to show up',
    desc: 'Stop spending coordinator hours on forwards and cold calls. Your events reach people already looking for something meaningful to do.',
  },
  {
    icon: Eye,
    title: 'Visibility beyond your own network',
    desc: 'A profile page with your work, your cause, and your events. People discover you without you having to be everywhere.',
  },
  {
    icon: Settings,
    title: 'Tools that reduce your coordination load',
    desc: 'Listings, registration tracking, attendee communication — handled. You focus on the work, not the logistics.',
  },
];

const whoFor = [
  {
    label: 'Small NGO',
    desc: 'You have the impact. You just don\'t have the reach. We change that — without requiring a marketing budget.',
  },
  {
    label: 'Growing org',
    desc: 'You\'ve moved past the scramble. A reliable pipeline of people who already want to help changes everything.',
  },
  {
    label: 'Corporate CSR',
    desc: 'Your board wants reports. Your team wants meaning. We help you build programmes people join willingly.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Apply to list',
    desc: 'Tell us about your cause. We review and get back within 48 hours.',
    shade: 'text-emerald-200',
  },
  {
    num: '02',
    title: 'Create your event',
    desc: 'Add the details. We handle listing, discovery, and reminders.',
    shade: 'text-emerald-400',
  },
  {
    num: '03',
    title: 'People show up',
    desc: 'You get a list. Everyone arrives knowing why they\'re there.',
    shade: 'text-emerald-700',
  },
];

const reassurance = [
  {
    title: 'It\'s free to list',
    desc: 'No fee. We\'re building the community first.',
  },
  {
    title: 'We\'re selective',
    desc: 'Only genuine, well-organised events go live. That\'s what keeps people trusting us.',
  },
  {
    title: 'You stay in control',
    desc: 'Your page, your list, your communication. We surface you and step back.',
  },
  {
    title: 'Starting local, growing everywhere',
    desc: 'Get listed now and grow with us as we expand.',
  },
];

export default function ForNGOsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-0 border border-border rounded-3xl overflow-hidden">
          <div className="px-10 py-12 md:py-16 bg-card">
            <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-4">
              For organisations
            </p>
            <h1 className="font-headline text-3xl md:text-4xl leading-[1.15] tracking-tight text-foreground mb-5">
              Your cause deserves people who actually show up.
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              No cold outreach. No ghost registrations. Just people who turn up.
            </p>
            <Link
              href="/register-organisation"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Get your organisation listed
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="hidden md:block bg-accent/30 min-h-[420px]" />
        </div>
      </section>

      {/* ── BOLD STATEMENT ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
        <div className="border border-border rounded-2xl px-10 py-10 bg-card">
          <p className="font-headline text-xl md:text-2xl text-foreground leading-relaxed max-w-xl">
            We bring you people who genuinely want to be there.{' '}
            <span className="text-muted-foreground font-body font-normal">
              Not clicks. Not signups. People.
            </span>
          </p>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-8">
          What listing does for you
        </h2>
        <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {whatYouGet.map((item, i) => (
            <div key={i} className="flex items-center gap-5 px-6 py-5 bg-card hover:bg-secondary/40 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <item.icon size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-headline text-sm text-foreground mb-1">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section className="bg-accent/40 border-y border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-8">
            Built for organisations at every stage
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {whoFor.map((item, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden">
                <div className="bg-accent px-5 py-4">
                  <span className="font-headline text-sm text-accent-foreground">{item.label}</span>
                </div>
                <div className="px-5 py-4 bg-card">
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-8">
          Simple to get started
        </h2>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border border-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div key={i} className="px-7 py-8 bg-card">
              <div className={`font-headline text-3xl mb-4 ${step.shade}`}>{step.num}</div>
              <h3 className="font-headline text-base text-foreground mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REASSURANCE ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-8">
          A few things worth knowing
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reassurance.map((item, i) => (
            <div key={i} className="flex gap-3 px-5 py-5 border border-border rounded-2xl bg-card">
              <CircleCheck size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-headline text-sm text-foreground mb-1">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24" id="apply">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 py-8 border border-border rounded-2xl bg-card">
          <div>
            <h2 className="font-headline text-xl md:text-2xl text-foreground mb-1">
              Ready to bring people to your cause?
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-2">
              Less than 10 minutes to apply. We&apos;ll take it from there.
            </p>
            <p className="font-body text-xs text-muted-foreground/70">
              Questions? Write to us at{' '}
              <a href="mailto:hello@meetacause.in" className="text-primary hover:underline">
                hello@meetacause.in
              </a>
            </p>
          </div>
          <Link
            href="/register-organisation"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            List your organisation <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
