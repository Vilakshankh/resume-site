import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

export type Writing = {
  slug: string;
  title: string;
  description: string;
  date: string;
  experienceId?: string;
  cover: { src: string; poster?: string; alt: string };
  body: ReactNode;
};

function Film({ src, poster, alt }: Writing['cover']) {
  return (
    <video
      src={src}
      poster={poster}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      className="mb-12 w-full rounded-sm"
    />
  );
}

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mb-16">
      {title && <h4 className="mb-6 text-left text-xl font-bold text-neutral-950 md:text-2xl">{title}</h4>}
      <div className="space-y-6 text-sm leading-relaxed text-neutral-800 [&_em]:text-neutral-950 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-neutral-950 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

function Subheading({ children }: { children: ReactNode }) {
  return <h5 className="pt-4 text-lg font-semibold text-neutral-950 md:text-xl">{children}</h5>;
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="space-y-3">
      <img src={src} alt={alt} loading="lazy" className="h-auto w-full rounded-sm" />
      {caption && <figcaption className="text-sm text-neutral-500">{caption}</figcaption>}
    </figure>
  );
}

function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="mb-12 flex gap-3 overflow-x-auto">
      {images.map(image => (
        <img key={image.src} src={image.src} alt={image.alt} className="h-80 w-auto shrink-0 rounded-sm" />
      ))}
    </div>
  );
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue-600 hover:underline"
    >
      {children}
      <ExternalLink aria-hidden className="size-4" />
    </a>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mb-16 flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-500">
          {tag}
        </span>
      ))}
    </div>
  );
}

const SYNTRA = {
  hero: '/articles/syntra/hero.png',
  codeMode: '/articles/syntra/code-mode.png',
  preview: '/articles/syntra/preview-mode.png',
  hierarchy: '/articles/syntra/hierarchy.png',
  customization: '/articles/syntra/customization.png',
  themeBuilder: '/articles/syntra/theme-builder.png',
};

