import type { Ref } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import type { Experience } from '../data';

export function experienceTime(experience: Experience) {
  return experience.meta.slice(1).join(' · ');
}

export function Chips({ experience }: { experience: Experience }) {
  return (
    <div className="flex flex-wrap gap-1">
      {[...experience.domainChips, ...experience.skillChips].map((chip, i) => (
        <Badge
          key={`${i}-${chip}`}
          variant="secondary"
          className="h-auto rounded border-neutral-200 bg-neutral-100 px-1.5 font-normal text-neutral-500"
        >
          {chip}
        </Badge>
      ))}
    </div>
  );
}

type ExperienceCardProps = {
  experience: Experience;
  selected: boolean;
  highlighted?: boolean;
  onSelect: () => void;
  ref?: Ref<HTMLButtonElement>;
};

export function ExperienceCard({ experience, selected, highlighted = selected, onSelect, ref }: ExperienceCardProps) {
  return (
    <Card
      className={cn(
        'shrink-0 gap-0 rounded-none bg-transparent py-0 ring-0 transition-[box-shadow,opacity] hover:shadow-card',
        highlighted && 'shadow-card',
        !highlighted && 'opacity-40 hover:opacity-100 focus-within:opacity-100',
      )}
    >
      <button
        type="button"
        ref={ref}
        aria-pressed={selected}
        onClick={onSelect}
        className="flex w-full flex-col gap-2 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <div className="flex w-full items-baseline justify-between gap-3">
          <CardTitle className="whitespace-nowrap text-neutral-950">{experience.company}</CardTitle>
          <CardDescription className="text-right text-neutral-500">{experience.title}</CardDescription>
        </div>
        <span className="text-xs text-neutral-400">{experienceTime(experience)}</span>
        <Chips experience={experience} />
        <p className="text-sm leading-relaxed text-neutral-700">{experience.summary}</p>
      </button>
    </Card>
  );
}
