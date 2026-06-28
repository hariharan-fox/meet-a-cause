'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Zap, Smile, Building2 } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse events near you.',
    desc: 'Filter by cause type. See who\'s going.',
    cta: 'Browse Events',
    href: '/events',
  },
  {
    icon: Zap,
    title: 'Sign up in one tap',
    desc: 'No long forms. No history required. Just show up.',
    cta: 'Get Started',
    href: '/signup',
  },
  {
    icon: Smile,
    title: 'Show up and meet people',
    desc: 'That\'s the whole thing. The rest happens naturally.',
    cta: 'Browse Events',
    href: '/events',
  },
];

const personas = [
  {
    label: 'The Specialist',
    title: 'The one with skills',
    desc: 'Architects, developers, and artists bringing their professional craft to grassroots community projects.',
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-9823971235-a7e78.firebasestorage.app/o/landing-page-images%2FThe%20one%20with%20skills.jpg?alt=media&token=4eb540af-f980-4c67-8120-89e5a6334f0b',
  },
  {
    label: 'The Heart',
    title: 'The one with time',
    desc: 'Students, retirees, and weekend warriors who believe their time is the most valuable gift they can give.',
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-9823971235-a7e78.firebasestorage.app/o/landing-page-images%2FThe%20one%20with%20time.jpg?alt=media&token=bd9e002b-c27f-4f6d-817e-ac1590733a52',
  },
  {
    label: 'The Explorer',
    title: 'The one who just moved',
    desc: 'Newcomers using causes as a way to discover the soul of their city and meet their new best friends.',
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-9823971235-a7e78.firebasestorage.app/o/landing-page-images%2FThe%20one%20who%20just%20moved.jpg?alt=media&token=08088f6f-27e3-489a-bc6f-d3b410d54f89',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <div
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground mb-8
            opacity-0 animate-[fade-in-up_0.5s_ease_0.1s_forwards]"
        >
          Real events. Real people. Real impact.
        </div>

        <h1
          className="font-headline text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground mb-6
            opacity-0 animate-[fade-in-up_0.5s_ease_0.2s_forwards]"
        >
          Meet A Cause worth<br />
          <span className="text-primary">showing up for</span>
        </h1>

        <p
          className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10
            opacity-0 animate-[fade-in-up_0.5s_ease_0.3s_forwards]"
        >
          Real events. Real people. Things happening near you that actually matter — and are actually fun to be part of.
        </p>

        <div
          className="flex flex-wrap gap-3 justify-center
            opacity-0 animate-[fade-in-up_0.5s_ease_0.4s_forwards]"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Explore Events <ArrowRight size={15} />
          </Link>
          <Link
            href="/for-ngos"
            className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-body font-medium text-sm px-7 py-3.5 rounded-full hover:bg-secondary transition-colors"
          >
            For Organisations
          </Link>
        </div>
      </section>

      {/* ── WHAT IS THIS PLACE ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 animate-[fade-in-up_0.6s_ease_0.1s_forwards]">
            <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-4">
              What is this place
            </p>
            <h2 className="font-headline text-3xl md:text-4xl text-foreground leading-snug mb-6">
              Not a fundraiser.<br />Not an awareness drive.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base mb-4">
              Meet A Cause finds causes, organisations, and people doing real work in your city — and turns them into experiences you can actually join. A beach cleanup that ends with breakfast. A skills session at a school that becomes a conversation you didn&apos;t expect.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-base">
              You show up. You meet people. Something gets better. That&apos;s it.
            </p>
          </div>
          <div
            className="relative h-[360px] rounded-2xl overflow-hidden shadow-sm
              opacity-0 animate-[fade-in-up_0.6s_ease_0.25s_forwards]"
          >
            <Image
  src="https://firebasestorage.googleapis.com/v0/b/studio-9823971235-a7e78.firebasestorage.app/o/landing-page-images%2FMeet%20A%20Cause.jpg?alt=media&token=3852b751-cc32-4dab-a0cb-8572d30eaef2"
  alt="People showing up for a cause"
  fill
  className="object-cover"
  unoptimized
/>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-accent/40 border-y border-border py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary mb-4 text-center">
            How it works
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-shadow
                  opacity-0 animate-[fade-in-up_0.5s_ease_forwards]"
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <step.icon size={20} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                <Link
                  href={step.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {step.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO SHOWS UP ── */}
      <section className="bg-primary py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="font-headline text-3xl md:text-4xl text-primary-foreground text-center mb-12
              opacity-0 animate-[fade-in-up_0.6s_ease_0.1s_forwards]"
          >
            People like you are already here
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {personas.map((p, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden h-[340px] group
                  opacity-0 animate-[fade-in-up_0.5s_ease_forwards]"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[10px] font-medium tracking-widest uppercase text-white/60 mb-2">
                    {p.label}
                  </span>
                  <h3 className="font-headline text-lg text-white mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-white/80 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR ORGANISATIONS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div
          className="bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6
            opacity-0 animate-[fade-in-up_0.6s_ease_0.1s_forwards]"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <Building2 size={22} className="text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl text-foreground mb-1">
                Running an event or a cause?
              </h3>
              <p className="font-body text-sm text-muted-foreground max-w-md">
                Connect with people who genuinely want to show up. List your event, reach your city, build something that lasts.
              </p>
            </div>
          </div>
          <Link
            href="/for-ngos"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-border bg-background text-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-secondary transition-colors"
          >
            Get listed <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        className="max-w-3xl mx-auto px-6 pb-28 text-center
          opacity-0 animate-[fade-in-up_0.6s_ease_0.1s_forwards]"
      >
        <h2 className="font-headline text-4xl md:text-5xl text-foreground leading-snug mb-4">
          Something good is happening this weekend. You should be there.
        </h2>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Explore Events <ArrowRight size={15} />
          </Link>
          <Link
            href="/for-ngos"
            className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-body font-medium text-sm px-7 py-3.5 rounded-full hover:bg-secondary transition-colors"
          >
            For Organisations
          </Link>
        </div>
      </section>

    </div>
  );
}
