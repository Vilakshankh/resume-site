import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Experience } from '../data';
import { ExperienceCard } from './ExperienceCard';

type ExperiencePanelProps = {
  experiences: Experience[];
  selectedId: string | undefined;
  highlightAll?: boolean;
  onSelect: (id: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export function ExperiencePanel({
  experiences,
  selectedId,
  highlightAll = false,
  onSelect,
  query,
  onQueryChange,
}: ExperiencePanelProps) {
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    if (selectedId) cardRefs.current.get(selectedId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedId]);

  return (
    <>
      <InputGroup className="mb-5 h-9.5 shrink-0 rounded-none border-neutral-200 bg-neutral-50 has-[[data-slot=input-group-control]:focus-visible]:border-neutral-400 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupAddon className="pl-3 text-neutral-400">
          <Search aria-hidden className="size-3.5" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          aria-label="Search experience"
          placeholder="search keywords"
          autoComplete="off"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          className="h-full pr-3 text-sm text-neutral-800 placeholder:text-neutral-400"
        />
      </InputGroup>

      <ScrollArea className="-m-2 min-h-0 flex-1">
        <div className="flex flex-col gap-2.5 p-2 pb-nav">
          {experiences.length === 0 ? (
            <p className="py-6 text-sm text-neutral-400">No matching experiences.</p>
          ) : (
            experiences.map(exp => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                selected={exp.id === selectedId}
                highlighted={highlightAll || exp.id === selectedId}
                onSelect={() => onSelect(exp.id)}
                ref={node => {
                  if (node) cardRefs.current.set(exp.id, node);
                  else cardRefs.current.delete(exp.id);
                }}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
}
