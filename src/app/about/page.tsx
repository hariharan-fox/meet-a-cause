'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pillars = [
  { name: 'Family', desc: 'Relationships, kinship, parenting, grief, chosen family.' },
  { name: 'Education', desc: 'Access, quality, teacher dignity, digital literacy, lifelong learning.' },
  { name: 'Environment', desc: 'Climate, water, biodiversity, urban ecology, animal welfare, waste.' },
  { name: 'Self Care', desc: 'Mental health, emotional literacy, trauma, burnout, body image.' },
  { name: 'Law', desc: 'Constitutional rights, access to justice, child rights, civic participation.' },
  { name: 'Spirituality', desc: 'Self-inquiry, meditation, presence, ego, community consciousness.' },
  { name: 'Social Structures', desc: 'Caste, class, gender, media power, technology, intersectionality.' },
  { name: 'Humans', desc: 'Identity, dignity, migration, loneliness, memory, love, coexistence.' },
  { name: 'Joy & Expression', desc: 'Music, dance, sport, humour, craft, art, the right to enjoy life fully.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-20">

        {/* ── OPENING ── */}
        <section className="space-y-6">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary">
            About Meet A Cause
          </p>
          <h1 className="font-headline text-4xl md:text-5xl text-foreground leading-[1.15] tracking-tight">
            We are not a volunteering platform.
          </h1>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            We are a social experience platform where interesting people show up for things that matter.
          </p>
        </section>

        {/* ── WHAT WE ARE ── */}
        <section className="space-y-5">
          <p className="font-body text-base text-foreground leading-relaxed">
            The world is full of people who care. They care about their city, their communities, the environment, the children in schools down the road. They care quietly, privately — and then go on with their day because there was nothing pulling them toward action.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Meet A Cause is that pull.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            We find causes, organisations, and people doing real work — and turn them into experiences you can actually join. A beach cleanup that ends with breakfast. A skills session at a school that becomes a conversation you did not expect. A run for a cause that leaves you with three new friends and a reason to come back next month.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Impact is the outcome. Not the pitch.
          </p>
        </section>

        {/* ── DIVIDER ── */}
        <div className="border-t border-border" />

        {/* ── WHY THIS EXISTS ── */}
        <section className="space-y-5">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground">
            Why this exists
          </h2>
          <p className="font-body text-base text-foreground leading-relaxed">
            Our founder grew up in a town where social cause work felt distant — something that happened elsewhere, to other people, in other circumstances. College brought NSS, and with it the first real encounter with organisations trying to do something meaningful with limited hands.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            What became clear quickly was not that people did not want to help. It was that nothing was actively pulling them in. Friends stood aside — not out of indifference, but because there was no platform making participation feel easy, obvious, and worth their time.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Meet A Cause was built to change that. To actively promote participation. To lead people toward causes instead of leaving them to stumble upon them. To build experiences that become a lifestyle — not one-time obligations people feel guilty about not repeating.
          </p>
        </section>

        {/* ── DIVIDER ── */}
        <div className="border-t border-border" />

        {/* ── THE PLATFORM ── */}
        <section className="space-y-5">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground">
            What we are building
          </h2>
          <p className="font-body text-base text-foreground leading-relaxed">
            A platform that treats community participation the way Cult.fit treats fitness — as something you show up for regularly because it is good for you and because the people around you make it worth it. The cause is real. The impact is real. But the reason you come back is the experience and the community.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            We started in Chennai. We are building for India.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Every event on this platform is run by a real organisation doing verified work. Every experience is designed to be worth your Saturday — not just worth feeling good about.
          </p>
        </section>

        {/* ── DIVIDER ── */}
        <div className="border-t border-border" />

        {/* ── WHAT WE CARE ABOUT ── */}
        <section className="space-y-6">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground">
            What we care about
          </h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Nine dimensions of life that organisations on this platform work across. Not categories for filtering — a framework for understanding what it means to live consciously.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="px-5 py-4 rounded-xl border border-border bg-card hover:bg-accent/30 transition-colors"
              >
                <p className="font-headline text-sm text-foreground mb-1">{pillar.name}</p>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="border-t border-border" />

        {/* ── DEEPER PHILOSOPHY ── */}
        <section className="space-y-5">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground">
            The deeper idea
          </h2>
          <p className="font-body text-base text-foreground leading-relaxed">
            We think of Meet A Cause as a consciousness platform. Community experiences are the vehicle. What they produce — if designed well — is people becoming more aware of themselves, of each other, and of the structures shaping their lives.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            We are not trying to make people activists. We are trying to make living more conscious — less going along with it, more deciding what it means.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            The platform is the container that makes questioning productive rather than chaotic. Individual questioning in community produces clarity. That is what we are after.
          </p>
        </section>

        {/* ── DIVIDER ── */}
        <div className="border-t border-border" />

        {/* ── CTA ── */}
        <section className="space-y-6 pb-8">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground">
            Come as you are. Show up for what matters.
          </h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            You do not need a background in social work. You do not need to know what you care about yet. You just need to show up once — and see what happens.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Browse Events <ArrowRight size={15} />
            </Link>
            <Link
              href="/for-ngos"
              className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-secondary transition-colors"
            >
              For Organisations
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
