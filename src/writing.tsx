import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

export type WritingCover = { src: string; poster?: string; alt: string };

export type Writing = {
  slug: string;
  title: string;
  description: string;
  date: string;
  experienceId?: string;
  cover?: WritingCover;
  body: ReactNode;
};

function Film({ src, poster, alt }: WritingCover) {
  return (
    <video
      src={src}
      poster={poster}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      className="mb-8 w-full max-w-full rounded-sm md:mb-12"
    />
  );
}

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mb-10 md:mb-16">
      {title && <h4 className="mb-4 text-left text-lg font-bold text-balance text-neutral-950 md:mb-6 md:text-2xl">{title}</h4>}
      <div className="space-y-4 text-sm leading-relaxed break-words text-neutral-800 md:space-y-6 [&_em]:text-neutral-950 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-neutral-950 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
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
      <img src={src} alt={alt} loading="lazy" className="h-auto w-full max-w-full rounded-sm" />
      {caption && <figcaption className="text-sm text-neutral-500">{caption}</figcaption>}
    </figure>
  );
}

function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="mb-8 flex w-full min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain md:mb-12 md:gap-3">
      {images.map(image => (
        <img key={image.src} src={image.src} alt={image.alt} className="h-52 w-auto max-w-none shrink-0 rounded-sm sm:h-64 md:h-80" />
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
      className="inline-flex max-w-full items-center gap-2 break-words text-blue-600 hover:underline"
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
    slug: 'design-jigs',
    title: 'design jigs: why designers should build their own tools',
    description:
      'AI is not the thing that designs for you. it is the thing that lets you build your own jigs — small custom tools that fit your exact process.',
    date: '2026-11-10',
    body: (
      <>
        <Section>
          <p>
            woodworkers have this thing called a jig. it&apos;s a little custom tool you build so you can make the same
            precise cut over and over without measuring every time. nobody sells it to you. you make it for the exact
            thing you&apos;re building.
          </p>
          <p>
            i&apos;ve started thinking about AI the same way. not as the thing that designs for me, but as the thing that
            lets me build my own jigs.
          </p>
        </Section>
        <Section title="the tools were never made for you">
          <p>
            every design tool is built for the average designer doing the average task. that&apos;s how software works. it
            has to fit millions of people, so it fits nobody perfectly.
          </p>
          <p>
            so we bend our process around the tool. we do the same 12 clicks to export assets. we rename layers by hand.
            we rebuild the same handoff doc every project. we accept it because the alternative used to be &quot;learn to
            code and build a plugin,&quot; and who has time for that.
          </p>
          <p>that&apos;s changed.</p>
        </Section>
        <Section title="what a design jig looks like">
          <p>
            a jig is small. it does one thing. it fits <em>your</em> workflow, not everyone&apos;s. for draftaid, whose
            brand lives in engineering drawings — GD&amp;T symbols, axes, grids, isometric parts — i&apos;ve been building
            generative jigs instead of redrawing every asset by hand:
          </p>
          <ul>
            <li>
              a <strong>symbol grid</strong> that arranges CAD and GD&amp;T marks by seed, perlin noise, and palette
            </li>
            <li>
              a <strong>pixel shape</strong> jig that breaks part silhouettes into symbol-filled cells with motion
              controls
            </li>
            <li>
              a <strong>hero</strong> builder where marketing copy and a generative brand field live in the same panel
            </li>
            <li>
              an <strong>axis view</strong> that draws isometric / orthographic parts with seed, mirror, edges, and
              svg/png export
            </li>
            <li>
              adjacent experiments — showreel, tetris, integrations, puzzle, data sphere, iso — all wired to the same
              visual vocabulary
            </li>
          </ul>
          <p>
            every view exposes the parameters that would otherwise stay buried in code: seeds, density, noise, color,
            export. change a slider, get a new on-brand asset. copy the parameters, get the same result again.
          </p>
          <p>
            none of these are products. none of them would make sense to sell as-is. that&apos;s the point. they&apos;re
            mine — tuned to one brand&apos;s rules so every output stays on-system.
          </p>
        </Section>
        <Section title='why this matters more than "AI design"'>
          <p>
            most of the conversation about AI in design is about generation. make me a logo, make me a landing page. and
            that&apos;s exactly where the mediocre stuff comes from, because you&apos;re asking a general tool to make a
            specific thing.
          </p>
          <p>
            jigs flip that. you keep the taste and the decisions. the tool takes the repetitive part. you&apos;re not
            outsourcing the cut, you&apos;re making the cut more precise and repeatable.
          </p>
          <p>
            <strong>AI is a tool to go from idea to reality faster.</strong> jigs are the most literal version of that.
          </p>
        </Section>
        <Section title="when everyone builds their own tools">
          <p>
            here&apos;s the part i find really interesting. if every designer can build tools that fit their exact
            process, then process itself becomes a form of craft again.
          </p>
          <p>
            two designers with the same software will work completely differently, because their jigs are different. your
            toolkit starts to say something about how you think. the way you&apos;ve set up your systems becomes part of
            your taste.
          </p>
          <p>
            that&apos;s a shift. for a long time, the tool shaped the designer. now the designer gets to shape the tool.
          </p>
        </Section>
        <Section title="how to start">
          <p>you don&apos;t need to be technical. start here:</p>
          <ol>
            <li>
              <strong>notice the repeat.</strong> for one week, write down anything you do more than twice. that&apos;s
              your jig list.
            </li>
            <li>
              <strong>pick the most annoying one.</strong> not the biggest. the most annoying. motivation matters.
            </li>
            <li>
              <strong>describe it to an AI like you&apos;d explain it to an intern.</strong> what goes in, what comes out,
              what the rules are.
            </li>
            <li>
              <strong>keep it ugly.</strong> a jig doesn&apos;t need a nice UI. it needs to work.
            </li>
            <li>
              <strong>save it somewhere you&apos;ll find it.</strong> a folder of jigs is a toolkit. a toolkit compounds.
            </li>
          </ol>
          <p>
            the designers who win the next few years won&apos;t be the ones who generate the most. they&apos;ll be the
            ones who built the best workshop.
          </p>
        </Section>
      </>
    ),
  },
  {
    slug: 'generative-branding',
    title: 'generative branding: brand systems that keep up with startups',
    description:
      'startups ship faster than static brands can follow. generative branding means designing the system instead of the outputs.',
    date: '2026-11-10',
    body: (
      <>
        <Section>
          <p>
            startups can&apos;t slow down. that&apos;s not a flaw, it&apos;s the deal. you ship, you learn, you ship
            again.
          </p>
          <p>
            the problem is brands are usually built like they&apos;re for companies that <em>can</em> slow down. a big
            identity project, a 60 page guidelines PDF, a designer who has to touch every asset. then the startup grows
            faster than the brand can follow, and things start to drift. the deck looks different from the site. the site
            looks different from the ads. every new hire makes their own version.
          </p>
          <p>
            that&apos;s how a brand goes mediocre. not in one bad decision, but in a thousand small inconsistent ones.
          </p>
        </Section>
        <Section title="what generative branding is">
          <p>
            generative branding means designing the <strong>system</strong> instead of the outputs.
          </p>
          <p>
            instead of a fixed logo and a set of templates, you define rules: how type scales, how color combines, how
            layouts are built, how a shape can move or change. then those rules generate the assets. sometimes by code,
            sometimes by AI, sometimes by a person following a really clear system.
          </p>
          <p>
            the brand stops being a set of files and becomes a set of decisions that keep making themselves.
          </p>
          <p>
            some well known examples of this thinking: identities with logos that change based on data or context, type
            systems that respond to content, visual languages built from a grid or algorithm so every new piece feels
            related without being identical.
          </p>
        </Section>
        <Section title="why it fits startups">
          <p>
            a static brand asks: &quot;what does it look like?&quot;
            <br />
            a generative brand asks: &quot;how does it behave?&quot;
          </p>
          <p>
            that second question is way more useful when you&apos;re moving fast. because you don&apos;t know what
            you&apos;ll need in six months. new product, new market, new channel. a system can stretch to meet that. a
            template can&apos;t.
          </p>
          <p>
            it also solves the speed vs. quality fight. the taste goes in once, at the system level, deeply. after that,
            speed is cheap and the output stays on brand. you get to be slow where it matters and fast everywhere else.
          </p>
        </Section>
        <Section title="what a brand system actually needs">
          <p>you don&apos;t need a huge budget to start. you need a few things done really well:</p>
          <ol>
            <li>
              <strong>a point of view.</strong> the system amplifies whatever idea is at the core. if there&apos;s no
              idea, you just generate mediocre at scale. this is the part you can&apos;t skip.
            </li>
            <li>
              <strong>tokens.</strong> colors, type, spacing, radius, motion, all named and defined. this is the
              vocabulary.
            </li>
            <li>
              <strong>rules.</strong> how tokens combine. what&apos;s allowed, what&apos;s never allowed. contrast,
              hierarchy, proportions.
            </li>
            <li>
              <strong>a few generators.</strong> the pieces that turn rules into outputs. a social post builder, a slide
              system, a pattern or illustration logic.
            </li>
            <li>
              <strong>room to break it.</strong> the best systems have a space for moments of pure craft, the hero
              campaign, the launch, the thing people screenshot.
            </li>
          </ol>
        </Section>
        <Section title="how much does it take?">
          <p>
            less than you&apos;d think, more than a logo. the upfront investment is heavier than a quick identity,
            because you&apos;re designing rules instead of outputs. but the cost per asset drops close to zero after that,
            and so does the cost of inconsistency.
          </p>
          <p>
            compare that to the hidden cost of rapid growth without a system: rebrands every 18 months, a design team that
            only does production, and a brand that never builds trust because it never looks the same twice.
          </p>
        </Section>
        <Section title="the bigger shift">
          <p>
            AI made it easy to generate anything. that&apos;s exactly why the system matters more now. generation without
            rules is noise. generation inside a strong system is a brand that scales.
          </p>
          <p>
            the designer&apos;s job isn&apos;t going away. it&apos;s moving up a level. we&apos;re not just making the
            thing anymore. we&apos;re making the thing that makes the thing.
          </p>
        </Section>
      </>
    ),
  },
  {
    slug: 'we-live-in-a-mediocre-world',
    title: 'we live in a mediocre world',
    description:
      'AI did not create mediocrity. it just made it cheaper. how to stay a craftsperson when "good enough" ships free.',
    date: '2026-11-10',
    body: (
      <>
        <Section>
          <p>
            when i started designing i was obsessed with the process. every time i made something that gave <em>me</em>{' '}
            an experience, i felt it in my chest. that was the whole point.
          </p>
          <p>
            fast forward to looking for a job, getting a salary, sitting in the meetings. i realized something nobody
            tells you in design school: most businesses don&apos;t actually think design is that important. not in a mean
            way. it&apos;s just not the thing on fire.
          </p>
          <p>
            startups make and burn cash fast. the priorities are sales, product market fit, raising the next round. design
            is something you do on the way to those things. and when design is on the way to something else, &quot;good
            enough&quot; wins every time.
          </p>
        </Section>
        <Section title="speed ate the process">
          <p>
            we&apos;re so obsessed with rapid production that we can&apos;t afford to be slow anymore. you need that
            design today. if you can&apos;t do it today, they&apos;ll make it with AI and be ok with how shallow it is.
          </p>
          <p>
            and honestly? i get it. a founder with 14 months of runway isn&apos;t going to wait three weeks for a brand
            exploration. they&apos;re going to ship the thing.
          </p>
          <p>but here&apos;s what i keep coming back to:</p>
          <p>
            <strong>AI didn&apos;t create mediocrity. it just made it cheaper.</strong>
          </p>
          <p>
            mediocre design existed long before generative tools. stock templates, the same three SaaS landing pages,
            gradients on gradients. AI just removed the last bit of friction. now mediocre is free and instant, so
            it&apos;s everywhere.
          </p>
        </Section>
        <Section title="what mediocre actually costs">
          <p>the problem is mediocre isn&apos;t free. it just sends the bill later.</p>
          <p>brands do three jobs for people:</p>
          <ul>
            <li>
              <strong>navigation.</strong> helping people choose. this matters most in B2C, where there are a hundred
              options and decisions happen in seconds.
            </li>
            <li>
              <strong>reassurance.</strong> telling a buyer they made the right call. this matters most in B2B, where
              deals are big, someone&apos;s reputation is on the line, and switching is painful.
            </li>
            <li>
              <strong>engagement.</strong> making people identify with you. B2C leans on emotion and lifestyle here, B2B
              leans on credibility and competence.
            </li>
          </ul>
          <p>
            mediocre design quietly fails all three. you don&apos;t stand out, so you don&apos;t get picked. you look
            like everyone else, so buyers don&apos;t feel safe. and nobody identifies with a template.
          </p>
          <p>you never see the deal you lost because the site felt cheap. that&apos;s why it&apos;s so easy to ignore.</p>
        </Section>
        <Section title="so how do you stay a craftsperson?">
          <p>
            i&apos;m not totally sure yet. i&apos;m still figuring out how to navigate this market. but a few things i
            believe right now:
          </p>
          <p>
            <strong>1. quality is now defined by what you dream, not time spent.</strong> speed isn&apos;t the enemy. AI
            can get me from idea to reality faster than ever. the shallow part isn&apos;t the tool, it&apos;s when nobody
            had an idea worth making real in the first place. taste is the input now.
          </p>
          <p>
            <strong>2. be slow where it counts.</strong> you can&apos;t be slow everywhere anymore. so pick the moments.
            the core identity, the first impression, the thing people screenshot. go deep there and let systems handle the
            rest.
          </p>
          <p>
            <strong>3. build systems, not one-offs.</strong> if a business can&apos;t afford to slow down, give them
            something that keeps quality high at speed. that&apos;s what brand systems are for.
          </p>
          <p>
            <strong>4. talk about cost in their language.</strong> &quot;this looks better&quot; doesn&apos;t land with a
            founder. &quot;this is costing you trust and conversion&quot; does.
          </p>
        </Section>
        <Section title="art vs. a paycheck">
          <p>there&apos;s a line i wrote in my notes a while ago that i still can&apos;t shake:</p>
          <p>
            <em>
              you can make art for yourself, but when you create art to put food on the table, it&apos;s no longer art.
            </em>
          </p>
          <p>
            maybe that&apos;s true. but i don&apos;t think the answer is to stop caring. i think the answer is to get
            really good at knowing <em>where</em> caring pays off, and protecting that part like your life depends on it.
          </p>
          <p>
            because the world being mediocre isn&apos;t really a threat to designers with taste. it&apos;s the
            opportunity.
          </p>
        </Section>
      </>
    ),
  },
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
          className="mb-8 h-auto w-full max-w-full rounded-sm md:mb-12"
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
        <img src={SYNTRA.hero} alt="Syntra hero illustration" className="mb-8 h-auto w-full max-w-full rounded-sm md:mb-12" />
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
