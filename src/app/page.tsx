'use client';

import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, Search, Zap, Smile, Building2 } from 'lucide-react';

const featuredEvents = [
  {
    id: 1,
    tag: 'Education',
    tagColor: 'bg-emerald-50 text-emerald-800',
    title: 'Story Time at Isha School',
    date: 'Sun · 9 AM',
    location: 'Velachery',
    flavour: 'Help sort books, leave with chai and a conversation.',
    going: 8,
  },
  {
    id: 2,
    tag: 'Community',
    tagColor: 'bg-orange-50 text-orange-800',
    title: 'Adyar River Walk & Clean',
    date: 'Sat · 6:30 AM',
    location: 'Adyar',
    flavour: 'Walk the river. Make it better. Breakfast after.',
    going: 21,
  },
  {
    id: 3,
    tag: 'Arts',
    tagColor: 'bg-violet-50 text-violet-800',
    title: 'Mural Day, Royapuram',
    date: 'Sun · 8 AM',
    location: 'Royapuram',
    flavour: 'Paint a wall. Meet the neighbourhood.',
    going: 14,
  },
];

const steps = [
  {
    icon: Search,
    title: 'Browse events near you',
    desc: 'Filter by cause type. See who\'s going.',
  },
  {
    icon: Zap,
    title: 'Sign up in one tap',
    desc: 'No long forms. No history required. Just show up.',
  },
  {
    icon: Smile,
    title: 'Show up and meet people',
    desc: 'That\'s the whole thing. The rest happens naturally.',
  },
];

const personas = [
  {
    icon: '💼',
    title: 'The one with skills',
    desc: 'Years of experience. Spending a Saturday putting that to use — actually matters.',
  },
  {
    icon: '⏱',
    title: 'The one with time',
    desc: 'A couple of free hours and you want to do something worth talking about.',
  },
  {
    icon: '📍',
    title: 'The one who just moved here',
    desc: 'New to the city and want to meet people who care about things. Start here.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">

          {/* Left — copy */}
          <div>
            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
                <MapPin size={11} /> Chennai
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
                <Calendar size={11} /> This weekend
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground mb-5">
              Meet a cause worth{' '}
              <span className="text-primary">showing up for.</span>
            </h1>

            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
              Real events. Real people. Things happening in Chennai that actually matter — and are actually fun to be part of.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                See what&apos;s on this weekend
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/for-ngos"
                className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-secondary transition-colors"
              >
                For organisations
              </Link>
            </div>
          </div>

          {/* Right — floating event card */}
          <div className="hidden md:block">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">
                  Environment
                </span>
              </div>
              <h3 className="font-headline text-base text-foreground mb-2 leading-snug">
                Besant Nagar Beach Clean
              </h3>
              <div className="space-y-1 mb-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar size={11} /> Sat, 7 AM
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin size={11} /> Besant Nagar
                </p>
              </div>
              <div className="border-t border-border pt-3 flex items-center gap-1">
                {['P', 'A', 'M'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-card flex items-center justify-center text-[9px] font-semibold -ml-1 first:ml-0"
                    style={{
                      background: i === 0 ? '#BFDBFE' : i === 1 ? '#BBF7D0' : '#FECACA',
                      color: i === 0 ? '#1E40AF' : i === 1 ? '#166534' : '#991B1B',
                    }}
                  >
                    {initial}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-[9px] text-muted-foreground -ml-1">
                  +9
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS THIS ── */}
      <section className="bg-accent/40 border-y border-border py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-4">
              What is this place
            </p>
            <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-4 leading-snug">
              Not a fundraiser. Not an awareness drive.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base md:text-lg">
              Meet A Cause finds causes, organisations, and people doing real work in your city — and turns them into experiences you can actually join. A beach cleanup that ends with breakfast. A skills session at a school that becomes a conversation you didn&apos;t expect.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-base md:text-lg mt-4">
              You show up. You meet people. Something gets better. That&apos;s it.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-10">
          How it works
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <step.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-base text-foreground mb-1.5">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-1">
              Happening in Chennai
            </p>
            <h2 className="font-headline text-2xl md:text-3xl text-foreground">
              This weekend
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden md:inline-flex items-center gap-1.5 font-body text-sm text-primary font-medium hover:underline"
          >
            See all events <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col hover:border-primary/30 transition-colors cursor-pointer"
            >
              <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${event.tagColor}`}>
                {event.tag}
              </span>
              <h3 className="font-headline text-base text-foreground leading-snug mb-2">
                {event.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar size={10} /> {event.date} · {event.location}
              </p>
              <p className="font-body text-xs text-muted-foreground italic mt-1 leading-relaxed flex-1">
                {event.flavour}
              </p>
              <div className="border-t border-border mt-4 pt-3">
                <span className="font-body text-xs font-medium text-primary">
                  {event.going} people going
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-body text-sm text-primary font-medium"
          >
            See all events <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── WHO SHOWS UP ── */}
      <section className="bg-accent/40 border-y border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Who shows up
          </p>
          <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-10">
            People like you are already here.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {personas.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="text-2xl mb-4">{p.icon}</div>
                <h3 className="font-headline text-base text-foreground mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR ORGANISATIONS ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <Building2 size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-lg text-foreground mb-1">
                Running an event or a cause?
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Connect with people who genuinely want to show up. List your event, reach your city, build something that lasts.
              </p>
            </div>
          </div>
          <Link
            href="/for-ngos"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-border bg-background text-foreground font-body font-medium text-sm px-5 py-2.5 rounded-full hover:bg-secondary transition-colors"
          >
            Get listed <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-primary rounded-3xl px-8 py-16 md:py-20 text-center">
          <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground mb-3 leading-snug">
            Something good is happening this weekend.
          </h2>
          <p className="font-body text-primary-foreground/70 text-base mb-8">
            You should be there.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-white text-primary font-body font-medium text-sm px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Browse events <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
