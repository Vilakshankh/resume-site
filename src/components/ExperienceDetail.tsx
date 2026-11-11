import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { WRITING, type Writing } from '../writing';
import { SKILLS, type Experience } from '../data';
import { Chips, experienceTime } from './ExperienceCard';
import { WritingCards, WritingView } from './Writing';

function DetailBreadcrumb({
  experience,
  writing,
  onBack,
}: {
  experience: Experience;
  writing: Writing | null;
  onBack: () => void;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>Experience</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {writing ? (
            <BreadcrumbLink className="cursor-pointer" render={<button type="button" onClick={onBack} />}>
              {experience.company}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{experience.company}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {writing && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{writing.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function ExperienceDetail({ experience }: { experience: Experience }) {
  const writings = WRITING.filter(item => item.experienceId === experience.id);
  const skills = SKILLS.filter(skill => skill.ids.includes(experience.id)).map(skill => skill.name);
  const [slug, setSlug] = useState<string | null>(null);
  const writing = writings.find(item => item.slug === slug) ?? null;
  const topRef = useRef<HTMLElement>(null);
  const skipScroll = useRef(true);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [slug]);

  return (
    <article ref={topRef} className="flex flex-col gap-4">
      {writings.length > 0 && (
        <DetailBreadcrumb experience={experience} writing={writing} onBack={() => setSlug(null)} />
      )}
      {writing ? (
        <WritingView writing={writing} />
      ) : (
        <>
          <header className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-xl font-medium text-neutral-950 lg:text-lg">{experience.company}</h3>
                {skills.length > 0 && (
                  <span className="text-sm text-neutral-400">{skills.join(' · ')}</span>
                )}
              </div>
              <span className="shrink-0 text-right text-sm text-neutral-500">{experience.title}</span>
            </div>
            <span className="text-xs text-neutral-400">{experienceTime(experience)}</span>
          </header>
          <Chips experience={experience} />
          <p className="text-sm leading-relaxed text-neutral-700">{experience.summary}</p>
          {experience.images && (
            <div className="grid grid-cols-2 gap-2">
              {experience.images.map((image, i) => {
                const diagram = image.src.endsWith('.svg');
                return (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={cn(
                      'w-full rounded',
                      diagram
                        ? 'col-span-2 h-auto border border-neutral-200 bg-white'
                        : cn('aspect-video object-cover', i === 0 && 'col-span-2'),
                    )}
                  />
                );
              })}
            </div>
          )}
          <ul className="flex flex-col gap-2">
            {experience.bullets.map(bullet =>
              bullet.startsWith('§') ? (
                <li key={bullet} className="mt-2.5 text-xs font-medium text-neutral-500 first:mt-0">
                  {bullet.slice(1)}
                </li>
              ) : (
                <li
                  key={bullet}
                  className="relative pl-4 text-sm leading-relaxed text-neutral-700 before:absolute before:left-0 before:text-neutral-300 before:content-['–'] [&_strong]:font-medium [&_strong]:text-neutral-900"
                  dangerouslySetInnerHTML={{ __html: bullet }}
                />
              ),
            )}
          </ul>
          {writings.length > 0 && <WritingCards writings={writings} onOpen={setSlug} />}
        </>
      )}
    </article>
  );
}
