import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react';
import { Calendar } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Articles } from './Articles';
import { Faq } from './Faq';
import { Projects } from './Projects';
import { SkillTree } from './SkillTree';

const MENU = [
  { label: 'Mission', href: '#mission' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Projects', href: '#projects' },
  { label: 'Articles', href: '#articles' },
  { label: 'Skills', href: '#skill-tree' },
];

type IconProps = SVGProps<SVGSVGElement>;

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SoundCloudIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.1.101.1.05 0 .09-.04.099-.1l.255-2.105-.27-2.154c-.01-.055-.049-.1-.09-.1m-.899.828c-.05 0-.087.04-.094.09l-.172 1.427.172 1.399c.007.05.045.086.094.086s.08-.038.09-.09l.2-1.4-.2-1.428c-.01-.05-.04-.09-.09-.09m1.808-1.291c-.061 0-.114.05-.119.117l-.215 2.48.215 2.405c.005.063.058.113.119.113.06 0 .11-.05.115-.113l.25-2.405-.25-2.48c-.01-.067-.055-.118-.115-.118zm.928-.516c-.07 0-.125.055-.132.124l-.202 2.87.202 2.772c.007.072.063.126.132.126.067 0 .122-.054.13-.126l.234-2.772L3.27 12.28c-.01-.07-.063-.124-.13-.124zm1.025.1c-.076 0-.137.06-.142.137l-.176 2.766.176 2.704c.005.076.066.134.142.134.074 0 .135-.058.14-.134l.205-2.704-.205-2.766c-.008-.076-.066-.138-.14-.138zm.923-.788c-.084 0-.15.065-.155.148l-.17 3.41.17 3.29c.005.083.071.146.155.146.08 0 .148-.063.153-.146l.2-3.29-.2-3.41c-.006-.083-.073-.148-.153-.148zm.985-.293c-.09 0-.163.074-.168.163l-.162 3.7.162 3.545c.005.09.078.16.168.16.088 0 .16-.07.163-.16l.19-3.546-.19-3.7c-.004-.088-.075-.162-.163-.162zm.97.12c-.096 0-.173.077-.177.173l-.14 3.58.14 3.467c.004.094.08.168.177.168.093 0 .17-.074.175-.168l.163-3.467-.163-3.58A.177.177 0 0 0 6.91 10.385zm1.02-.65c-.105 0-.19.085-.194.19l-.127 4.23.127 4.05c.004.104.089.186.194.186.1 0 .185-.082.19-.186l.145-4.05-.145-4.23c-.005-.105-.09-.19-.19-.19m.983-.4c-.11 0-.2.09-.203.203l-.1 4.627.1 4.39c.003.113.093.2.203.2.108 0 .197-.087.2-.2l.12-4.39-.12-4.627a.203.203 0 0 0-.2-.203m1.025.01c-.12 0-.217.096-.22.216l-.07 4.62.07 4.41c.003.12.1.214.22.214.115 0 .21-.094.214-.214l.09-4.41-.09-4.62a.217.217 0 0 0-.214-.216m5.15-.047c-2.25 0-4.1 1.713-4.328 3.905-.32-.18-.68-.28-1.07-.28-.4 0-.77.11-1.09.3-.04.023-.06.07-.055.115l.18 3.55c.005.08.07.14.15.14h6.21c1.95 0 3.53-1.58 3.53-3.53 0-1.95-1.58-3.54-3.53-3.54" />
    </svg>
  );
}

function SpotifyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.092-.779-.154-.871-.54-.092-.403.154-.78.54-.87 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.273 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function PinterestIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  );
}

