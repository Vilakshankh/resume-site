import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EXPERIENCES, SKILLS } from '../data';

type SkillNavProps = {
  activeSkill: string | null;
  onSelect: (skill: string | null) => void;
};

export function SkillNav({ activeSkill, onSelect }: SkillNavProps) {
  return (
    <ToggleGroup
      orientation="vertical"
      value={activeSkill ? [activeSkill] : []}
      onValueChange={value => onSelect(value[0] ?? null)}
      className="w-full gap-0"
    >
      {SKILLS.map(skill => {
        const dimmed = !!activeSkill && activeSkill !== skill.name;
        return (
          <ToggleGroupItem
            key={skill.name}
            value={skill.name}
            className={cn(
              'group h-auto w-full items-start justify-between gap-3 rounded-none py-2 pr-0 pl-2.5 text-left font-normal whitespace-normal hover:bg-transparent aria-pressed:bg-neutral-50',
              dimmed && 'opacity-40 hover:opacity-100 focus-visible:opacity-100',
            )}
          >
            <span className="flex min-w-0 items-start gap-2">
              <Eye
                aria-hidden
                className="mt-0.5 size-3.5 shrink-0 text-neutral-950 opacity-0 transition-opacity group-aria-pressed:opacity-100"
              />
              <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 group-aria-pressed:text-neutral-950">
                {skill.name}
              </span>
            </span>
            <span className="shrink-0 text-xs whitespace-nowrap text-neutral-500 tabular-nums transition-colors group-aria-pressed:text-neutral-600">
              {skill.ids.length}/{EXPERIENCES.length}
            </span>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
