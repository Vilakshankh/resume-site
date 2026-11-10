import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Faq } from './Faq';
import { Projects } from './Projects';
import { SkillTree } from './SkillTree';

const MENU = [
  { label: 'Mission', href: '#mission' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skill Tree', href: '#skill-tree' },
];

const ANNOUNCEMENTS = [
  'Funding required - see mission',
  'Backseat project is now live',
  'Currently listening to',
];

const WORDS = [
  'design',
  'community',
  'music',
  'meeting IRL',
  'dreaming',
  'branding',
  'events',
  'product design',
];

const WORD_INTERVAL_MS = 2200;

const PHOTOS = [1, 2, 3, 4].map((n) => `/photobooth/${n}.png`);

const PHOTO_INTERVAL_MS = 250;

const ROLES = ['designer', 'community builder', 'dj'];

const FACTS = [
  'currently at Draftaid as Brand Designer',
  'based in Toronto, Canada',
  'speaks French, Spanish, English, Hindi',
];

const SLOT_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SLOT_TICK_MS = 35;

type Position = { top: number; left: number };

function scramble(text: string, settled: number) {
  return [...text]
    .map((ch, i) =>
      i < settled || ch === ' ' ? ch : SLOT_GLYPHS[Math.floor(Math.random() * SLOT_GLYPHS.length)],
    )
    .join('');
}

function randomPositions(): Position[] {
  const band = 80 / FACTS.length;
  return FACTS.map((_, i) => ({
    top: 8 + i * band + Math.random() * (band - 6),
    left: Math.random() * 25,
  }));
}

function SlotText({ text }: { text: string }) {
  const [display, setDisplay] = useState(() => scramble(text, 0));

  useEffect(() => {
    let settled = 0;
    const id = setInterval(() => {
      settled += 1;
      setDisplay(scramble(text, settled));
      if (settled >= text.length) clearInterval(id);
    }, SLOT_TICK_MS);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span aria-label={text}>
      {[...display].map((ch, i) => (
        <span key={i} aria-hidden className="bg-red-600 text-white">
          {ch}
        </span>
      ))}
    </span>
  );
}

function useTick(intervalMs: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return tick;
}

function useCycle<T>(items: T[], intervalMs: number) {
  return items[useTick(intervalMs) % items.length];
}

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Marquee() {
  return (
    <div className="overflow-hidden bg-foreground py-0.5 text-sm font-bold whitespace-nowrap text-background">
      <div className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((text, i) => (
              <li key={i} className="px-4">
                {text}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Photobooth({ role }: { role: string }) {
  const current = useCycle(PHOTOS, PHOTO_INTERVAL_MS);
  const [positions, setPositions] = useState<Position[] | null>(null);

  return (
    <figure className="flex flex-col items-center gap-3 mobile-landscape:items-start">
      <div
        className="relative aspect-[412/558] w-[clamp(140px,14vw,220px)] mobile-landscape:w-[30dvh]"
        onMouseEnter={() => setPositions(randomPositions())}
        onMouseLeave={() => setPositions(null)}
      >
        {PHOTOS.map((src) => (
          <img
            key={src}
            src={src}
            alt={src === PHOTOS[0] ? 'Photobooth portraits of Vilakshan Khanna' : ''}
            className={cn('absolute inset-0 size-full object-cover', src !== current && 'opacity-0')}
          />
        ))}
        {positions && (
          <div className="pointer-events-none absolute inset-0 z-10">
            {FACTS.map((fact, i) => (
              <p
                key={fact}
                className="absolute text-xs"
                style={{
                  top: `${positions[i].top}%`,
                  left: `${positions[i].left}%`,
                  maxWidth: `${100 - positions[i].left}%`,
                }}
              >
                <SlotText text={fact} />
              </p>
            ))}
          </div>
        )}
      </div>
      <figcaption className="flex items-baseline gap-2">
        <span className="text-lg">vilakshan khanna</span>
        <span
          key={role}
          className="text-xs tracking-widest text-muted-foreground animate-in fade-in slide-in-from-bottom-1 duration-500"
        >
          {role}
        </span>
      </figcaption>
    </figure>
  );
}

function Statement({ word }: { word: string }) {
  return (
    <>
      Dont be a robot.
      <br />
      Having intention is human.
      <br />
      I express mine through{' '}
      <span
        key={word}
        className="inline-block font-script animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        {word}
      </span>
      .
    </>
  );
}

export function Home() {
  const wordTick = useTick(WORD_INTERVAL_MS);
  const word = WORDS[wordTick % WORDS.length];
  const role = ROLES[wordTick % ROLES.length];
  const hash = useHash();
  const activeHref = ['#skill-tree', '#projects', '#faq'].includes(hash) ? hash : '#mission';

  return (
    <div className={cn('flex flex-col', activeHref === '#mission' ? 'min-h-dvh' : 'h-dvh')}>
      <Marquee />

      <main
        className={cn(
          'grid min-h-0 flex-1 grid-cols-5 grid-rows-[auto_1fr_auto] gap-x-6 p-4 md:p-6',
          activeHref === '#mission' && 'mobile-portrait:grid-rows-[1fr_auto_auto_1fr_auto]',        )}
      >
        {activeHref === '#skill-tree' ? (
          <SkillTree className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : activeHref === '#faq' ? (
          <Faq className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : activeHref === '#projects' ? (
          <Projects className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : (
          <>
            <p
              aria-hidden
              className="pointer-events-none col-span-5 text-[clamp(2.5rem,6vw,6rem)] leading-[1.1] tracking-tight opacity-10 blur-[7px] select-none md:col-span-4 mobile-portrait:col-start-1 mobile-portrait:row-span-4 mobile-portrait:row-start-1 mobile-portrait:self-start"
            >
              <Statement word={word} />
            </p>

            <div className="fixed inset-0 m-auto h-fit w-fit mobile-portrait:static mobile-portrait:col-span-5 mobile-portrait:col-start-1 mobile-portrait:row-start-2 mobile-portrait:my-0 mobile-landscape:inset-auto mobile-landscape:top-12 mobile-landscape:left-6 mobile-landscape:m-0">
              <Photobooth role={role} />
            </div>

            <h1 className="col-span-5 row-start-3 self-end text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.25] tracking-tight md:col-span-3 mobile-portrait:col-start-1 mobile-portrait:row-start-3 mobile-portrait:mt-6 mobile-portrait:text-center">
              <Statement word={word} />
            </h1>
          </>
        )}

        <NavigationMenu className="col-span-5 row-start-4 mt-4 -mr-4 -mb-4 w-fit flex-none self-end justify-self-end rounded-tl-xl bg-black p-1 text-white md:col-span-2 md:col-start-4 md:row-start-3 md:mt-0 md:-mr-6 md:-mb-6 mobile-portrait:row-start-5">
          <NavigationMenuList>
            {MENU.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  active={item.href === activeHref}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'h-auto px-1.5 py-0.5 text-base font-normal hover:bg-white/15 focus:bg-white/15 data-active:bg-white/20 data-active:hover:bg-white/25 data-active:focus:bg-white/25',
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </main>
    </div>
  );
}
