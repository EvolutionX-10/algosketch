# Agent guidance for AlgoSketch

## Scope and Git identity

This file applies to the entire repository. Preserve existing user changes and keep each change focused on the requested work. Read `plan.md` for the improvement backlog; distinguish planned features from implemented behavior.

Every commit must use this identity for **both author and committer**:

- Name: `EvolutionX-10`
- Email: `85353424+EvolutionX-10@users.noreply.github.com`

Configure the checkout before committing:

```sh
git config --local user.name "EvolutionX-10"
git config --local user.email "85353424+EvolutionX-10@users.noreply.github.com"
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

Check that environment overrides have not changed either identity. Do not create a commit with a different author or committer, and do not change global Git configuration. Keep unrelated files out of commits.

## Project map

AlgoSketch is an educational Next.js App Router application using React, strict TypeScript, Tailwind CSS v4, Radix UI, Motion, MDX, and Serwist. The current catalog has six sorting algorithms, two searching algorithms, and stack, queue, and linked-list visualizers.

- `src/app/`: routes, layouts, global CSS, metadata, and service worker source.
- `src/app/dashboard/algorithms/`: category pages and algorithm lessons in `page.mdx`.
- `src/app/dashboard/structures/`: data-structure pages in TSX.
- `src/components/<algorithm>/`: step generators, visualizers, controls, statistics, explanations, and code examples.
- `src/components/shared/`: reusable bars, nodes, and visualization mode controls.
- `src/components/ui/`: shared UI primitives and controls.
- `src/lib/constants.ts`: navigation catalog and production base URL.
- `src/lib/utils.ts`: navigation path/name helpers and other utilities.
- `src/lib/types/`: shared types; check existing definitions before adding another.
- `src/app/sw.ts`, `next.config.ts`, and `src/components/service-worker-registration.tsx`: PWA behavior.
- `docs/`: architecture, algorithm implementation, and contributor guides. Some examples are older than the source; verify them before copying.

## Setup and commands

`bun.lock` is the tracked dependency lockfile. The supported toolchain is Node.js 22 or newer and Bun 1.3.3 (`packageManager` in `package.json`). Use Bun for dependency installation and preserve this lockfile. Do not introduce another package manager's lockfile. Existing installed dependencies can also run the scripts through npm.

```sh
bun install --frozen-lockfile
bun run dev
bun run build
bun run start
```

- Development: `npm run dev` runs Next.js with Turbopack on port 3000.
- Production build: `npm run build` uses the configured MDX and Serwist integrations.
- Production preview: `npm run start -- --hostname 0.0.0.0`; build first.
- Lint: `bun run lint` (ESLint with the Next.js Core Web Vitals rules; literal punctuation in prose is permitted).
- Type check: `bun run typecheck`.
- Unit regressions: `bun run test:unit` (Bun's test runner, restricted to `tests/unit/`).
- Browser regressions: `bun run build`, `bunx playwright install chromium`, then `bun run test:e2e`. Playwright starts its own production server on port 3100; keep that port free. Desktop and mobile Chromium projects run by default. To use an existing compatible system browser, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path.
- Formatting check for specific changed files: `./node_modules/.bin/prettier --check <files>`.
- Format specific changed files: `./node_modules/.bin/prettier --write <files>`.
- `npm run format` rewrites all of `src/`; avoid using it for a narrow change.

The baseline audit and implementation progress are recorded separately in `plan.md`. The repository now has noninteractive lint/typecheck commands, unit regressions, production-browser regressions, and `.github/workflows/checks.yml`. Run relevant checks and report their actual results; a configured workflow does not establish that hosted CI has passed. Use `bun install --frozen-lockfile` to verify the checked-in lockfile after dependency changes.

## Implementation conventions

- Follow nearby naming and component organization. Use the `@/` alias for `src/` imports and `import type` for type-only dependencies where practical.
- Use the existing Prettier configuration: tabs, 120-column print width, and the Tailwind class-ordering plugin. Avoid unrelated reformatting.
- Keep algorithm step generation separate from React rendering and animation timers. Prefer pure, deterministic generators given a fixed input.
- Clone changed items as well as their containers. Never mutate caller-owned inputs or earlier snapshots. Preserve each logical item's ID across steps and view changes.
- Represent initial, intermediate, and completed states explicitly. Validate empty, singleton, sorted, reversed, duplicate, and boundary-value inputs where supported. For binary search, make the sorted-input requirement explicit.
- Derive statistics from the selected step or stored cumulative metrics so moving backward restores the exact previous counts. Distinguish comparisons, swaps, shifts, writes, and traversal operations.
- Keep playback timers under one owner, clean them up on unmount/reset, and avoid state side effects inside state-updater callbacks. Verify pause/resume and speed changes without creating multiple timers.
- Reuse shared controls and Radix primitives where they fit. Support keyboard input, visible focus, meaningful accessible names, and reduced motion. Do not rely on color alone to explain state.
- Keep numeric validation and errors near the relevant input; reject unsupported input without silently truncating it.
- Preserve server rendering when adding browser-specific behavior. Isolate local storage, random initialization, and browser APIs to the smallest necessary client boundary.
- For a new visualizer, update its lesson/route, navigation catalog, category/dashboard discoverability, code examples, complexity explanation, and applicable documentation. The sitemap currently derives algorithm paths from `navData` and `getLink`; verify the generated URL as well.
- Do not label predictable URL paths or the `dev` cookie as authentication. Inspect actual middleware behavior before changing it; `docs/password-system.md` is out of sync with the implementation.

## Verification and handoff

Run the checks appropriate to the change and report the command and observed result. A successful build alone does not establish algorithm correctness or accessibility.

For behavior changes, exercise the affected user flow in a browser. For visualizer changes, check forward/backward navigation, play/pause, completion, reset/regenerate, statistics, and switching available views. Check narrow mobile and desktop layouts, light/dark themes, and keyboard access. Check that changing routes while playing cleans up the previous animation.

PWA behavior must be verified against a production build, since Serwist is disabled in development. Check manifest and icon responses, service worker registration, cached-page reload while offline, fallback navigation, and updates without losing active learning work. Avoid running development and production builds against the same `.next` directory simultaneously.

Add focused regression tests when fixing algorithm, snapshot, pointer, or playback defects. `src/lib/algorithm-metrics.ts` defines explicit operation events and their cumulative totals; `src/hooks/use-algorithm-playback.ts` owns playback and timer cleanup for all eight algorithm visualizers. Record actual operations in generators rather than counting highlight frames in UI handlers. Do not add tests solely to mirror documentation edits. Never claim a manual smoke test is a committed automated suite, or a Chromium check is cross-browser coverage.

Keep generated `.next/`, `node_modules/`, service workers (`public/sw*`), TypeScript build caches, browser reports, and credentials out of source control. Update `plan.md` when completing a roadmap item, including relevant evidence and remaining limitations. Finish with a concise description of changed behavior/files, validation, and any actual blockers.
