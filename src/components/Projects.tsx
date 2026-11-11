import { useEffect, useState } from 'react';
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import Markdown, { type Components } from 'react-markdown';
import backseatFiles from '../projects/backseat-files.md?raw';
import studio555 from '../projects/555-studio.md?raw';
import frenchTranscription from '../projects/french-transcription.md?raw';
import designToolsWithAi from '../projects/design-tools-with-ai.md?raw';
import { cn } from '@/lib/utils';
import { parseHash, useHash } from '@/hooks/use-hash';
import { useMediaQuery } from '@/hooks/use-media-query';
import { PanelDrawer } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { COLUMN_DIVIDER_CLASS, Column } from './SkillTree';

const PROJECTS = [
  'Backseat Files',
  '555 Studio',
  'Design Tools with AI',
  'French Transcription',
  'The Butterfly Project',
  'Tecnishe',
];
const HIDDEN_PROJECTS = new Set(['The Butterfly Project', 'Tecnishe']);
const PROJECT_LINKS: Record<string, string> = {
  'Design Tools with AI': 'https://draftaid-gen-art.vercel.app/#axis',
  '555 Studio': 'https://www.555-studio.com/',
  'French Transcription': 'https://github.com/Vilakshankh/French-Transcription',
};

type ProjectSection = 'project' | 'media';

type ProjectMedia = {
  type: 'video' | 'image';
  src: string;
  width: number;
  height: number;
  alt?: string;
};

const PROJECT_MEDIA: Record<string, ProjectMedia[]> = {
  'Design Tools with AI': [
    {
      type: 'video',
      src: '/projects/design-tools-with-ai/screen-recording.mp4',
      width: 900,
      height: 720,
    },
    {
      type: 'video',
      src: '/projects/design-tools-with-ai/draftaid-ripple.mp4',
      width: 720,
      height: 720,
    },
  ],
  'Backseat Files': [
    { type: 'video', src: '/projects/backseat-files.mp4', width: 1080, height: 1920 },
    { type: 'video', src: '/projects/backseat-files-2.mp4', width: 1148, height: 934 },
  ],
  '555 Studio': [
    { type: 'image', src: '/projects/555-studio/logo.png', width: 819, height: 1024, alt: '555 chrome oval logo on black' },
    { type: 'image', src: '/projects/555-studio/event-talk.jpg', width: 1024, height: 682, alt: 'Speaker smiling in front of a projected question' },
    { type: 'image', src: '/projects/555-studio/event-room.jpg', width: 1024, height: 768, alt: 'Crowded room listening to a talk' },
    { type: 'image', src: '/projects/555-studio/event-speaker.jpg', width: 1024, height: 576, alt: 'Speaker presenting beside a screen about chat-style AI' },
    { type: 'image', src: '/projects/555-studio/event-group.jpg', width: 1024, height: 682, alt: 'Group photo of event attendees' },
    { type: 'image', src: '/projects/555-studio/jersey.png', width: 819, height: 1024, alt: '555 jersey with leopard-print side panels' },
    { type: 'image', src: '/projects/555-studio/ipod.jpg', width: 819, height: 1024, alt: 'Back of a scratched iPod engraved with the 555 logo' },
    { type: 'image', src: '/projects/555-studio/record.jpg', width: 819, height: 1024, alt: '555 record sleeve reading A Creative Experimentation Studio' },
  ],
  'French Transcription': [
    { type: 'video', src: '/projects/french-transcription/demo.mp4', width: 1058, height: 720 },
  ],
};

const PROJECT_CONTENT: Record<string, string> = {
  'Design Tools with AI': designToolsWithAi,
  'Backseat Files': backseatFiles,
  '555 Studio': studio555,
  'French Transcription': frenchTranscription,
};

const MARKDOWN_COMPONENTS: Components = {
  h1: ({ children }) => <h3 className="text-lg font-medium text-neutral-950">{children}</h3>,
  h2: ({ children }) => (
    <h3 className="mt-6 text-lg font-medium text-neutral-950 first:mt-0">{children}</h3>
  ),
  p: ({ children }) => <p className="text-sm leading-relaxed text-neutral-700">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-neutral-200 pl-3 [&_p]:text-neutral-500 [&_p]:italic">{children}</blockquote>
  ),
  ul: ({ children }) => <ul className="flex flex-col gap-2">{children}</ul>,
  ol: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-2 pl-4 text-sm leading-relaxed text-neutral-700 marker:text-neutral-400 [&>li]:pl-1 [&>li]:before:content-none">
      {children}
    </ol>
  ),
  em: ({ children }) => <em className="text-neutral-900 italic">{children}</em>,
  li: ({ children }) => (
    <li className="relative pl-4 text-sm leading-relaxed text-neutral-700 before:absolute before:left-0 before:text-neutral-300 before:content-['–']">
      {children}
    </li>
  ),
  img: ({ src, alt }) => <img src={src} alt={alt ?? ''} className="my-2 h-auto w-full" />,
  strong: ({ children }) => <strong className="font-medium text-neutral-900">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-neutral-900 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
    >
      {children}
    </a>
  ),
};

