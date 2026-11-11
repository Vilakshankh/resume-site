import { useEffect, useRef, useState, type RefObject } from 'react';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseHash, useHash } from '@/hooks/use-hash';
import { useMediaQuery } from '@/hooks/use-media-query';
import { PanelDrawer } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { WRITING, type Writing } from '../writing';
import { COLUMN_DIVIDER_CLASS, Column } from './SkillTree';
import { WritingView } from './Writing';

const ARTICLES = [...WRITING].sort((a, b) => b.date.localeCompare(a.date));

function articleFromHash(hash: string) {
  const { section, item } = parseHash(hash);
  if (section !== 'articles' || !item) return undefined;
  return ARTICLES.some(article => article.slug === item) ? item : undefined;
}

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
      className="w-full gap-0"
    >
      {ARTICLES.map(article => (
        <ToggleGroupItem
          key={article.slug}
          value={article.slug}
          className="group h-auto w-full items-start justify-start gap-2 rounded-none py-2 pr-0 pl-2.5 text-left font-normal whitespace-normal opacity-40 transition-opacity hover:bg-transparent hover:opacity-100 aria-pressed:bg-neutral-50 aria-pressed:opacity-100"
        >
          <Eye
            aria-hidden
            className="mt-0.5 size-3.5 shrink-0 text-neutral-950 opacity-0 transition-opacity group-aria-pressed:opacity-100"
          />
          <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 group-aria-pressed:text-neutral-950">
            {article.title}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
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
      <WritingView writing={article} />
    </article>
  );
}

export function Articles({ className }: { className?: string }) {
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const hash = useHash();
  const [selectedSlug, setSelectedSlug] = useState(
    () => articleFromHash(window.location.hash) ?? ARTICLES[0]?.slug ?? '',
  );
  const [articlesOpen, setArticlesOpen] = useState(false);
  const selected = ARTICLES.find(article => article.slug === selectedSlug) ?? ARTICLES[0];
  const topRef = useRef<HTMLElement>(null);
  const skipScroll = useRef(true);

  useEffect(() => {
    const slug = articleFromHash(hash);
    if (slug) {
      setSelectedSlug(slug);
      setArticlesOpen(false);
    }
  }, [hash]);

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
    setArticlesOpen(false);
  }

  if (!isDesktop) {
    return (
      <div className={cn('min-w-0 overflow-x-hidden overflow-y-auto px-1 pb-nav sm:px-3', className)}>
        <PanelDrawer
          open={articlesOpen}
          onOpenChange={setArticlesOpen}
          title="Articles"
          summary={selected.title}
        >
          <ArticleNav selected={selected.slug} onSelect={selectArticle} />
        </PanelDrawer>
        <div className="pt-6">
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
      <Column label="Articles">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center pr-3 pb-nav">
          <ArticleNav selected={selected.slug} onSelect={selectArticle} />
        </div>
      </Column>

      <Separator orientation="vertical" className={COLUMN_DIVIDER_CLASS} />

      <ScrollArea className="h-full min-h-0">
        <div className="px-3 pt-4 pb-nav">
          <div className="w-full max-w-3xl">
            <ArticleCopy article={selected} topRef={topRef} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
