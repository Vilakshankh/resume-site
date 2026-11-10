import { useEffect, useRef, useState, type RefObject } from 'react';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Accordion } from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { WRITING, type Writing } from '../writing';
import { COLUMN_DIVIDER_CLASS, Column, MobileSection } from './SkillTree';
import { WritingView } from './Writing';

const ARTICLES = [...WRITING].sort((a, b) => b.date.localeCompare(a.date));

function ArticleNav({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <ToggleGroup
      orientation="vertical"
      value={[selected]}
      onValueChange={value => value[0] && onSelect(value[0])}
      className="w-fit gap-0"
    >
      {ARTICLES.map(article => (
        <ToggleGroupItem
          key={article.slug}
          value={article.slug}
          className="group h-auto w-full items-start justify-start gap-2 rounded-none py-2 pr-0 pl-2.5 text-left font-normal whitespace-normal hover:bg-transparent aria-pressed:bg-neutral-50"
        >
          <Eye
            aria-hidden
            className="mt-0.5 size-3.5 shrink-0 text-neutral-950 opacity-0 transition-opacity group-aria-pressed:opacity-100"
          />
          <span className="text-sm text-neutral-500 transition-colors group-hover:text-neutral-900 group-aria-pressed:font-medium group-aria-pressed:text-neutral-950">
            {article.title}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function ArticleBreadcrumb({ article }: { article: Writing }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>Articles</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{article.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ArticleCopy({
  article,
  topRef,
}: {
  article: Writing;
  topRef: RefObject<HTMLElement | null>;
}) {
  return (
    <article ref={topRef} className="flex flex-col gap-4">
      <ArticleBreadcrumb article={article} />
      <WritingView writing={article} />
    </article>
  );
}

export function Articles({ className }: { className?: string }) {
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const [selectedSlug, setSelectedSlug] = useState(ARTICLES[0]?.slug ?? '');
  const [openSection, setOpenSection] = useState<string | null>('article');
  const selected = ARTICLES.find(article => article.slug === selectedSlug) ?? ARTICLES[0];
  const topRef = useRef<HTMLElement>(null);
  const skipScroll = useRef(true);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [selectedSlug]);

  if (!selected) {
    return <p className={cn('text-sm text-neutral-500', className)}>No articles yet.</p>;
  }

  function selectArticle(slug: string) {
    setSelectedSlug(slug);
    setOpenSection(null);
  }

  if (!isDesktop) {
    return (
      <div className={cn('overflow-y-auto px-3 pb-nav', className)}>
        <Accordion
          value={openSection ? [openSection] : []}
          onValueChange={value => setOpenSection(value[0] ?? null)}
        >
          <MobileSection value="article" label="Article" summary={selected.title}>
            <ArticleNav selected={selected.slug} onSelect={selectArticle} />
          </MobileSection>
        </Accordion>
        <div className="pt-8">
          <ArticleCopy article={selected} topRef={topRef} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[15rem_auto_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] gap-x-8',
        className,
      )}
    >
      <Column label="Article">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center pr-3 pb-nav">
          <ArticleNav selected={selected.slug} onSelect={selectArticle} />
        </div>
      </Column>

      <Separator orientation="vertical" className={COLUMN_DIVIDER_CLASS} />

      <ScrollArea className="h-full min-h-0">
        <div className="flex min-h-full items-center justify-center px-3 pb-nav">
          <div className="w-full max-w-3xl">
            <ArticleCopy article={selected} topRef={topRef} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
