import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type FaqRef = {
  href: string;
  label: string;
};

const FAQS: { q: string; a: string; link?: FaqRef }[] = [
  {
    q: 'What kind of role are you looking for?',
    a: 'Product design or brand design, ideally where I own the work end to end: identity, interface, and the thing that actually ships.',
  },
  {
    q: "Vilakshan's design process always starts with ______.",
    a: 'Talking to people. 200+ interviews at Trails, 200+ at Tecnishe. Opinions come after evidence.',
    link: { href: '#skill-tree/trails', label: 'Trails' },
  },
  {
    q: 'Why hire a designer who also writes code?',
    a: 'Handoff is where good design goes to die. At Trails I built the React component library myself, and it shipped to 10+ U.S. law firms.',
    link: { href: '#skill-tree/trails', label: 'Trails' },
  },
  {
    q: 'Founding designer means doing ______.',
    a: 'Everything. At Draftaid that means product UI, an icon system, the Webflow site, brand guidelines, and the tradeshow booth.',
    link: { href: '#skill-tree/draftaid', label: 'Draftaid' },
  },
  {
    q: "What's your brand design experience?",
    a: "I built 555 Studio's identity from scratch: logo, type, color, print, and web. At Draftaid I took over an existing brand and applied it everywhere.",
    link: { href: '#skill-tree/s555', label: '555 Studio' },
  },
  {
    q: 'Build a brand or inherit one?',
    a: 'Both. Building one teaches you what matters. Inheriting one teaches you restraint, and how to grow a system without breaking it.',
    link: { href: '#articles/generative-branding', label: 'Generative branding' },
  },
  {
    q: 'The weirdest thing I ever designed was ______.',
    a: 'A room. 555 Studio uses spatial design and pairing mechanics: 20+ events, 1,000+ people, and real friendships, mentorships, and relationships out of it.',
    link: { href: `#projects/${encodeURIComponent('555 Studio')}`, label: '555 Studio' },
  },
  {
    q: 'How do you use AI in your work?',
    a: 'As a build tool, not a substitute for taste. Cursor, v0, and Claude made our Figma-to-production pipeline 3× faster at Trails.',
    link: { href: '#articles/design-jigs', label: 'Design jigs' },
  },
  {
    q: 'Can you work with engineers?',
    a: 'I was one. At Matrox I shipped C++ GPU drivers and defined the APIs between design intent and hardware teams.',
    link: { href: '#skill-tree/matrox', label: 'Matrox' },
  },
  {
    q: "What's a product you're proud of?",
    a: 'A GPT-4 triage chatbot at Tecnishe that sent low-acuity patients to telehealth and cut ER wait times by 5 hours. Built before AI tooling was mature.',
    link: { href: '#skill-tree/tecnishe', label: 'Tecnishe' },
  },
  {
    q: 'Dating apps would be better without ______.',
    a: 'Swiping. At The Butterfly Project I designed a curated alternative and tested it in person with 150+ people over 20+ events.',
    link: { href: '#skill-tree/butterfly', label: 'The Butterfly Project' },
  },
  {
    q: 'How do you know if design worked?',
    a: 'Numbers when I can get them: 70% more engagement from A/B tests, 95% fewer support queries from guides I wrote. Stories when I can’t.',
    link: { href: '#skill-tree/mentic', label: 'Mentic' },
  },
  {
    q: 'Can you present to clients and stakeholders?',
    a: 'I closed a $1M contract at Matrox by demoing features to major media companies. I can also do it in English, French, Spanish, or Hindi.',
    link: { href: '#skill-tree/matrox', label: 'Matrox' },
  },
  {
    q: 'Where are you based?',
    a: 'Toronto, Canada. Open to remote, hybrid, or in-office.',
  },
  {
    q: "When I'm not designing, I'm ______.",
    a: 'DJing, hosting events, or meeting people IRL. It all feeds back into the work.',
    link: { href: `#projects/${encodeURIComponent('555 Studio')}`, label: '555 Studio' },
  },
  {
    q: 'How do I hire you?',
    a: "Reach out. I'm currently Brand Designer at Draftaid and looking for my next product or brand design role.",
    link: { href: 'https://cal.com/vilakshankh/vilak-intro-30min', label: 'Book a call' },
  },
];

function CardMark({ inverted }: { inverted?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight">
      <span aria-hidden className="relative inline-block h-3 w-4">
        {[-14, 0, 14].map((deg) => (
          <span
            key={deg}
            className={cn(
              'absolute inset-y-0 left-1 w-2 origin-bottom rounded-[2px] border',
              inverted ? 'border-red-800 bg-white' : 'border-white bg-red-800',
            )}
            style={{ transform: `rotate(${deg}deg)` }}
          />
        ))}
      </span>
      Ask Vilakshan
    </div>
  );
}

const FACE_CLASS =
  'absolute inset-0 flex flex-col justify-between rounded-2xl p-4 text-left backface-hidden md:p-5';

function FaqCard({ q, a, link }: { q: string; a: string; link?: FaqRef }) {
  const [flipped, setFlipped] = useState(false);
  const external = !!link && /^https?:\/\//.test(link.href);

  return (
    <div className="group relative min-h-44 perspective-[1200px] md:min-h-0">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? a : q}
        onClick={() => setFlipped((f) => !f)}
        className="absolute inset-0 z-0 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none relative size-full transition-transform duration-500 ease-out transform-3d motion-reduce:transition-none',
          flipped && 'rotate-y-180',
        )}
      >
        <div className={cn(FACE_CLASS, 'bg-red-800 text-white')}>
          <p className="text-[clamp(0.95rem,1.25vw,1.35rem)] leading-tight font-bold tracking-tight">{q}</p>
          <CardMark />
        </div>
        <div className={cn(FACE_CLASS, 'rotate-y-180 bg-white text-red-800 ring-1 ring-red-800/15')}>
          <p className="text-[clamp(0.8rem,0.95vw,1rem)] leading-snug font-bold tracking-tight">{a}</p>
          <div className="flex items-end justify-between gap-2">
            {link ? (
              <a
                href={link.href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="pointer-events-auto relative z-10 inline-flex max-w-[60%] items-center gap-0.5 text-xs font-bold tracking-tight text-neutral-950 underline decoration-neutral-950/30 underline-offset-2 hover:decoration-neutral-950 md:text-sm"
              >
                <span className="truncate">{link.label}</span>
                <ArrowUpRight aria-hidden className="size-3.5 shrink-0 md:size-4" />
              </a>
            ) : (
              <span />
            )}
            <CardMark inverted />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq({ className }: { className?: string }) {
  return (
    <section
      aria-label="Frequently asked questions"
      className={cn(
        'grid grid-cols-2 gap-2 overflow-y-auto pb-nav md:grid-cols-4 md:grid-rows-4 md:overflow-visible',
        className,
      )}
    >
      {FAQS.map((faq) => (
        <FaqCard key={faq.q} {...faq} />
      ))}
    </section>
  );
}
