// DECISION [TRIGGER: PRODUCT_SPEC] [ORIGIN: AI_AUTONOMOUS]:
// Built an aesthetic header with brand identity and category filter pills.
// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// Removed backdrop selector per user directive: single constant Studio Dark stage.
// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_OVERRULED_AI]:
// Redesigned with Apple-inspired restraint: monochromatic palette, crisp geometry,
// and refined segmented controls.
// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// Moved navigation trio (Prev, Next, and Replay [↻ R]) to the sticky persistent header
// so controls remain permanently accessible even when the stage is scrolled.
import type { CategoryId } from "../../types/showcase";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface ShowcaseHeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  currentTitle: string;
  currentDay: number;
  onReplayCurrent: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "basics", label: "Basics" },
  { id: "variants", label: "Variants" },
  { id: "keyframes", label: "Keyframes" },
  { id: "imperative", label: "Imperative" },
  { id: "exits", label: "Exits" },
  { id: "layout", label: "Layout" },
];

export const ShowcaseHeader = ({
  activeCategory,
  onSelectCategory,
  currentTitle,
  currentDay,
  onReplayCurrent,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ShowcaseHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-xl px-5 py-2.5 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Brand & Active Day Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-md bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-neutral-300 font-mono text-[11px] font-bold">
              M
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-neutral-100">
                Motion Practice
              </span>
              <span className="text-neutral-600">/</span>
              <span className="text-xs font-mono text-neutral-400">
                Day {currentDay.toString().padStart(2, "0")}
              </span>
              <span className="text-xs text-neutral-500 hidden sm:inline truncate max-w-xs">
                — {currentTitle}
              </span>
            </div>
          </div>

          {/* Mobile Persistent Navigation Trio */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              title="Previous animation (or press Left Arrow)"
              disabled={!hasPrev}
              onClick={onPrev}
              className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-3.5" />
            </button>

            <button
              type="button"
              title="Replay active animation (or press 'R')"
              onClick={onReplayCurrent}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-colors active:scale-95 cursor-pointer"
            >
              <RotateCcw className="size-3 text-neutral-400" />
              <kbd className="text-[10px] font-mono text-neutral-400">R</kbd>
            </button>

            <button
              type="button"
              title="Next animation (or press Right Arrow)"
              disabled={!hasNext}
              onClick={onNext}
              className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Category Segmented Control */}
        <nav aria-label="Animation Categories" className="flex items-center bg-neutral-900/90 border border-neutral-800/90 p-0.5 rounded-lg overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                title={`Filter demos by ${cat.label}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer select-none ${
                  isActive
                    ? "text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategorySegment"
                    className="absolute inset-0 bg-neutral-800 border border-neutral-700/60 rounded-md shadow-sm"
                    transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Persistent Navigation Trio */}
        <div className="hidden md:flex items-center gap-1.5">
          <button
            type="button"
            title="Previous animation (or press Left Arrow / '[')"
            disabled={!hasPrev}
            onClick={onPrev}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            title="Replay active animation sequence from initial state (or press 'R')"
            onClick={onReplayCurrent}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-colors active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="size-3.5 text-neutral-400" />
            <kbd className="text-[11px] font-mono font-medium text-neutral-400">R</kbd>
          </button>

          <button
            type="button"
            title="Next animation (or press Right Arrow / ']')"
            disabled={!hasNext}
            onClick={onNext}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
