import { Newspaper } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Writing } from '../writing';

export function formatWritingDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function WritingCards({ writings, onOpen }: { writings: Writing[]; onOpen: (slug: string) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-lg font-medium text-neutral-950">Articles</h4>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {writings.map(writing => {
          const thumbnail = writing.cover?.poster ?? writing.cover?.src;

          return (
            <Card
              key={writing.slug}
              size="sm"
              role="button"
              tabIndex={0}
              onClick={() => onOpen(writing.slug)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpen(writing.slug);
                }
              }}
              className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {thumbnail && writing.cover && (
                <img
                  src={thumbnail}
                  alt={writing.cover.alt}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{writing.title}</CardTitle>
                <CardDescription>{formatWritingDate(writing.date)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{writing.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function WritingView({ writing }: { writing: Writing }) {
  return (
    <div>
      <h3 className="mb-3 text-left text-xl font-semibold text-neutral-950 md:text-2xl">{writing.title}</h3>
      <p className="mb-3 text-sm text-neutral-800">{writing.description}</p>
      <div className="mb-8 flex items-center gap-3">
        <span className="inline-flex w-fit items-center gap-1.5 bg-neutral-950 px-2 py-0.5 font-mono text-[11px] text-white">
          <Newspaper aria-hidden className="size-3" />
          article
        </span>
        <p className="text-sm text-neutral-500">by Vilakshan Khanna · {formatWritingDate(writing.date)}</p>
      </div>
      {writing.body}
    </div>
  );
}
