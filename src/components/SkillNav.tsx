import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EXPERIENCES, SKILLS, type Experience } from '../data';

type SkillNavProps = {
  activeSkill: string | null;
  selected: Experience | undefined;
  onSelect: (skill: string | null) => void;
};

export function SkillNav({ activeSkill, selected, onSelect }: SkillNavProps) {
  return (
    <ToggleGroup
      orientation="vertical"
      value={activeSkill ? [activeSkill] : []}
      onValueChange={value => onSelect(value[0] ?? null)}
      className="w-fit gap-0"
    >
      {SKILLS.map(skill => {
        const active = activeSkill === skill.name;
        const related = !!selected && skill.ids.includes(selected.id);
        return (
          <Tooltip key={skill.name} disabled={!related}>
            <TooltipTrigger
              render={
                <ToggleGroupItem
                  value={skill.name}
                  className={cn(
                    'group h-auto w-full justify-between gap-3 rounded-none border-l-2 border-l-transparent py-2 pr-0 pl-2.5 text-left font-normal whitespace-normal hover:bg-transparent aria-pressed:bg-neutral-50',
                    related && 'border-l-neutral-300',
                    active && 'border-l-neutral-950',
                    selected && !related && 'opacity-40 hover:opacity-100 focus-visible:opacity-100',
                  )}
                />
              }
            >
              <span
                className={cn(
                  'text-sm text-neutral-500 transition-colors group-hover:text-neutral-900',
                  related && 'text-neutral-800',
                  active && 'font-medium text-neutral-950',
                )}
              >
                {skill.name}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    'size-1.5 rounded-full bg-neutral-900 transition-opacity',
                    related ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'text-xs whitespace-nowrap text-neutral-500 tabular-nums transition-colors',
                    active && 'text-neutral-600',
                  )}
                >
                  {skill.ids.length}/{EXPERIENCES.length}
                </span>
              </span>
            </TooltipTrigger>
            {selected && <TooltipContent side="right">Includes {selected.company}</TooltipContent>}
          </Tooltip>
        );
      })}
    </ToggleGroup>
  );
}
