export type Skill = {
  name: string;
  ids: string[];
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  meta: string[];
  summary: string;
  domainChips: string[];
  skillChips: string[];
  keywords: string;
  /** HTML strings; a leading `§` marks a role label instead of a bullet. */
  bullets: string[];
  images?: { src: string; alt: string }[];
};

export const SKILLS: Skill[] = [
  { name: 'Product Design', ids: ['trails', 'draftaid', 'matrox', 'tecnishe', 'butterfly', 'mentic'] },
  { name: 'UI/UX', ids: ['draftaid', 'trails', 'matrox', 'tecnishe', 'butterfly', 'mentic'] },
  { name: 'Branding', ids: ['s555', 'draftaid', 'nucliq'] },
  { name: 'Front End Vibe Coding', ids: ['s555', 'trails', 'tecnishe'] },
  { name: 'Community Design', ids: ['s555', 'butterfly'] },
  { name: 'Event Design', ids: ['s555', 'butterfly'] },
  { name: 'Spatial Design', ids: ['s555', 'butterfly'] },
  { name: 'QA & Testing', ids: ['matrox'] },
];

const experienceFiles = import.meta.glob('./experience/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function unquote(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) return JSON.parse(trimmed) as string;
  return trimmed;
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('Experience markdown is missing frontmatter');

  const [, frontmatter, body] = match;
  const data: Record<string, unknown> = {};
  const lines = frontmatter.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const kv = line.match(/^([A-Za-z][\w]*)\s*:\s*(.*)$/);
    if (!kv) {
      i += 1;
      continue;
    }

    const [, key, rest] = kv;
    if (rest.trim()) {
      data[key] = key === 'order' ? Number(unquote(rest)) : unquote(rest);
      i += 1;
      continue;
    }

    if (key === 'images') {
      const images: { src: string; alt: string }[] = [];
      i += 1;
      while (i < lines.length && /^\s+-/.test(lines[i])) {
        const srcMatch = lines[i].match(/^\s+-\s+src:\s*(.+)$/);
        const altMatch = lines[i + 1]?.match(/^\s+alt:\s*(.+)$/);
        if (srcMatch && altMatch) {
          images.push({ src: unquote(srcMatch[1]), alt: unquote(altMatch[1]) });
          i += 2;
        } else {
          i += 1;
        }
      }
      data.images = images;
      continue;
    }

    const values: string[] = [];
    i += 1;
    while (i < lines.length && /^\s+-/.test(lines[i])) {
      values.push(unquote(lines[i].replace(/^\s+-\s*/, '')));
      i += 1;
    }
    data[key] = values;
  }

  return { data, body };
}

function parseBullets(body: string) {
  return body
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('- '))
    .map(line => {
      const text = line.slice(2);
      if (text.startsWith('§')) return text;
      return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    });
}

function parseExperience(path: string, raw: string): Experience & { order: number } {
  const id = path.split('/').pop()!.replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(raw);

  return {
    id,
    order: typeof data.order === 'number' ? data.order : 0,
    company: String(data.company ?? id),
    title: String(data.title ?? ''),
    meta: Array.isArray(data.meta) ? data.meta.map(String) : [],
    summary: String(data.summary ?? ''),
    domainChips: Array.isArray(data.domainChips) ? data.domainChips.map(String) : [],
    skillChips: Array.isArray(data.skillChips) ? data.skillChips.map(String) : [],
    keywords: String(data.keywords ?? ''),
    bullets: parseBullets(body),
    images: Array.isArray(data.images) ? (data.images as Experience['images']) : undefined,
  };
}

export const EXPERIENCES: Experience[] = Object.entries(experienceFiles)
  .map(([path, raw]) => parseExperience(path, raw))
  .sort((a, b) => a.order - b.order)
  .map(({ order: _order, ...experience }) => experience);
