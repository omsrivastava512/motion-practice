# Architectural Decision Records (ADR) — Showcase Domain

This document records the architectural decisions, design guidelines, and UX paradigms governing the Motion Lab showcase platform in `src/components/showcase/`.

---

## Index

- [[[ADR-SHOWCASE-01]] Centralized Motion Lab Stage Architecture & Persistent Sticky Navigation Trio](#adr-showcase-01-centralized-motion-lab-stage-architecture--persistent-sticky-navigation-trio)
- [[[ADR-SHOWCASE-02]] Constant Studio Dark Exhibition Canvas & Apple Design Restraint](#adr-showcase-02-constant-studio-dark-exhibition-canvas--apple-design-restraint)
- [[[ADR-SHOWCASE-03]] Non-Destructive Demo Wrappers with Interactive Parameter Controls](#adr-showcase-03-non-destructive-demo-wrappers-with-interactive-parameter-controls)
- [[[ADR-SHOWCASE-04]] Declarative Showcase Registry & Day-Based Catalog Schema](#adr-showcase-04-declarative-showcase-registry--day-based-catalog-schema)
- [[[ADR-SHOWCASE-05]] Adaptive Split-View Architecture (Docked Inline vs Slide-Over Drawer for Tablet/Mobile)](#adr-showcase-05-adaptive-split-view-architecture-docked-inline-vs-slide-over-drawer-for-tabletmobile)

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

---

### [[ADR-SHOWCASE-05]] Adaptive Split-View Architecture (Docked Inline vs Slide-Over Drawer for Tablet/Mobile)

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC` & `USER_DIRECTIVE`
- **Origin**: `USER_DIRECTIVE`

#### Context / Problem
On desktop viewports ($ \ge 1024\text{px} $), having the navigation sidebar permanently docked beside the stage canvas provides immediate day-by-day catalog exploration. However, on tablet devices ($768\text{px} - 1024\text{px}$) and mobile screens ($< 768\text{px}$), maintaining a fixed 320px column consumes between 40% and 85% of the total screen width, severely cramping the stage canvas and clipping large animated layouts like `ShuffleGrid`.

#### Decision / Solution
Implemented a dual-mode adaptive split-view layout in `ShowcaseShell.tsx`:
1. **Desktop Split View ($ \ge 1024\text{px} $)**:
   - Sidebar renders inline in the layout document flow.
   - Smooth horizontal spring collapse/expand via `AnimatePresence` with `width: 0` / `width: auto` (`bounce: 0, duration: 0.28`). Collapsing the sidebar lets the stage seamlessly expand to 100% of the desktop screen width.
2. **Tablet & Mobile Slide-Over Drawer ($ < 1024\text{px} $)**:
   - Sidebar collapses into an off-canvas drawer (`fixed inset-y-0 left-0 z-50 max-w-[85vw] w-80`) with Apple-style frosted scrim backdrop (`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm`).
   - Drawer animates via critically damped spring transition (`x: "-100%"` to `x: 0`, `bounce: 0, duration: 0.32`).
   - Selecting any demo item or tapping the scrim automatically dismisses the drawer, returning full touch focus to the active interactive stage.
   - Features a dedicated dismiss `X` button in drawer mode for clear touch feedback.
3. **Toggle Controls & Accessibility**:
   - `PanelLeft` icon button in `ShowcaseHeader` with descriptive tooltip title.
   - Global keyboard accelerator: `Ctrl+\` or `Cmd+\` to quickly toggle sidebar state.
   - Stage canvas padding dynamically adapts (`p-2.5 sm:p-5 lg:p-8`) to prevent wasted space on tablet portrait and mobile viewports.