const SOCIALS: {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}[] = [
  { label: 'Cal', href: 'https://cal.com/vilakshankh/vilak-intro-30min', icon: Calendar },
  { label: 'Instagram', href: 'https://www.instagram.com/vilakshankh/', icon: InstagramIcon },
  { label: 'X', href: 'https://x.com/vilakshankhanna', icon: XIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vilakshan-khanna/', icon: LinkedInIcon },
  { label: 'SoundCloud', href: 'https://soundcloud.com/chaiwalla_dj', icon: SoundCloudIcon },
  { label: 'Spotify', href: 'https://open.spotify.com/user/vilakshankhanna', icon: SpotifyIcon },
  { label: 'Pinterest', href: 'https://ca.pinterest.com/vilakshankhanna/', icon: PinterestIcon },
];

const navItemClass = cn(
  navigationMenuTriggerStyle(),
  'h-auto rounded-full px-1.5 py-0.5 text-base font-normal hover:bg-white/15 focus:bg-transparent focus-visible:bg-white/15 data-active:bg-white/20 data-active:hover:bg-white/25 data-active:focus:bg-transparent data-active:focus-visible:bg-white/25 data-popup-open:bg-white/15 data-popup-open:hover:bg-white/15 data-popup-open:focus:bg-white/15 data-open:bg-white/15 data-open:hover:bg-white/15 data-open:focus:bg-white/15',
);

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

type NowPlaying = {
  playing: boolean;
  title?: string;
  artist?: string;
  genre?: string | null;
  cover?: string | null;
  url?: string | null;
};

function useNowPlaying() {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let active = true;

    const load = () => {
      fetch('/api/spotify')
        .then((response) => (response.ok ? response.json() : null))
        .then((data: NowPlaying | null) => {
          if (!active) return;
          setTrack(data?.title ? data : null);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    load();
    const id = setInterval(load, 20_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      active = false;
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return track;
}

function Listening({ track, link }: { track: NowPlaying | null; link: boolean }) {
  if (!track?.title) return 'Currently listening to';

  const details = (
    <>
      {track.cover && (
        <img
          src={track.cover}
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0 object-cover"
        />
      )}
      <span>{track.title}</span>
      {track.artist && (
        <>
          <span aria-hidden>·</span>
          <span>{track.artist}</span>
        </>
      )}
      {track.genre && (
        <>
          <span aria-hidden>·</span>
          <span>{track.genre}</span>
        </>
      )}
    </>
  );

  return (
    <span className="inline-flex items-center gap-1.5">
      <span>Currently listening to</span>
      {link && track.url ? (
        <a
          href={track.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-inherit no-underline"
        >
          {details}
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5">{details}</span>
      )}
    </span>
  );
}

function Marquee() {
  const track = useNowPlaying();
  const listeningIndex = ANNOUNCEMENTS.indexOf('Currently listening to');

  return (
    <div className="overflow-hidden bg-foreground py-1 text-sm font-bold whitespace-nowrap text-background">
      <div className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((text, i) => (
              <li key={i} className="flex items-center px-4">
                {text === 'Currently listening to' ? (
                  <Listening track={track} link={copy === 0 && i === listeningIndex} />
                ) : (
                  text
                )}
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
  const activeHref = ['#skill-tree', '#projects', '#articles', '#faq'].includes(hash) ? hash : '#mission';
  const socialsMenuRef = useRef<{ close: () => void } | null>(null);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Marquee />

      <main
        className={cn(
          'relative grid min-h-0 flex-1 grid-cols-5 grid-rows-[auto_1fr_auto] gap-x-6 p-4 md:px-6 md:pt-6',
          activeHref === '#mission' ? 'pb-24' : 'pb-4 md:pb-6',
          activeHref === '#mission' && 'mobile-portrait:grid-rows-[0.5fr_auto_auto_1.5fr]',
        )}
      >
        {activeHref === '#skill-tree' ? (
          <SkillTree className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : activeHref === '#faq' ? (
          <Faq className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : activeHref === '#projects' ? (
          <Projects className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : activeHref === '#articles' ? (
          <Articles className="col-span-5 row-span-3 min-h-0 md:row-span-2" />
        ) : (
          <>
            <p
              aria-hidden
              className="pointer-events-none col-span-5 overflow-clip text-[clamp(2.5rem,6vw,6rem)] leading-[1.1] tracking-tight opacity-10 blur-[7px] select-none md:col-span-4 mobile-portrait:col-start-1 mobile-portrait:row-span-4 mobile-portrait:row-start-1 mobile-portrait:self-start"
            >
              <Statement word={word} />
            </p>

            <div className="fixed inset-0 m-auto h-fit w-fit md:-translate-y-16 mobile-portrait:static mobile-portrait:col-span-5 mobile-portrait:col-start-1 mobile-portrait:row-start-2 mobile-portrait:my-0 mobile-landscape:inset-auto mobile-landscape:top-4 mobile-landscape:left-6 mobile-landscape:m-0">
              <Photobooth role={role} />
            </div>

            <h1 className="col-span-5 row-start-3 mb-16 self-end text-center text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.25] tracking-tight mobile-portrait:col-start-1 mobile-portrait:row-start-3 mobile-portrait:mt-6 mobile-portrait:mb-0">
              <Statement word={word} />
            </h1>
          </>
        )}
      </main>

      <NavigationMenu
        side="top"
        align="end"
        actionsRef={socialsMenuRef}
        className={cn(
          'fixed inset-x-4 z-50 mx-auto w-fit max-w-[calc(100vw-2rem)] flex-none justify-center rounded-full bg-black/50 p-1 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-2xl backdrop-saturate-150',
          'bottom-[max(1rem,env(safe-area-inset-bottom))]',
        )}
      >
        <NavigationMenuList className="gap-0.5">
          {MENU.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink
                href={item.href}
                active={item.href === activeHref}
                closeOnClick
                onMouseEnter={() => {
                  socialsMenuRef.current?.close();
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
                className={navItemClass}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navItemClass}>Socials</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-44 gap-0.5">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <NavigationMenuLink
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      closeOnClick
                      className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm leading-none"
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{label}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
