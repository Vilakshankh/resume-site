import { cn } from '@/lib/utils';
import type { Experience } from '../data';
import { Chips, experienceTime } from './ExperienceCard';

export function ExperienceDetail({ experience }: { experience: Experience }) {
  return (
    <article className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium text-neutral-950">{experience.company}</h3>
          <span className="text-right text-sm text-neutral-500">{experience.title}</span>
        </div>
        <span className="text-xs text-neutral-400">{experienceTime(experience)}</span>
      </header>
      <Chips experience={experience} />
      <p className="text-sm leading-relaxed text-neutral-700">{experience.summary}</p>
      {experience.images && (
        <div className="grid grid-cols-2 gap-2">
          {experience.images.map((image, i) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className={cn('aspect-video w-full rounded object-cover', i === 0 && 'col-span-2')}
            />
          ))}
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
    </article>
  );
}