export const WRITING: Writing[] = [
  {
    slug: 'trails-branding',
    title: 'Branding a legal startup - Trails',
    description:
      'How do I modernize an old industry like law with technological innovation symbolizing risktaking.',
    date: '2026-01-06',
    experienceId: 'trails',
    cover: {
      src: '/articles/trails/landing.mp4',
      poster: '/articles/trails/xingrid.png',
      alt: 'Trails brand mark on a grid',
    },
    body: (
      <>
        <Film
          src="/articles/trails/landing.mp4"
          poster="/articles/trails/landing.jpg"
          alt="Trails landing film, Reclaim Leverage For Your Law Firm"
        />
        <Section>
          <p>
            My target demographic included middle-aged lawyers with decades of legal experience, but not necessarily
            technical. People who have seen the legal field evolve but still work in an environment associated with
            tradition, luxury, and formality: Dior suits, negotiation rooms, refined paperwork, the balance scale, and
            all the classic symbolism of law. While representing a demographic filled with risktakers and inviting AI
            into their workflow?
          </p>
          <p>
            To bridge that world with the modern, personalized, tech-driven experience I was designing, I drew
            inspiration from industries that carried a similar luxury archetype but also communicated transformation.{' '}
            <strong>Cosmetics</strong>.
          </p>
          <p>
            Elegance and innovation. That matched perfectly with Trails&apos; mission{' '}
            <strong>to transform traditional legal practices into modern, technology-driven firms</strong>. So I took
            elements from those archetypes and translated them into the brand&apos;s visual identity.
          </p>
          <p>This shaped all of my brand decisions:</p>
          <ul>
            <li>
              <strong>Color palette:</strong> black, brown, white, and green — a mix of heritage, luxury, and renewal.
            </li>
            <li>
              <strong>Typography:</strong> serif fonts to honor the classical, literature-rich history of law. I used{' '}
              <strong>Playfair Display</strong> for headings and <strong>Inter</strong> for body text to blend timeless
              formality with digital clarity.
            </li>
            <li>
              <strong>Logo:</strong> simple, monochromatic, and flexible. T for trails...or trials, or a stamp.
            </li>
            <li>
              <strong>Name:</strong> previously &quot;LegiSimple,&quot; the rebranding came from exploring deeper
              symbolism. Legal work involves research paths, case histories, and paper trails. Lawyers follow trails —
              and they leave them. I also liked the subtle visual similarity between &quot;trials&quot; and
              &quot;trails,&quot; reinforcing the legal theme.
            </li>
          </ul>
        </Section>
      </>
    ),
  },
  {
    slug: 'how-to-redesign-old-industries',
    title: 'How to Redesign Old Industries',
    description:
      'Design is informed by personal philosophy. Your opinions and values guide what you question, what you challenge, and what you choose to improve.',
    date: '2026-01-06',
    experienceId: 'trails',
    cover: {
      src: '/articles/trails/key-legal-insights.mp4',
      poster: '/articles/trails/ui.png',
      alt: 'Trails product interface',
    },
    body: (
      <>
        <Film
          src="/articles/trails/key-legal-insights.mp4"
          poster="/articles/trails/key-legal-insights.jpg"
          alt="Trails product showing key legal insights beside a case search"
        />
        <Section>
          <p>
            Design is informed by personal philosophy. Your opinions and values guide what you question, what you
            challenge, and what you choose to improve. A stance emerges through research, careful judgment, and the
            willingness to call out ineffective patterns. When you operate from your values, your work naturally moves
            toward improving experiences that have received little attention. In older industries, this space is wide.
            Meaningful change often starts with a clear perspective.
          </p>
          <p>
            When working as a designer in an old industry like legal, you can&apos;t let existing products define your
            standards for good user experience. Doing so means you&apos;re inheriting the industry&apos;s limitations
            without questioning them. Instead of benchmarking against what already exists, it&apos;s better to start
            from scratch and understand how your users think, what are they trying to achieve and more importantly,{' '}
            <em>why</em> are they making certain choices.
          </p>
          <p>
            Understanding the why moves design thinking away from product aesthetics alone and into systems. Once you
            understand the architecture your target market operate within (the workflows, constraints, historical
            habits, and risk structures), you start exploring and observing the environment. That&apos;s where real
            design and innovation lives, redefining the experience itself, and in an old industry, innovation is what
            moves it to the next evolution cycle.
          </p>
        </Section>
        <Section title="What is time without innovation?">
          <p>
            Time reveals weak foundations through duct-tape solutions and shortcuts. What begins as a workaround
            eventually <em>becomes</em> the system. When situations escalate, the absence of structured information in
            these systems becomes impossible to ignore.
          </p>
          <p>
            High-quality user interviews expose these patterns early. If you dig deeper you&apos;ll find entire
            ecosystems of tools built solely to support shortcuts, while the underlying foundation remains untouched.
            That neglected foundation is where the real opportunity lives.
          </p>
        </Section>
        <img
          src="/articles/trails/product.png"
          alt="Trails Product Screenshot"
          className="mb-12 h-auto w-full rounded-sm"
        />
        <Section title="Actionable take aways">
          <ul>
          <li>
            Treat legacy products as signals of historical constraints. They provide insight into where systems have
            been patched rather than designed.
          </li>
          <li>
            Begin by understanding user thinking. Their decision patterns and risk considerations inform how to
            redesign a product.
          </li>
          <li>
            Use interviews to identify recurring behaviors that emerged as practical responses to system gaps and
            existing products with bad design.
          </li>
          <li>
            Examine where effort accumulates in existing product experiences. User-borne effort often highlights
            missing structure.
          </li>
          <li>
            Focus attention on the underlying system. Foundational improvements tend to create the greatest leverage
            for innovation.
          </li>
          <li>
            Ground your opinions in research. Write down the patterns you observe, name the practices that limit users,
            and treat those insights as signals for where standards can evolve.
          </li>
          </ul>
        </Section>
      </>
    ),
  },
  {
    slug: 'syntra-falcon',
    title: 'Reducing the gap between imagining and building',
    description:
      'A new design experience that helps Design Engineers visually manipulate components and see their code change in real time.',
    date: '2025-12-31',
    cover: { src: SYNTRA.hero, alt: 'Syntra hero illustration' },
    body: (
      <>
        <img src={SYNTRA.hero} alt="Syntra hero illustration" className="mb-12 h-auto w-full rounded-sm" />
        <Section>
          <p>
            Designers and engineers have spent decades battling the same fundamental problem: the gap between
            imagining an interface and building it. The workflow is still fragmented—design in one tool,
            implementation in another, and constant back-and-forth.
          </p>
          <p>
            The friction doesn&apos;t come from bad design or bad engineering. It comes from the mental context
            switch: moving from creative experimentation into rigid, analytical coding. That workload with current
            tools is separated, slow, and breaks flow state.
          </p>
          <p>
            AI tools claim to remove friction by &quot;auto generating&quot; prototypes from prompts, but in practice
            they produce sloppy, non-iterative output. They attempt to eliminate the back-and-forth instead of
            improving it. But that back-and-forth is where real design thinking happens. We discover intent, emotion,
            interaction, and the nuance of how something should <em>feel</em>.
          </p>
        </Section>
        <Section title="Reducing Friction For Designers To Be Engineers">
          <p>
            Falcon already sits at the intersection of imagination and implementation. Its IDE interface, component
            library, and live preview give it a unique opportunity to let designers creatively experiment while
            building production code side by side.
          </p>
          <p>
            Engineers care about structure and functionality. Designers care about visual manipulation and freedom.
            The goal is to let both groups collaborate inside the same space, without switching tools or mindsets.
          </p>
          <ul>
            <li>Engineers build components without obsessing over cosmetics</li>
            <li>Designers adjust layout, spacing, and visuals without touching code</li>
            <li>Both changes are reflected instantly in one environment</li>
          </ul>
          <p>
            <strong>Syntra</strong> is visual component manipulation with real-time code change. It bridges design
            and development without forcing anyone to leave the environment—allowing design engineers to accelerate
            creativity and development.
          </p>
        </Section>
        <Section title="How does Syntra work?">
          <p>
            When a user enters Falcon, they begin in code mode. This grounds engineers immediately, while still
            keeping room for designers to enter visually when needed. By default, Falcon behaves like a traditional
            IDE until the user opens a component file.
          </p>
          <Figure
            src={SYNTRA.codeMode}
            alt="Coding a component in Code Mode"
            caption="Coding a component in Code Mode (default)"
          />
          <Subheading>Editing a Component Directly in Preview Mode</Subheading>
          <p>
            When a user views Preview in Falcon, they can edit the component visually in Preview Mode (Syntra):
            moving elements, adjusting spacing, refining appearance, updating typography. Any changes made in Syntra
            update the underlying code automatically in the IDE on the left.
          </p>
          <Figure
            src={SYNTRA.preview}
            alt="Editing a component directly in Preview Mode"
            caption="Editing a component directly in Preview Mode"
          />
          <p>
            To make this possible, Syntra introduces two supporting systems: <strong>the Hierarchy View</strong> and{' '}
            <strong>Cosmetic Editing Tools</strong>.
          </p>
        </Section>
        <Section title="Hierarchy View">
          <p>
            The Hierarchy View is a hierarchical outline that appears whenever a component is being worked on. It
            mirrors the exact structure of the component&apos;s code: parent, child, wrapper, and layout
            group—helping designers understand structure without scanning code.
          </p>
          <Figure
            src={SYNTRA.hierarchy}
            alt="Hierarchy View explainer"
            caption="Hierarchy View mirrors the component's code structure"
          />
          <p>
            Dragging items up or down in the hierarchy updates the code structure instantly. Structural changes in
            code are reflected visually in Preview Mode.
          </p>
          <Figure
            src={SYNTRA.preview}
            alt="Selecting a component highlights it in code and in hierarchy"
            caption="Selecting a component highlights it across preview, hierarchy, and code"
          />
        </Section>
        <Section title="Cosmetic Editing Tools">
          <p>
            These tools appear when a component is selected in Syntra. They allow designers to work directly with
            the component instead of modifying values in code—every visual change is reflected back into code.
          </p>
          <ul>
            <li>layout</li>
            <li>spacing</li>
            <li>positioning</li>
            <li>fill</li>
            <li>borders</li>
            <li>radius</li>
            <li>typography (if the font exists in the project)</li>
            <li>width / height</li>
            <li>appearance</li>
          </ul>
          <Figure
            src={SYNTRA.customization}
            alt="Component customization panel"
            caption="A closer look at Syntra's customization tools"
          />
        </Section>
        <Section title="How it fits into workflow">
          <p>A typical flow looks like this:</p>
          <ol>
            <li>Engineer opens a component file (default code mode).</li>
            <li>The Hierarchy View appears with its component structure.</li>
            <li>Syntra shows the component visually.</li>
            <li>Designer opens the editing tools and modifies the component directly in Syntra.</li>
            <li>The code updates automatically reflecting each visual change.</li>
            <li>Engineers adjust logic/structure; designers continue refining styling.</li>
          </ol>
          <p>
            This shifts the workflow from <em>editing UI through code</em> → to <em>editing UI directly through
            Syntra</em>, while keeping the underlying code engineer-friendly.
          </p>
        </Section>
        <Section title="Sample Prototype">
          <Link href="https://zero-minus-82708488.figma.site/">Open the Syntra prototype</Link>
        </Section>
        <Section title="Testing">
          <p>
            I would approach testing this feature the same way a design engineer would encounter it in real use. The
            goal is to understand how users interpret Syntra, where friction appears, and how well the visual editing
            model holds up under real workflows.
          </p>
          <p>
            I interviewed 3 design engineers on low-fidelity mocks for first-impression understanding.
            Higher-quality engagement testing would involve low-fidelity interactive prototypes as proof of concept.
          </p>
          <Subheading>Success criteria</Subheading>
          <ul>
            <li>
              <strong>Clarity:</strong> Users instantly recognize Syntra is editable and understand the relationship
              between hierarchy, canvas, and code.
            </li>
            <li>
              <strong>Flow:</strong> Users move between roles (designer ↔ engineer) without breaking mental context.
            </li>
            <li>
              <strong>Predictability:</strong> Edits feel reversible, consistent, and coherent across preview,
              hierarchy, and code.
            </li>
          </ul>
          <Subheading>Potential cognitive load leaks</Subheading>
          <ul>
            <li>Are there too many panels open?</li>
            <li>Does the hierarchy feel natural or intrusive?</li>
            <li>Are editing tools grouped intuitively and discoverable?</li>
            <li>How often do users stop to inspect code for reassurance?</li>
          </ul>
        </Section>
        <Section title="Marketing and positioning">
          <p>
            <strong>Syntra</strong> captures the futuristic spirit of what this workflow enables: a creative space
            inside Falcon where the interface becomes something you can shape directly with your hands.
          </p>
          <Figure
            src={SYNTRA.hero}
            alt="Introducing Syntra marketing frame"
            caption={'"Introducing Syntra" marketing frame'}
          />
          <p>
            With Syntra, Preview Mode becomes fully interactive: select a component, adjust spacing, change
            appearance, refine typography while Falcon updates the code live. Drag items in the Hierarchy View to
            reorder structure, and see both the UI and code respond instantly.
          </p>
        </Section>
        <Section title="Feedback and future versions">
          <p>
            Syntra&apos;s first version forms the foundation: editing components visually with code updating in real
            time. From there, the evolution depends on observing how users push, bend, and break the system.
          </p>
          <Subheading>Version 1.1: refine the core interaction</Subheading>
          <ul>
            <li>Refine hierarchy drag + drop behaviors</li>
            <li>Smooth code generation edge cases</li>
            <li>Add micro-interactions that reinforce predictability</li>
          </ul>
          <Subheading>Version 2: thematic customization</Subheading>
          <p>
            A strong signal from interviews: designers value theme systems—defining appearance, semantics, and
            stylistic rules. Extending Syntra into theme-level editing could unlock major value.
          </p>
          <Figure
            src={SYNTRA.themeBuilder}
            alt="Theme builder reference"
            caption="Theme builder reference mentioned in user interviews"
          />
          <Subheading>Long-term vision</Subheading>
          <p>
            <strong>Make Falcon the place where interfaces are shaped and coded together.</strong>
          </p>
        </Section>
        <Tags
          tags={[
            '#designengineering',
            '#productdesign',
            '#ux',
            '#devtools',
            '#falcon',
            '#prototyping',
            '#ui',
            '#designsystems',
          ]}
        />
      </>
    ),
  },
  {
    slug: 'studioenok-randomanxiety-design-autopsy',
    title: "Design Autopsy of Studioenok: Defining RandomAnxiety's Jewellery Brand",
    description:
      'How Studioenok created a rigid grid design system that reorganizes chaotic information into structured layouts, allowing wearers to build personal relationships with the jewellery.',
    date: '2025-12-26',
    cover: { src: '/articles/studioenok/1.png', alt: 'RandomAnxiety branding design' },
    body: (
      <>
        <Gallery
          images={[
            { src: '/articles/studioenok/1.png', alt: 'RandomAnxiety Branding Design' },
            { src: '/articles/studioenok/2.png', alt: 'RandomAnxiety Packaging Design' },
            { src: '/articles/studioenok/3.png', alt: 'RandomAnxiety Product Photography' },
            { src: '/articles/studioenok/4.png', alt: 'RandomAnxiety Box Stack' },
          ]}
        />
        <Section>
          <p>
            Studioenok believed that a jewellery brand should create space for the wearer to build a personal
            relationship with the object. They did this by creating a rigid grid design system for Random Anxiety. A
            system that reorganizes chaotic information into structured layouts.
          </p>
          <p>
            The entire identity operates in monochrome, a decision that creates space for the jewellery itself to
            provide warmth and material presence. The goal was to shift the focus from the branding to the wearer and
            allow the wearer to create their own identity with the jewellery brand, rather than imposing an identity.
          </p>
        </Section>
        <Section title="Personal Takeaways">
          <ul>
            <li>Create branding systems that can hold stories</li>
            <li>Give space for the audience to build personal relationships with elements</li>
          </ul>
        </Section>
        <Section title="Further Reading">
          <div className="flex flex-col items-start gap-4">
            <Link href="https://lnkd.in/eWHVuszF">Read more about Studioenok&apos;s work</Link>
            <Link href="https://lnkd.in/e6xdfj6Z">Additional resources on RandomAnxiety branding</Link>
          </div>
        </Section>
        <Tags tags={['#branding', '#design', '#productdesign', '#typography']} />
      </>
    ),
  },
];
