import { useEffect, useRef, useState } from 'react';
import { fetchArenaImages } from '../arena';

const PANEL_COUNT = 3;

type PortfolioOverlayProps = {
  active: boolean;
};

export function PortfolioOverlay({ active }: PortfolioOverlayProps) {
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const cursor = useRef(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchArenaImages().then(setImages);
  }, []);

  const visible = active && images.length > 0;

  useEffect(() => {
    if (!visible) return;

    let running = true;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const nextSrc = () => images[cursor.current++ % images.length];

    function swapImg(img: HTMLImageElement) {
      const src = nextSrc();
      img.style.opacity = '0';
      later(() => {
        const show = () => { img.style.opacity = '1'; };
        img.onload = show;
        img.onerror = show;
        img.src = src;
      }, 300);
    }

    const imgs = imgRefs.current.filter((img): img is HTMLImageElement => img !== null);
    imgs.forEach(swapImg);

    imgs.forEach((img, i) => {
      function loop() {
        if (!running) return;
        later(() => {
          if (!running) return;
          swapImg(img);
          loop();
        }, 800 + Math.random() * 1600);
      }
      later(loop, i * 250 + 300);
    });

    return () => {
      running = false;
      timers.forEach(clearTimeout);
    };
  }, [visible, images]);

  return (
    <div id="portfolio-overlay" className={visible ? 'active' : undefined}>
      <div className="loader-panels">
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <div className="loader-panel" key={i}>
            <img
              className="overlay-img"
              alt=""
              style={{ transition: 'opacity 0.4s ease' }}
              ref={el => { imgRefs.current[i] = el; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
