# Design Tools with AI

Building jigs — custom design tools that make generative brand systems tunable, repeatable, and usable.

**Context:** Draftaid brand system · **Live:** [draftaid-gen-art.vercel.app](https://draftaid-gen-art.vercel.app/#axis)

> When a job is difficult to do precisely — or tedious to do repeatedly — you make a jig. A jig is a tool that makes it easier to make something else.

That idea, from [Jack Cheng’s essay on designing with AI](https://every.to/p/designing-with-ai-make-a-jig), sits at the center of this work. Prompting alone is too coarse for brand design. You need controls you can see, reverse, and tune — the same way a woodworker uses a jig instead of freehanding every cut.

## The problem

Draftaid’s brand lives in the language of engineering drawings: GD&T symbols, axes, grids, isometric parts, dimension callouts. Hand-making every variation of that language for marketing, product, and motion is slow. Prompting an agent for each tweak is slower still — and hard to reproduce.

The answer isn’t more prompts. It’s a **jig**: a generative system with a control panel, so the brand can be explored in real time instead of described in chat.

## What I built

A suite of procedural and generative art tools for Draftaid’s brand system — each view is its own jig, wired to the same visual vocabulary:

- **Symbol grid** — CAD and GD&T marks arranged by seed, Perlin noise, and palette
- **Pixel shape** — part silhouettes broken into symbol-filled cells with motion controls
- **Hero** — marketing surfaces where copy and generative field live in the same panel
- **Axis view** — isometric / orthographic part drawings with seed, mirror, edges, and SVG/PNG export
- Plus showreel, tetris, integrations, puzzle, data sphere, and iso pieces for adjacent brand experiments

Every view exposes the parameters that would otherwise stay buried in code: seeds, density, noise, color, export. Change a slider, get a new on-brand asset. Copy the parameters, get the same result again.

## Why jigs

Cheng’s point (via designers like Josh Puckett and Amelia Wattenberger) is that AI gives you a new material, but the old craft still applies: **to make advanced things, you build tools that help you make the thing.** Chat is a blunt instrument for fine visual judgment. A jig brings back immediate feedback — sketch, look, react — into an AI-assisted workflow.

For a brand system, that matters twice:

1. **Constraint is the brand.** Seeds and rules keep every output recognizably Draftaid, even when the composition never repeats.
2. **Exploration is the design work.** Tuning density, axis, palette, and symbol sets *is* art direction — not a side effect of prompting.

## Outcome

A living generative brand toolkit: procedural art for Draftaid that can produce infinite on-system variations — heroes, grids, part studies, symbol fields — without redrawing from scratch, and without losing the engineering-drawing DNA of the identity.
