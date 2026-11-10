export const PORTFOLIO_URL = 'https://www.are.na/share/xsDlcIm';

type HeaderProps = {
  onPortfolioHover: (hovering: boolean) => void;
};

export function Header({ onPortfolioHover }: HeaderProps) {
  return (
    <>
      <p className="name">Vilakshan Khanna</p>
      <div className="tagline">
        <span>Toronto, ON</span>
        <span>Open to full-time &amp; freelance</span>
        <span>Design Engineer · Product Design · Branding</span>
      </div>
      <div className="edu-section">
        <p className="edu-degree">BSc. Computer Science &amp; Business Administration</p>
        <p className="edu-sub">
          Specializing in UI/UX Design &amp; Video Game Design · Memorial University of Newfoundland · 2024
        </p>
      </div>

      <nav className="header-nav">
        <a href="https://x.com/vilakshankhanna" target="_blank">Twitter</a>
        <a href="https://www.linkedin.com/in/vilakshan-khanna/" target="_blank">LinkedIn</a>
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          onMouseEnter={() => onPortfolioHover(true)}
          onMouseLeave={() => onPortfolioHover(false)}
        >
          Design Portfolio
        </a>
        <a href="/diagram.html">Node Diagram</a>
      </nav>
    </>
  );
}
