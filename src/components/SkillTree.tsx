import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseHash, useHash } from '@/hooks/use-hash';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EXPERIENCES, SKILLS } from '../data';
import { ExperienceDetail } from './ExperienceDetail';
import { ExperiencePanel } from './ExperiencePanel';
import { SkillNav } from './SkillNav';

type Section = 'skill' | 'experience';

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

type ColumnProps = {
  label: string;
  badge?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
};

export function Column({ label, badge, actions, children }: ColumnProps) {
  return (
    <section className="flex min-h-0 flex-col">
      <div className="mb-5 flex h-7 shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="shrink-0 text-base font-semibold text-neutral-950">{label}</h2>
          {badge}
        </div>
        {actions}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </section>
  );
}

type MobileSectionProps = {
  value: string;
  label: string;
  summary?: string;
  children: ReactNode;
};

export function MobileSection({ value, label, summary, children }: MobileSectionProps) {
  return (
    <AccordionItem value={value} className="border-none">
      <AccordionTrigger className="w-full min-w-0 items-center gap-3 rounded-none py-3 hover:no-underline">
        <span className="shrink-0 text-base font-semibold text-neutral-950">{label}</span>
        <span className="min-w-0 flex-1 truncate text-right text-sm font-normal text-neutral-500">{summary}</span>
      </AccordionTrigger>
      <AccordionContent className="h-auto pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}

// Bleeds through Home's <main> padding so column rules meet the viewport edges.
export const COLUMN_DIVIDER_CLASS = '-mt-6 -mb-6 bg-neutral-200';

const ARROW_CLASS =
  'rounded border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:bg-transparent hover:text-neutral-900';

function experienceFromHash(hash: string) {
  const { section, item } = parseHash(hash);
  if (section !== 'skill-tree' || !item) return undefined;
  return EXPERIENCES.some(exp => exp.id === item) ? item : undefined;
}

export function SkillTree({ className }: { className?: string }) {
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const hash = useHash();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | undefined>(() => experienceFromHash(window.location.hash));
  const [openSection, setOpenSection] = useState<Section | null>('skill');

  useEffect(() => {
    const id = experienceFromHash(hash);
    if (id) {
      setSelectedId(id);
      setOpenSection(null);
    }
  }, [hash]);

  const visible = useMemo(() => {
    const skillIds = activeSkill ? SKILLS.find(s => s.name === activeSkill)?.ids : null;
    const q = query.trim().toLowerCase();

    return EXPERIENCES.filter(exp => {
      const skillMatch = !skillIds || skillIds.includes(exp.id);
      const searchMatch =
        !q ||
        [
          exp.company, exp.title, exp.summary, exp.keywords,
          ...exp.domainChips, ...exp.skillChips,
          ...exp.bullets.map(stripTags),
        ].some(text => text.toLowerCase().includes(q));
      return skillMatch && searchMatch;
    });
  }, [activeSkill, query]);

  const selected = visible.find(exp => exp.id === selectedId) ?? visible[0];

  function selectSkill(skill: string | null) {
    setActiveSkill(skill);
    setOpenSection('experience');
  }

  function selectExperience(id: string) {
    setSelectedId(id);
    setOpenSection(null);
  }

  function step(delta: number) {
    if (!selected) return;
    const index = visible.indexOf(selected);
    setSelectedId(visible[(index + delta + visible.length) % visible.length].id);
  }

  const skillNav = <SkillNav activeSkill={activeSkill} onSelect={selectSkill} />;

  const experiencePanel = (
    <ExperiencePanel
      experiences={visible}
      selectedId={selected?.id}
      onSelect={selectExperience}
      query={query}
      onQueryChange={setQuery}
    />
  );

  const detail = selected && <ExperienceDetail key={selected.id} experience={selected} />;

  if (!isDesktop) {
    return (
      <div className={cn('overflow-y-auto px-3 pb-nav', className)}>
        <Accordion
          value={openSection ? [openSection] : []}
          onValueChange={value => setOpenSection((value[0] as Section | undefined) ?? null)}
        >
          <MobileSection value="skill" label="Skills" summary={activeSkill ?? 'All'}>
            {skillNav}
          </MobileSection>
          <MobileSection value="experience" label="Experience" summary={selected?.company}>
            {experiencePanel}
          </MobileSection>
        </Accordion>
        {detail && <div className="pt-8">{detail}</div>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[15rem_auto_minmax(0,0.8fr)_auto_minmax(0,1.3fr)] grid-rows-[minmax(0,1fr)] gap-x-8',
        className,
      )}
    >
      <Column label="Skills">
        <div className="flex min-h-0 flex-1 flex-col justify-center pr-3 pb-nav">
          {skillNav}
        </div>
      </Column>

      <Separator orientation="vertical" className={COLUMN_DIVIDER_CLASS} />

      <Column
        label="Experience"
        badge={
          activeSkill && (
            <Badge
              render={<button type="button" aria-label={`Clear ${activeSkill} filter`} onClick={() => setActiveSkill(null)} />}
              className="h-auto min-w-0 shrink rounded px-1.5 font-normal hover:bg-primary/80"
            >
              <span className="truncate">{activeSkill}</span>
              <X aria-hidden data-icon="inline-end" />
            </Badge>
          )
        }
        actions={
          <div className="flex gap-0.5">
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline" size="icon-sm" className={ARROW_CLASS} aria-label="Previous experience" onClick={() => step(-1)} />}
              >
                <ChevronUp aria-hidden className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent>Previous</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline" size="icon-sm" className={ARROW_CLASS} aria-label="Next experience" onClick={() => step(1)} />}
              >
                <ChevronDown aria-hidden className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent>Next</TooltipContent>
            </Tooltip>
          </div>
        }
      >
        {experiencePanel}
      </Column>

      <Separator orientation="vertical" className={COLUMN_DIVIDER_CLASS} />

      <ScrollArea className="min-h-0">
        <div className="pr-3 pb-nav">{detail}</div>
      </ScrollArea>
    </div>
  );
}
