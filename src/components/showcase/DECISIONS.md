# Architectural Decision Records (ADR) — Showcase Domain

This document records the architectural decisions, design guidelines, and UX paradigms governing the Motion Lab showcase platform in `src/components/showcase/`.

---

## Index

- [[[ADR-SHOWCASE-01]] Centralized Motion Lab Stage Architecture & Persistent Sticky Navigation Trio](#adr-showcase-01-centralized-motion-lab-stage-architecture--persistent-sticky-navigation-trio)
- [[[ADR-SHOWCASE-02]] Constant Studio Dark Exhibition Canvas & Apple Design Restraint](#adr-showcase-02-constant-studio-dark-exhibition-canvas--apple-design-restraint)
- [[[ADR-SHOWCASE-03]] Non-Destructive Demo Wrappers with Interactive Parameter Controls](#adr-showcase-03-non-destructive-demo-wrappers-with-interactive-parameter-controls)
- [[[ADR-SHOWCASE-04]] Declarative Showcase Registry & Day-Based Catalog Schema](#adr-showcase-04-declarative-showcase-registry--day-based-catalog-schema)

---

### [[ADR-SHOWCASE-01]] Centralized Motion Lab Stage Architecture & Persistent Sticky Navigation Trio

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC` & `CODE_REVIEW`
- **Origin**: `USER_DIRECTIVE` & `USER_OVERRULED_AI`

#### Context / Problem
Initially, navigation buttons (Previous, Next) and replay triggers were placed inside the stage canvas alongside the animated demo. However, in scrollable or tall stages (e.g. 24-tile `ShuffleGrid`, multi-line lists, forms), scrolling the stage caused these critical controls to scroll out of view. Users had to repeatedly scroll up and down to navigate or replay animations.

#### Decision / Solution
1. **Persistent Header Placement**: Moved the complete navigation trio (`[ < ]`, `[ ↻ R ]`, `[ > ]`) to the top sticky header (`ShowcaseHeader`), guaranteeing 100% persistent visibility regardless of stage scroll position.
2. **Keyboard Accelerators**: Bound global keyboard shortcuts (`ArrowLeft` for Previous, `ArrowRight` for Next, and `r`/`R` for Replay) with input guard rails to ignore key events when typing inside form inputs.
3. **URL Hash Deep-Linking**: Synchronized active demo ID with the browser URL hash (`#simple-exit`, `#shuffle-grid`), enabling direct bookmarking, browser back/forward history traversal, and shareable links.

#### Shallow Code Snippet
```tsx
// ShowcaseHeader.tsx - Persistent navigation trio
<div className="flex items-center gap-1 bg-neutral-900/90 border border-neutral-800 p-1 rounded-lg">
  <button onClick={onPrev} disabled={!hasPrev} title="Previous animation (←)">
    <ChevronLeft className="size-4" />
  </button>
  <button onClick={onReplayCurrent} title="Replay current animation (R)">
    <RotateCcw className="size-3.5" />
    <span className="text-[10px] font-mono text-neutral-400">R</span>
  </button>
  <button onClick={onNext} disabled={!hasNext} title="Next animation (→)">
    <ChevronRight className="size-4" />
  </button>
</div>
```

---

### [[ADR-SHOWCASE-02]] Constant Studio Dark Exhibition Canvas & Apple Design Restraint

- **Status**: Implemented
- **Trigger**: `CODE_REVIEW` / `USER_OVERRULED_AI`
- **Origin**: `USER_DIRECTIVE` & `/apple-design`

#### Context / Problem
Early design proposals introduced dynamic multi-backdrop selection (white sheets, blueprints, loud violet gradients) and heavy bubbly rounded pill buttons. The user strongly rejected these as "childish, vibe-coded AI aesthetics," requesting a sleek, professional showcase inspired by Apple's WWDC design restraint.

#### Decision / Solution
1. **Locked Studio Dark Stage**: Completely eliminated backdrop switching in favor of a constant, calm `#0d0d0f` Studio Dark exhibition canvas. This provides optimal contrast for both light elements and colored tiles.
2. **Apple Geometry & Materials**: Standardized on disciplined corner radii (`rounded-md` 6px for buttons/badges, `rounded-xl` 12px for cards/menus, `rounded-2xl` for app tiles). Replaced saturated neon accents with quiet monochromatic translucent surfaces (`bg-neutral-900/90`, `border-neutral-800`, `backdrop-blur-md`).
3. **System Typography**: Adopted optical letter tracking (`tracking-[-0.02em]` on large headings, `tracking-tight` on labels) and system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display"`).

---

### [[ADR-SHOWCASE-03]] Non-Destructive Demo Wrappers with Interactive Parameter Controls

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC`
- **Origin**: `AI_AUTONOMOUS`

#### Context / Problem
Certain practice components from early learning days were hardcoded to fixed coordinates (e.g. `NotificationFeed` was hardcoded to `absolute ml-120 mt-50`) or lacked interactive reset triggers (e.g. `SimpleExit` permanently removed its box on unmount with no way to remount it without refreshing the page). Modifying the student's original practice files directly would tamper with their original learning code.

#### Decision / Solution
Created `DemoWrappers.tsx` containing lightweight, non-destructive exhibition shells:
- **`SimpleExitDemo`**: Adds a toggle button that unmounts and remounts `KillSquare` to let viewers observe both entrance and exit spring lifecycles.
- **`NotificationFeedDemo`**: Exposes a segmented delay selector (`0.08s`, `0.15s`, `0.35s`) and an "Add" button to test `staggerChildren` dynamically.
- **`KeyframePlaygroundDemo`**: Provides an isolated replay trigger for timed keyframe sequence evaluation.

---

### [[ADR-SHOWCASE-04]] Declarative Showcase Registry & Day-Based Catalog Schema

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC`
- **Origin**: `AI_AUTONOMOUS`

#### Context / Problem
Thirteen discrete practice demos across 9 days were originally scattered across disparate routes and tabs without unified discovery, categorization, or technical metadata.

#### Decision / Solution
Centralized all animations into a strongly typed registry in `src/data/showcaseItems.ts` conforming to the `ShowcaseItem` schema in `src/types/showcase.ts`:
- Categorized into 6 core learning tracks: `basics`, `variants`, `keyframes`, `imperative`, `exits`, and `layout`.
- Tagged with core Motion API concepts (`layout`, `variants`, `AnimatePresence`, `staggerChildren`, `useAnimationControls`).
- Rendered dynamically via `ShowcaseStage` with automatic remounting keys (`replayKey`).
