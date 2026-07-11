'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    name: 'Family',
    desc: 'The first place we learn what the world is. Relationships, kinship, the unspoken rules about gender and roles and who carries what. Parenting and the weight it carries. Ageing and the dignity it deserves. Domestic safety and the silence that surrounds its absence. Grief. And the chosen families that form when the given ones are not enough. What happens at home shapes everything else — and most of it goes unexamined.',
  },
  {
    name: 'Education',
    desc: 'Not just schooling — the full architecture of how people learn and who gets left out. Access and equity across geography and class. The quality of what is actually taught versus what should be. The medium of instruction and who it serves. Curriculum relevance. Teacher dignity — the most under-discussed variable in educational outcomes. Early childhood development. Alternative models. Digital literacy in an age that demands it. And the belief, worth defending, that learning never really stops.',
  },
  {
    name: 'Environment',
    desc: 'The systems that sustain life and the ones we are dismantling without fully understanding what we are losing. Climate, water, soil and food systems, biodiversity, urban ecology, animal welfare, waste, oceans, and the indigenous ecological knowledge that has always known how to live in balance. This is not about guilt. It is about showing up for the planet in ways that are practical, local, and real.',
  },
  {
    name: 'Self Care',
    desc: 'The internal life — often invisible, rarely prioritised, and consistently underfunded by both policy and culture. Mental health, emotional literacy, the ability to set and hold boundaries, trauma and the long work of healing, stress and burnout, body image, addiction, grief, and physical health understood as self-awareness rather than performance. You cannot pour from an empty vessel. This pillar exists because that sentence is true — and most people are running on empty.',
  },
  {
    name: 'Law',
    desc: 'Rights, justice, and the systems that are supposed to protect people — and often do not. Constitutional rights that exist on paper and not in practice. Access to justice for those without money or connections. Criminal justice reform. Consumer and digital rights in an age of surveillance. Women and the law. Child rights. Environmental law and its enforcement. Labour rights. Civic participation and why it atrophies. Democracy is not a spectator sport.',
  },
  {
    name: 'Spirituality',
    desc: 'Not religion — the deeper inquiry into what it means to be alive and what, if anything, it is for. Self-inquiry and the courage it requires. Liberation — not as an abstract concept but as a lived orientation. Meditation and contemplative practice. Presence and impermanence. Ego and identity and the exhausting work of maintaining them. Community and collective consciousness. Death and existence and the questions most people spend their lives avoiding. Ethics as spiritual practice.',
  },
  {
    name: 'Social Structures',
    desc: 'The invisible architecture that shapes who gets what and who does not — and why things are the way they are. Caste and its persistence across every domain of Indian life. Class and economic inequality. Gender and patriarchy and the ways they organise everyone\'s life whether they notice it or not. Media and narrative power — who gets to tell the story. Technology and power. Urban and rural divides. Public health systems. Disability and inclusion. The most interesting and most difficult questions live at the crossings.',
  },
  {
    name: 'Humans',
    desc: 'What it means to be a person in the world — in all its difficulty and beauty. Identity and belonging and the search for both. The philosophy of being. Dignity and the violence of its absence. Migration and displacement. Conflict and peace. Loneliness and connection and the epidemic of the former. Memory and collective identity. Livelihood and economic dignity. Diversity and coexistence — not as a slogan but as a daily practice. Love and compassion. The most universal pillar — and the one everything else ultimately comes back to.',
  },
  {
    name: 'Joy, Play and Creative Expression',
    desc: 'The dimension that makes life worth living beyond survival and duty. Music, dance, sport, humour, celebration, festival, craft, art, aesthetic experience, and the fundamental right to enjoy being alive. This is the pillar Meet A Cause is most directly built on — because joy is not a distraction from the serious work. It is what makes the serious work sustainable. You do not keep showing up for things that only cost you. You keep showing up for things that also give you something back.',
  },
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

        <div className="border-t border-border" />

        {/* ── MISSION ── */}
        <section className="space-y-5">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary">
            Our Mission
          </p>
          <h2 className="font-headline text-2xl md:text-3xl text-foreground leading-snug">
            To actively promote participation in causes — and find sustainable solutions to the real problems living inside them.
          </h2>
          <p className="font-body text-base text-foreground leading-relaxed">
            Awareness comes first. It always does. You cannot stand for something you have never seen clearly. Inspiration follows — the moment awareness becomes personal, becomes felt, becomes something you cannot unfeel. And then people stand. That is the sequence. That is how change actually moves through a person.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            The platform is how we do this work. Meet A Cause is not separate from the mission — it is the method. Every event listed here, every organisation we partner with, every person who shows up is part of how we find what works and what does not. The platform is not the product. The work is the product. The platform is just how we bring people to it.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Each of the nine areas we care about is a living landscape full of specific, urgent, unresolved problems. Problems that have existed for generations. Problems that have been studied, debated, campaigned about, and legislated around — and that persist anyway, because the systems that produce them are more durable than the efforts to fix them.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            We are not here to describe those problems. We are here to work on them. Slowly, honestly, in collaboration with the organisations and communities that are already inside them — finding approaches that do not just address symptoms but reach toward something more sustainable. More structural. More real.
          </p>
        </section>

        <div className="border-t border-border" />

        {/* ── VISION ── */}
        <section className="space-y-5">
          <p className="font-body text-xs font-medium tracking-widest uppercase text-primary">
            Our Vision
          </p>
          <h2 className="font-headline text-2xl md:text-3xl text-foreground leading-snug">
            Making living more conscious — instead of just going with it.
          </h2>
          <p className="font-body text-base text-foreground leading-relaxed">
            Not going with the family pattern that was handed down without examination. Not going with the system that benefits some at the cost of others simply because it has always been this way. Not going with the version of yourself that was assembled from other people's expectations before you were old enough to have your own.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Conscious living is not a destination. It is a practice. A daily, imperfect, sometimes uncomfortable practice of asking — why is this the way it is, do I actually believe this, and what would I choose if I were choosing freely.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            That is what we are inviting people into. Not as a product. As a direction.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            We invite everyone — including you, reading this — to be conscious about what we are trying to do. To question it. To challenge it. To tell us when we are wrong. The mission is not ours alone. It belongs to anyone willing to take it seriously.
          </p>
        </section>

        <div className="border-t border-border" />

        {/* ── 9 PILLARS ── */}
        <section className="space-y-8">
          <div className="space-y-3">
            <p className="font-body text-xs font-medium tracking-widest uppercase text-primary">
              What we care about
            </p>
            <h2 className="font-headline text-2xl md:text-3xl text-foreground leading-snug">
              Nine dimensions of a conscious life
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Not categories for filtering — a framework for understanding what it means to live as a conscious human being in community with other conscious human beings. The edges between them are porous by design. Because the world does not organise itself into categories. Joy and Justice are not opposites. They are, ultimately, the same project.
            </p>
          </div>
          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="px-6 py-5 rounded-xl border border-border bg-card hover:bg-accent/20 transition-colors"
              >
                <p className="font-headline text-base text-foreground mb-2">
                  {i + 1}. {pillar.name}
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ── WHAT WE ARE BUILDING TOWARD ── */}
        <section className="space-y-5">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground leading-snug">
            What we are building toward
          </h2>
          <p className="font-body text-base text-foreground leading-relaxed">
            Knowing about something is the beginning. Not the end.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            Most people already know, at some level, that the world is more complicated and more unjust and more fragile than the version they live inside daily. They know it from the news, from half-conversations, from the feeling they cannot shake when they slow down long enough to let it surface.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            But knowing is not the same as understanding. And understanding is not the same as being changed.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            The distance between knowing a problem exists and actually being present in a room where people are doing something about it — that distance is where most good intentions quietly go to sleep.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed">
            We exist in that distance. To close it. One experience at a time.
          </p>
        </section>

        <div className="border-t border-border" />

        {/* ── CLOSING ── */}
        <section className="space-y-6 pb-8">
          <h2 className="font-headline text-2xl md:text-3xl text-foreground leading-snug">
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
