# Architectural Decision Records (ADR) — Motion Components & Primitives

This document records the architectural decisions, animation physics patterns, and interface conventions across practice components in `src/components/` (Basics, Gestures, Keyframes, and Exits).

---

## Index

- [[[ADR-COMP-01]] Variant Orchestration & Cascading Staggered Entrances (`NotificationFeed`, `Menu`)](#adr-comp-01-variant-orchestration--cascading-staggered-entrances-notificationfeed-menu)
- [[[ADR-COMP-02]] Imperative Form Validation Shakes via `useAnimationControls` (`LoginForm`)](#adr-comp-02-imperative-form-validation-shakes-via-useanimationcontrols-loginform)
- [[[ADR-COMP-03]] Element Exit Lifecycles & Dynamic Directional Unmounting via `AnimatePresence` (`SimpleExit`, `DirectionalExit`, `ToastNotification`)](#adr-comp-03-element-exit-lifecycles--dynamic-directional-unmounting-via-animatepresence-simpleexit-directionalexit-toastnotification)
- [[[ADR-COMP-04]] Apple-Grade Tactile Micro-Interactions & Damped Spring Feedback (`Basics`, `BasketBall`, `Generic`, `BeatingHeart`)](#adr-comp-04-apple-grade-tactile-micro-interactions--damped-spring-feedback-basics-basketball-generic-beatingheart)

---

### [[ADR-COMP-01]] Variant Orchestration & Cascading Staggered Entrances (`NotificationFeed`, `Menu`)

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC` & `CODE_REVIEW`
- **Origin**: `USER_DIRECTIVE`

#### Context / Problem
In `NotificationFeed.tsx` and `Menu.tsx`, child items must enter sequentially without requiring manual delay calculations on each child. Previously, `NotificationFeed` was hardcoded to `absolute ml-120 mt-50`, preventing it from centering cleanly within exhibition stages.

#### Decision / Solution
1. **Parent-Child Variant Propagation**: Configured parent containers with `variants={feedVariants}` (`hidden` / `visible`) and `staggerChildren: 0.1`–`0.15s` with `when: "beforeChildren"`. Child items inherit parent state transitions automatically.
2. **Spring Damping**: Damped spring physics (`stiffness: 100`, `damping: 12`) on child items create natural, non-oscillating arrivals.
3. **Stage Flexibility**: Added an optional `className?: string` prop allowing `NotificationFeed` to be placed anywhere in the layout hierarchy without hardcoded absolute offsets.
4. **Visual Restraint**: Styled items as translucent floating pills (`bg-neutral-900/90`, `border-neutral-800`, `rounded-xl`) replacing raw neutral-400 rectangles.

---

### [[ADR-COMP-02]] Imperative Form Validation Shakes via `useAnimationControls` (`LoginForm`)

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC` & `CODE_REVIEW`
- **Origin**: `USER_DIRECTIVE`

#### Context / Problem
Declarative animations (`animate={{ ... }}`) are ideal for continuous or state-driven views, but temporary error feedback (e.g. an incorrect password shake) requires imperative triggering that plays once upon an event and resets without modifying external state.

#### Decision / Solution
1. **Imperative Animation Controller**: Implemented `useAnimationControls` attached to the password input (`animate={controls}`).
2. **Multi-Keyframe Sequence**: On invalid password submission (anything other than `"sumi"`), invoked:
   ```ts
   controls.start({
     x: [0, -10, 10, -10, 10, 0],
     transition: { duration: 0.4, ease: "easeInOut" }
   });
   ```
3. **Form Aesthetics**: Replaced crude `outline-1` and raw borders with an Apple-style dark card (`rounded-xl`, `bg-neutral-900`, `border-neutral-800`) and recessed input styling (`bg-neutral-950`).

---

### [[ADR-COMP-03]] Element Exit Lifecycles & Dynamic Directional Unmounting via `AnimatePresence` (`SimpleExit`, `DirectionalExit`, `ToastNotification`)

- **Status**: Implemented
- **Trigger**: `PRODUCT_SPEC`, `TECH_DEBT`, `CODE_REVIEW`
- **Origin**: `AI_AUTONOMOUS` & `USER_DIRECTIVE`

#### Context / Problem
In standard React/Preact, unmounting a component immediately removes it from the DOM, aborting any exit transitions. Directional throws and notification stacks require the exiting element to remain in the DOM until its exit animation completes. Additionally, `ToastNotification` was using the legacy `framer-motion` import instead of `motion/react`.

#### Decision / Solution
1. **AnimatePresence Lifecycle**: Wrapped dismissible components (`KillSquare`, `ThrowSquare`, `Toast`) in `<AnimatePresence>` to defer DOM removal until `exit` variants resolve.
2. **Dynamic Directional Parameters**: In `DirectionalExit.tsx`, passed dynamic direction parameters via `custom={direction}` (`"up"` or `"down"`) to calculate exit vectors ($y = -200$ or $+200$) before unmounting.
3. **Lock Gate**: Introduced an animation lock (`setLocked(true)`) released via `onAnimationComplete={() => setLocked(false)}` to prevent race conditions during rapid user clicks.
4. **Import Standardization**: Replaced legacy `framer-motion` imports with `motion/react` across all exit components.
5. **Apple-Style Toast Cards**: Upgraded toasts from raw `bg-gray-200` to floating dark banners (`bg-neutral-900/95`, `border-neutral-800`, `rounded-xl`, `backdrop-blur-md`).

---

### [[ADR-COMP-04]] Apple-Grade Tactile Micro-Interactions & Damped Spring Feedback (`Basics`, `BasketBall`, `Generic`, `BeatingHeart`)

- **Status**: Implemented
- **Trigger**: `CODE_REVIEW` & `RUNTIME_BUG`
- **Origin**: `USER_DIRECTIVE` & `AI_AUTONOMOUS`

#### Context / Problem
Early practice exercises featured unstyled cards, broken relative asset import paths (e.g. `heart.png`, `nature.png`, `arrow-down.webp` referencing missing parent directories), and lacked tactile feedback on touch/press.

#### Decision / Solution
1. **Asset Path Resolution**: Corrected all relative image imports to point accurately to `src/assets/`.
2. **Critically Damped Springs**: Tuned basketball bounce variants to compare Z-axis scaling (`hover: { scale: 1.25 }, tap: { scale: 0.8 }`) against Y-axis displacement (`tap: { y: -50, scale: 1.2 }`) with critically damped springs (`stiffness: 400, damping: 15`).
3. **Tactile Button Press**: Added Apple-style instant pointer-down scale feedback (`active:scale-[0.98]`, `active:scale-95`) across buttons, cards, and the interactive beating heart.
4. **Optical Letter Tracking**: Applied tight optical letter-spacing (`tracking-[-0.02em]`) on display headings in `Basics.tsx` and unified typography with the system font stack.
