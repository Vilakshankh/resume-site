import { useState } from 'react';
import { Eye } from 'lucide-react';
import Markdown, { type Components } from 'react-markdown';
import backseatFiles from '../projects/backseat-files.md?raw';
import studio555 from '../projects/555-studio.md?raw';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { COLUMN_DIVIDER_CLASS, Column } from './SkillTree';

const PROJECTS = ['Backseat Files', '555 Studio', 'The Butterfly Project', 'Tecnishe'];

type ProjectMedia = {
  type: 'video' | 'image';
  src: string;
  width: number;
  height: number;
  alt?: string;
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const PROJECT_MEDIA: Record<string, ProjectMedia[]> = {
  'Backseat Files': [
    { type: 'video', src: '/projects/backseat-files.mp4', width: 1080, height: 1920 },
    { type: 'video', src: '/projects/backseat-files-2.mp4', width: 1148, height: 934 },
  ],
  '555 Studio': [
    { type: 'image', src: '/projects/555-studio/logo.png', width: 819, height: 1024, alt: '555 chrome oval logo on black' },
    { type: 'image', src: '/projects/555-studio/jersey.png', width: 819, height: 1024, alt: '555 jersey with leopard-print side panels' },
    { type: 'image', src: '/projects/555-studio/ipod.jpg', width: 819, height: 1024, alt: 'Back of a scratched iPod engraved with the 555 logo' },
    { type: 'image', src: '/projects/555-studio/record.jpg', width: 819, height: 1024, alt: '555 record sleeve reading A Creative Experimentation Studio' },
    ...shuffle<ProjectMedia>([
      { type: 'image', src: '/projects/555-studio/event-talk.jpg', width: 1024, height: 682, alt: 'Speaker smiling in front of a projected question' },
      { type: 'image', src: '/projects/555-studio/event-room.jpg', width: 1024, height: 768, alt: 'Crowded room listening to a talk' },
      { type: 'image', src: '/projects/555-studio/event-speaker.jpg', width: 1024, height: 576, alt: 'Speaker presenting beside a screen about chat-style AI' },
      { type: 'image', src: '/projects/555-studio/event-group.jpg', width: 1024, height: 682, alt: 'Group photo of event attendees' },
    ]),
  ],
};

const PROJECT_CONTENT: Record<string, string> = {
  'Backseat Files': backseatFiles,
  '555 Studio': studio555,
};

const MARKDOWN_COMPONENTS: Components = {
  h1: ({ children }) => <h3 className="text-lg font-medium text-neutral-950">{children}</h3>,
  h2: ({ children }) => (
    <h4 className="mt-3 text-xs font-medium text-neutral-500">{children}</h4>
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

export function Projects({ className }: { className?: string }) {
  const [selected, setSelected] = useState(PROJECTS[0]);

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-y-6 overflow-y-auto lg:grid-cols-[15rem_auto_minmax(0,0.7fr)_auto_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-x-8 lg:overflow-visible',
        className,
      )}
    >
      <Column label="Project">
        <ToggleGroup
          orientation="vertical"
          value={[selected]}
          onValueChange={value => value[0] && setSelected(value[0])}
          className="w-full gap-0"
        >
          {PROJECTS.map(project => (
            <ToggleGroupItem
              key={project}
              value={project}
              className="group h-auto w-full justify-start gap-2 rounded-none py-2 pr-0 pl-2.5 text-left font-normal whitespace-normal hover:bg-transparent aria-pressed:bg-neutral-50"
            >
              <Eye
                aria-hidden
                className="size-3.5 shrink-0 text-neutral-950 opacity-0 transition-opacity group-aria-pressed:opacity-100"
              />
              <span className="text-sm text-neutral-500 transition-colors group-hover:text-neutral-900 group-aria-pressed:font-medium group-aria-pressed:text-neutral-950">
                {project}
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Column>

      <Separator orientation="vertical" className={cn('hidden lg:block', COLUMN_DIVIDER_CLASS)} />

      <section aria-label={`${selected} images`} className="flex min-h-64 flex-col lg:-mx-8 lg:min-h-0 lg:overflow-y-auto">
        {PROJECT_MEDIA[selected]?.map(media =>
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

      <Separator orientation="vertical" className={cn('hidden lg:block', COLUMN_DIVIDER_CLASS)} />

      <ScrollArea className="min-h-0">
        {PROJECT_CONTENT[selected] && (
          <article className="flex flex-col gap-4 pr-3">
            <Markdown components={MARKDOWN_COMPONENTS}>{PROJECT_CONTENT[selected]}</Markdown>
          </article>
        )}
      </ScrollArea>
    </div>
  );
}
