import { useEffect, useState } from 'react';
import { fetchArena, type ArenaBlock, type ArenaResponse } from '../arena';
import { PORTFOLIO_URL } from './Header';

type PortfolioState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; response: ArenaResponse };

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

function ArenaBlockView({ block }: { block: ArenaBlock }) {
  switch (block.type) {
    case 'Image': {
      if (!block.image) return null;
      const { image } = block;
      return (
        <div className="arena-block is-image">
          <img
            src={image.large?.src || image.medium?.src || image.small?.src || image.src}
            alt={block.title || ''}
            loading="lazy"
          />
        </div>
      );
    }

    case 'Link': {
      const url = block.source?.url;
      const host = url ? hostname(url) : '';
      return (
        <div
          className="arena-block is-link"
          style={url ? { cursor: 'pointer' } : undefined}
          onClick={url ? () => window.open(url, '_blank') : undefined}
        >
          <div>
            <div className="arena-block-type">Link</div>
            <div className="arena-block-title">{block.title || host}</div>
          </div>
          <div className="arena-block-meta">{host}</div>
        </div>
      );
    }

    case 'Text':
      return (
        <div className="arena-block is-text">
          <div>
            <div className="arena-block-type">Text</div>
            {block.title && <div className="arena-block-title">{block.title}</div>}
          </div>
          <div className="arena-block-content">
            {block.content?.markdown || block.content?.plaintext || ''}
          </div>
        </div>
      );

    case 'Attachment':
      return (
        <div className="arena-block is-attachment">
          <div>
            <div className="arena-block-type">Attachment</div>
            <div className="arena-block-title">{block.title || 'File'}</div>
          </div>
          <div className="arena-block-meta">{block.attachment?.file_name || ''}</div>
        </div>
      );

    case 'Embed':
      return (
        <div className="arena-block is-embed">
          <div>
            <div className="arena-block-type">Embed</div>
            <div className="arena-block-title">{block.title || 'Embed'}</div>
          </div>
          <div className="arena-block-meta">{block.source?.url || ''}</div>
        </div>
      );

    default:
      return <div className="arena-block" />;
  }
}

export function Portfolio() {
  const [state, setState] = useState<PortfolioState>({ status: 'loading' });

  useEffect(() => {
    fetchArena()
      .then(response => setState({ status: 'ready', response }))
      .catch(err => {
        console.error('Are.na fetch failed:', err);
        setState({ status: 'error' });
      });
  }, []);

  return (
    <section className="portfolio-section">
      <div className="portfolio-header">
        <span className="panel-label">Portfolio</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="portfolio-count">
            {state.status === 'ready' ? `${state.response.meta.total_count} blocks` : ''}
          </span>
          <a className="portfolio-link" href={PORTFOLIO_URL} target="_blank">Are.na</a>
        </div>
      </div>
      <div className="portfolio-grid">
        {state.status === 'loading' && <p className="portfolio-loading">Loading...</p>}
        {state.status === 'error' && <p className="portfolio-loading">Could not load portfolio.</p>}
        {state.status === 'ready' &&
          state.response.data.map(block => <ArenaBlockView key={block.id} block={block} />)}
      </div>
    </section>
  );
}
