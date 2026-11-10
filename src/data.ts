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
  { name: 'Community Design',      ids: ['s555', 'butterfly'] },
  { name: 'Event Design',          ids: ['s555', 'butterfly'] },
  { name: 'Spatial Design',        ids: ['s555', 'butterfly'] },
  { name: 'Product Design',        ids: ['draftaid', 'trails', 'matrox', 'tecnishe', 'butterfly', 'mentic'] },
  { name: 'UI/UX',                 ids: ['draftaid', 'trails', 'matrox', 'tecnishe', 'butterfly', 'mentic'] },
  { name: 'Branding',              ids: ['s555', 'draftaid', 'nucliq'] },
  { name: 'Front End Vibe Coding', ids: ['s555', 'trails', 'tecnishe'] },
  { name: 'QA & Testing',          ids: ['matrox'] },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'draftaid',
    company: 'Draftaid',
    title: 'Founding Designer',
    meta: ['2024–Present', 'AI Engineering Startup'],
    summary: 'Founding designer at an AI-powered engineering drawing automation platform — owning product UI/UX, brand application, and go-to-market design end to end.',
    domainChips: ['Founding Designer', 'Brand', 'Go-to-Market'],
    skillChips: ['UI/UX', 'Figma', 'Design Systems', 'Brand Identity', 'GTM Design'],
    keywords: 'draftaid ai engineering drawing automation product design ui ux brand go-to-market figma design systems identity gtm',
    bullets: [
      `<strong>Inherited an established brand identity and led its application across all company assets</strong> — graphic design, product design, and a full suite of tradeshow collateral including business cards, flyers, banners, and booth design.`,
      `<strong>Designed a product icon system</strong> grounded in the existing brand language, translating visual identity into functional UI-level assets.`,
      `<strong>Revising and rebuilding the marketing website in Webflow</strong>, applying brand standards to improve visual consistency and conversion-readiness.`,
      `<strong>Maintaining and evolving the brand guidelines</strong> in real time as new use cases and contexts emerge across the product and marketing surface.`,
    ],
    images: [
      { src: '/experience/draftaid/hero.png', alt: 'Draftaid brand slide: Automate CAD Drawings With AI' },
      { src: '/experience/draftaid/product.png', alt: 'Draftaid slide showing an engineering drawing beside product messaging' },
      { src: '/experience/draftaid/logo.jpg', alt: 'Draftaid isometric logo mark on a green construction grid' },
    ],
  },
  {
    id: 's555',
    company: '555 Studio',
    title: 'Founder & Design Engineer',
    meta: ['Montréal, QC', '2024–Present'],
    summary: 'Founded a community platform running 20+ events with 1,000+ in-person participants — applying spatial design and social engineering to create documented human outcomes.',
    domainChips: ['Founder', 'Community Design', 'Brand & Identity'],
    skillChips: ['Figma', 'Luma', 'React / Next.js', 'Content Strategy', 'Visual Systems'],
    keywords: 'community design event spatial branding figma luma react next.js content visual systems founder 555 studio social engineering',
    bullets: [
      `<strong>Applied spatial design and social engineering principles</strong> across 20+ events with <strong>1,000+ in-person participants</strong>, resulting in documented outcomes: friendships formed, mentorships initiated, romantic relationships, and career opportunities created.`,
      `<strong>Ran a structured design experiment</strong> testing 9 variables (venue, audience size, filters, Q&A format, pairing mechanics, artifacts, presentation format, and partnerships) to optimize for connection quality and reduce shallow networking.`,
      `<strong>Designed and shipped end-to-end event registration and RSVP flows in Luma</strong>, reducing host-side coordination overhead, building an outreach pipeline, and using attendance data to drive programming decisions.`,
      `<strong>Developed the full visual identity system</strong> for 555 Studio — logo, typography, color language, print collateral, and digital presence — maintaining brand consistency across physical events and web touchpoints.`,
      `<strong>Grew 555 Studio's social presence to 1,000+ combined followers</strong> through content that reflected the community's voice and aesthetic, reinforcing brand identity between events.`,
      `<strong>Built and maintain event landing pages and registration flows in React/Next.js</strong> for a community platform collaborating with Shopify and other startups.`,
    ],
  },
  {
    id: 'trails',
    company: 'Trails',
    title: 'Design Engineer',
    meta: ['Montréal, QC', '2025–Present', 'Legal-Tech AI Startup'],
    summary: 'Design engineer at a legal-tech AI startup — built a React/TypeScript component library deployed across 10+ U.S. law firms, driving $500K+ projected revenue.',
    domainChips: ['Legal-Tech AI', 'Design Engineering', 'Early Stage'],
    skillChips: ['React / TypeScript', 'shadcn', 'Component Library', 'Next.js', 'AI-Native Workflow', 'UX Research'],
    keywords: 'react typescript shadcn component library next.js ai cursor v0 user research legal law firm design engineering trails startup',
    bullets: [
      `<strong>Built a React/TypeScript component library from scratch</strong> (using shadcn as a foundation), iterating and extending it as product needs grew — deployed across 10+ U.S. law firms with per-firm customization, driving <strong>$500K+ projected revenue.</strong>`,
      `<strong>Owned front-end craft end-to-end</strong> — implemented keyboard navigation, focus states, responsive layouts, and micro-animations in production Next.js, ensuring interfaces were accessible and polished beyond prototypes.`,
      `<strong>Shipped AI-native</strong> using Cursor, v0.dev, and Claude as primary build tools, shortening sprint cycles and compressing the Figma-to-production pipeline by <strong>3×.</strong>`,
      `<strong>Completed 200+ user interviews;</strong> used ChatGPT + NotebookLM to reduce research analysis time by <strong>70%</strong>, feeding insights directly into component iteration.`,
    ],
  },
  {
    id: 'matrox',
    company: 'Matrox',
    title: 'SQA Intern → Associate PM',
    meta: ['Montréal, QC', '2023–2024'],
    summary: 'Grew from SQA intern to Associate PM at an enterprise hardware company — shipped C++ drivers, closed a $1M contract, cut manual testing time by 50%, and reduced post-release bugs by 25%.',
    domainChips: ['Enterprise', 'Hardware', 'B2B'],
    skillChips: ['C++', 'C#', 'Product Management', 'Test Automation', 'Jira', 'Technical Writing'],
    keywords: 'c++ c# gpu hardware networking enterprise product management technical writing api b2b contract media matrox drivers qa testing jira testrail automation',
    bullets: [
      `§Software Quality Assurance Intern · May–Dec 2023`,
      `<strong>Deployed 5 major builds</strong> through testing initiatives on Jira and TestRail and development in C++, enabling customers to stay competitive with the latest media features and capturing <strong>5–10% market share.</strong>`,
      `<strong>Cut manual testing time by 50%</strong> by developing test automation strategies in C# in collaboration with engineering, streamlining the release process end to end.`,
      `<strong>Reduced post-release bugs by 25%</strong> by developing and maintaining test plans, test cases, and bug reports, significantly enhancing product quality and customer satisfaction.`,
      `§Associate Product Manager · 2024`,
      `<strong>Shipped production C++ drivers</strong> for 5 GPU and networking features, defining component APIs and interface contracts that bridged design intent and engineering implementation across hardware and software teams.`,
      `<strong>Closed a $1M contract</strong> by designing and demoing working features to major media companies, driving adoption across <strong>3 business units.</strong>`,
      `<strong>Reduced support queries by 95%</strong> by authoring 10 technical product guides covering GPU architecture and networking protocols, collaborating directly with engineering to resolve recurring customer issues.`,
    ],
  },
  {
    id: 'tecnishe',
    company: 'Tecnishe',
    title: 'Product Designer',
    meta: ['Montréal, QC', '2021–2023', 'Med-Tech AI Startup'],
    summary: 'Built a patient-facing LLM chatbot at a med-tech startup — integrated GPT-4 to route low-acuity patients to telehealth and cut ER wait times by 5 hours.',
    domainChips: ['Med-Tech AI', 'Full-Stack', 'Early Stage'],
    skillChips: ['React / Next.js', 'Flutter', 'GPT-4', 'LLM Integration', 'UX Architecture', 'User Research'],
    keywords: 'react next.js flutter gpt-4 llm chatbot healthcare medical triage telehealth ux architecture user research full-stack tecnishe',
    bullets: [
      `<strong>Built and shipped a patient-facing LLM chatbot</strong> — owned the full React/Next.js front-end myself, integrating with a GPT-4 backend fed with medical data to route low-acuity patients to telehealth, cutting ER wait times by <strong>5 hours.</strong>`,
      `<strong>Engineered this before mature AI tooling existed</strong> — built the interface and LLM-powered triage logic from scratch, demonstrating the same AI-first product thinking now standard at leading teams.`,
      `<strong>Led UX architecture</strong> for the triage system — mapped decision flows, user journeys, and state logic across React/Next.js web and Flutter mobile to support accurate patient routing.`,
      `<strong>Completed 200+ interviews</strong> with patients, clinicians, and administrators, forming partnerships with two telehealth companies, a public hospital, and a government innovation hub.`,
    ],
  },
  {
    id: 'butterfly',
    company: 'The Butterfly Project',
    title: 'Product Designer',
    meta: ['Montréal, QC', 'May 2023–Mar 2025'],
    summary: 'Designed a curated social connection platform to replace swipe-based apps — ran 20+ events with 150+ users, owning product, community development, and event organizing end to end.',
    domainChips: ['Social App', 'Community', 'Early Stage'],
    skillChips: ['Product Design', 'Prototyping', 'User Research', 'Community Building', 'Event Organizing'],
    keywords: 'butterfly social connection app community events product design prototyping user research roadmap interviews',
    bullets: [
      `<strong>Identified core failures of swiping-based apps</strong> — over-indexing on social validation, lack of depth, and uncurated social settings — and designed a product experience to address them directly.`,
      `<strong>Ran 20+ events with 150+ users</strong>, combining product thinking with in-person community building to validate connection mechanics and reduce social barriers like rejection anxiety and emotional over-investment.`,
      `<strong>Owned the full product lifecycle</strong> — roadmapping, prototyping, user interviews, community development, event organizing, and software development.`,
    ],
  },
  {
    id: 'nucliq',
    company: 'Nucliq Biologics',
    title: 'Product Marketer Intern',
    meta: ['Newfoundland, CA', 'May–Sep 2022'],
    summary: 'Product marketing intern at a biotech startup — boosted customer engagement by 30%, acquired the first 100 customers, and increased conversion rates by 20%.',
    domainChips: ['Biotech', 'B2B', 'Internship'],
    skillChips: ['Digital Marketing', 'Sales', 'Lead Generation', 'Product Demo', 'Acquisition Funnel'],
    keywords: 'nucliq biologics biotech marketing sales leads customers demos conversion funnel referral networking',
    bullets: [
      `<strong>Boosted customer engagement by 30%</strong> through targeted digital marketing campaigns and outbound sales strategies that increased user interaction and brand visibility.`,
      `<strong>Acquired the first 100 customers</strong> by generating leads through funnel optimization, upselling, industry event networking, and customer referral strategies.`,
      `<strong>Increased conversion rates by 20%</strong> by delivering compelling product demos to key stakeholders, effectively articulating the product's value proposition throughout the marketing funnel.`,
    ],
  },
  {
    id: 'mentic',
    company: 'Mentic',
    title: 'Product Developer Intern',
    meta: ['Newfoundland, CA', 'May–Sep 2021'],
    summary: 'Product developer intern — led a video game launch in 4 months, boosted profits by 20% post-launch, and surged player engagement by 70% through A/B testing and 50+ qualitative interviews.',
    domainChips: ['Gaming', 'Early Stage', 'Internship'],
    skillChips: ['Product Roadmap', 'A/B Testing', 'User Research', 'Project Management', 'Sales'],
    keywords: 'mentic video game launch product roadmap ab testing user research project management sales cold calling therapists engineers',
    bullets: [
      `<strong>Led the launch of a video game in 4 months</strong> — developed the product roadmap and technical strategies following project management practices and adhering to firm deadlines.`,
      `<strong>Boosted company profits by 20% post-launch</strong> through inbound and outbound sales strategies, marketing initiatives, and cold calling prospective clients.`,
      `<strong>Surged player engagement by 70%</strong> by implementing A/B testing methodologies to develop product features, achieving a substantial rise in user interaction.`,
      `<strong>Conducted 50+ qualitative interviews</strong> with therapists and engineers to surface user needs and feed insights directly into product development.`,
    ],
  },
];
