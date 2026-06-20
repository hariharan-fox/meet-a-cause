'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight, Search, Zap, Smile, Building2 } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Browse events near you', desc: "Filter by cause type. See who's going." },
  { icon: Zap, title: 'Sign up in one tap', desc: 'No long forms. No history required. Just show up.' },
  { icon: Smile, title: 'Show up and meet people', desc: "That's the whole thing. The rest happens naturally." },
];

const personas = [
  { icon: '💼', title: 'The one with skills', desc: 'Years of experience. Spending a Saturday putting that to use — actually matters.' },
  { icon: '⏱', title: 'The one with time', desc: 'A couple of free hours and you want to do something worth talking about.' },
  { icon: '📍', title: 'The one who just moved here', desc: 'New to the city and want to meet people who care about things. Start here.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-[1fr_420px] gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
                <MapPin size={11} /> Chennai
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
                <Calendar size={11} /> This weekend
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground mb-5">
              Meet a cause worth{' '}
              <span className="text-primary">showing up for.</span>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
              Real events. Real people. Things happening in Chennai that actually matter — and are actually fun to be part of.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/events" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                See what&apos;s on this weekend <ArrowRight size={15} />
              </Link>
              <Link href="/for-ngos" className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-secondary transition-colors">
                For organisations
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="hidden md:block relative h-[480px] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="https://images.pexels.com/photos/15868483/pexels-photo-15868483.jpeg"
              alt="People showing up for a cause"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── WHAT IS THIS ── */}
      <section className="bg-accent/40 border-y border-border py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-4">What is this place</p>
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
        <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-10">How it works</p>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
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

      {/* ── WHO SHOWS UP ── */}
      <section className="bg-accent/40 border-y border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-3">Who shows up</p>
          <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-10">People like you are already here.</h2>
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
              <h3 className="font-headline text-lg text-foreground mb-1">Running an event or a cause?</h3>
              <p className="font-body text-sm text-muted-foreground">Connect with people who genuinely want to show up. List your event, reach your city, build something that lasts.</p>
            </div>
          </div>
          <Link href="/for-ngos" className="flex-shrink-0 inline-flex items-center gap-2 border border-border bg-background text-foreground font-body font-medium text-sm px-5 py-2.5 rounded-full hover:bg-secondary transition-colors">
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
          <p className="font-body text-primary-foreground/70 text-base mb-8">You should be there.</p>
          <Link href="/events" className="inline-flex items-center gap-2 bg-white text-primary font-body font-medium text-sm px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity">
            Browse events <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
}
