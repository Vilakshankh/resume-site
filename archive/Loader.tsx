import { useEffect, useRef, useState } from 'react';
import { fetchArenaImages } from '../arena';

const PANEL_COUNT = 3;
const MIN_MS = 3000;
const TARGET_SWAPS = 10;

export function Loader() {
  const panelRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [phase, setPhase] = useState<'showing' | 'fading' | 'gone'>('showing');

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const minTimer = new Promise<void>(resolve => later(resolve, MIN_MS));

    function dismiss() {
      minTimer.then(() => {
        if (cancelled) return;
        setPhase('fading');
        later(() => setPhase('gone'), 950);
      });
    }

    function swap(img: HTMLImageElement, src: string) {
      return new Promise<void>(resolve => {
        img.classList.remove('visible');
        later(() => {
          const done = () => {
            img.classList.add('visible');
            resolve();
          };
          img.onload = done;
          img.onerror = done;
          img.src = src;
        }, 350);
      });
    }

    (async () => {
      const imageUrls = await fetchArenaImages();
      const panels = panelRefs.current.filter((img): img is HTMLImageElement => img !== null);
      if (cancelled) return;
      if (imageUrls.length < PANEL_COUNT) {
        dismiss();
        return;
      }

      let cursor = 0;
      const next = () => imageUrls[cursor++ % imageUrls.length];

      await Promise.all(panels.map(img => swap(img, next())));

      let swaps = 0;
      let finished = false;

      function schedulePanel(index: number) {
        if (finished || cancelled) return;
        later(async () => {
          if (finished || cancelled) return;
          await swap(panels[index], next());
          swaps++;
          if (swaps >= TARGET_SWAPS) {
            finished = true;
            later(dismiss, 400);
          } else {
            schedulePanel(index);
          }
        }, 700 + Math.random() * 1700);
      }

      panels.forEach((_, i) => later(() => schedulePanel(i), i * 200));
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div id="loader" className={phase === 'fading' ? 'fade-out' : undefined}>
      <div className="loader-panels">
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <div className="loader-panel" key={i}>
            <img className="panel-img" alt="" ref={el => { panelRefs.current[i] = el; }} />
          </div>
        ))}
      </div>
    </div>
  );
}