function ProjectNav({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (project: string) => void;
}) {
  return (
    <ToggleGroup
      orientation="vertical"
      value={[selected]}
      onValueChange={value => value[0] && onSelect(value[0])}
      className="w-full gap-0"
    >
      {PROJECTS.map(project => {
        if (HIDDEN_PROJECTS.has(project)) {
          return (
            <div
              key={project}
              className="flex h-auto w-full cursor-default items-start justify-start gap-2 rounded-none py-2 pr-0 pl-2.5 opacity-40"
            >
              <EyeOff aria-hidden className="mt-0.5 size-3.5 shrink-0 text-neutral-950" />
              <span className="text-sm font-medium text-neutral-500">{project}</span>
            </div>
          );
        }

        const link = PROJECT_LINKS[project];

        return (
          <div
            key={project}
            className={cn(
              'flex w-full items-start gap-1 transition-opacity',
              project !== selected && 'opacity-40 hover:opacity-100 focus-within:opacity-100',
            )}
          >
            <ToggleGroupItem
              value={project}
              className="group h-auto min-w-0 flex-1 items-start justify-start gap-2 rounded-none py-2 pr-0 pl-2.5 text-left font-normal whitespace-normal hover:bg-transparent aria-pressed:bg-neutral-50"
            >
              <Eye
                aria-hidden
                className="mt-0.5 size-3.5 shrink-0 text-neutral-950 opacity-0 transition-opacity group-aria-pressed:opacity-100"
              />
              <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 group-aria-pressed:text-neutral-950">
                {project}
              </span>
            </ToggleGroupItem>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project} website`}
                className="mt-2.5 shrink-0 text-neutral-400 transition-colors hover:text-neutral-950"
              >
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            )}
          </div>
        );
      })}
    </ToggleGroup>
  );
}

function ProjectMediaGallery({ project }: { project: string }) {
  return (
    <section aria-label={`${project} images`} className="flex flex-col">
      {PROJECT_MEDIA[project]?.map(media =>
        media.type === 'video' ? (
          <video
            key={media.src}
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
            style={{ aspectRatio: `${media.width} / ${media.height}` }}
            className="w-full shrink-0"
          />
        ) : (
          <img
            key={media.src}
            src={media.src}
            alt={media.alt ?? ''}
            width={media.width}
            height={media.height}
            className="h-auto w-full shrink-0"
          />
        ),
      )}
    </section>
  );
}

function projectLinkLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ProjectCopy({ project }: { project: string }) {
  const content = PROJECT_CONTENT[project];
  const link = PROJECT_LINKS[project];
  if (!content) return null;

  return (
    <article className="flex flex-col gap-4">
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1 text-sm text-neutral-900 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-900"
        >
          {projectLinkLabel(link)}
          <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      )}
      <Markdown components={MARKDOWN_COMPONENTS}>{content}</Markdown>
    </article>
  );
}

function projectSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function projectFromHash(hash: string) {
  const { section, item } = parseHash(hash);
  if (section !== 'projects' || !item) return undefined;
  const project = PROJECTS.find((name) => name === item || projectSlug(name) === item.toLowerCase());
  return project && !HIDDEN_PROJECTS.has(project) ? project : undefined;
}

export function Projects({ className }: { className?: string }) {
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const hash = useHash();
  const [selected, setSelected] = useState(() => projectFromHash(window.location.hash) ?? PROJECTS[0]);
  const [openSection, setOpenSection] = useState<ProjectSection | null>(null);

  useEffect(() => {
    const project = projectFromHash(hash);
    if (project) {
      setSelected(project);
      setOpenSection('media');
    }
  }, [hash]);

  const mediaCount = PROJECT_MEDIA[selected]?.length ?? 0;
  const mediaSummary = mediaCount === 0 ? 'None' : `${mediaCount} item${mediaCount === 1 ? '' : 's'}`;

  function selectProject(project: string) {
    setSelected(project);
    setOpenSection('media');
  }

  const projectNav = <ProjectNav selected={selected} onSelect={selectProject} />;

  if (!isDesktop) {
    return (
      <div className={cn('overflow-y-auto px-3 pb-nav', className)}>
        <div className="flex flex-col divide-y divide-neutral-200">
          <PanelDrawer
            open={openSection === 'project'}
            onOpenChange={open => setOpenSection(open ? 'project' : null)}
            title="Projects"
            summary={selected}
          >
            {projectNav}
          </PanelDrawer>
          <PanelDrawer
            open={openSection === 'media'}
            onOpenChange={open => setOpenSection(open ? 'media' : null)}
            title="Media"
            summary={mediaSummary}
          >
            <ProjectMediaGallery project={selected} />
          </PanelDrawer>
        </div>
        {PROJECT_CONTENT[selected] && (
          <div className="pt-8">
            <ProjectCopy project={selected} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[15rem_auto_minmax(0,0.7fr)_auto_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] gap-x-8',
        className,
      )}
    >
      <Column label="Projects">
        <div className="flex min-h-0 flex-1 flex-col justify-center pr-3 pb-nav">
          <ProjectNav selected={selected} onSelect={setSelected} />
        </div>
      </Column>

      <Separator orientation="vertical" className={COLUMN_DIVIDER_CLASS} />

      <section
        aria-label={`${selected} images`}
        className="flex min-h-0 flex-col overflow-y-auto pb-nav lg:-mx-8"
      >
        <ProjectMediaGallery project={selected} />
      </section>

      <Separator orientation="vertical" className={COLUMN_DIVIDER_CLASS} />

      <ScrollArea className="min-h-0">
        <div className="pr-3 pb-nav">
          <ProjectCopy project={selected} />
        </div>
      </ScrollArea>
    </div>
  );
}
