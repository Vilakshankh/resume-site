type ArenaImageVersion = { src?: string };

export type ArenaBlock = {
  id: number;
  type: 'Image' | 'Link' | 'Text' | 'Attachment' | 'Embed' | string;
  title?: string | null;
  image?: ArenaImageVersion & {
    large?: ArenaImageVersion;
    medium?: ArenaImageVersion;
    small?: ArenaImageVersion;
  } | null;
  source?: { url?: string } | null;
  content?: { markdown?: string; plaintext?: string } | null;
  attachment?: { file_name?: string } | null;
};

export type ArenaResponse = {
  data: ArenaBlock[];
  meta: { total_count: number };
};

let arenaPromise: Promise<ArenaResponse> | null = null;

export function fetchArena(): Promise<ArenaResponse> {
  if (!arenaPromise) {
    arenaPromise = fetch('/api/arena?per=100').then(res =>
      res.ok ? res.json() : Promise.reject(new Error(`${res.status}`))
    );
  }
  return arenaPromise;
}

let imagesPromise: Promise<string[]> | null = null;

/** Shuffled image URLs shared by the loader and the portfolio hover overlay. */
export function fetchArenaImages(): Promise<string[]> {
  if (!imagesPromise) {
    imagesPromise = fetchArena()
      .then(({ data }) =>
        data
          .filter(block => block.type === 'Image' && block.image)
          .map(block => block.image!.large?.src || block.image!.medium?.src || block.image!.src)
          .filter((src): src is string => Boolean(src))
          .sort(() => Math.random() - 0.5)
      )
      .catch(() => []);
  }
  return imagesPromise;
}
