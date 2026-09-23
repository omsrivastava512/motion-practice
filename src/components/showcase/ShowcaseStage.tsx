// Ref: [ADR-SHOWCASE-01] [ADR-SHOWCASE-02] Isolated Studio Dark exhibition stage with AnimatePresence transitions.
import type { ShowcaseItem } from "../../types/showcase";
import { AnimatePresence, motion } from "motion/react";

interface ShowcaseStageProps {
  item: ShowcaseItem;
  replayKey: number;
}

export const ShowcaseStage = ({
  item,
  replayKey,
}: ShowcaseStageProps) => {
  const ComponentToRender = item.component;

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-neutral-950">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-3 my-auto">
        
        {/* Stage Header Info Bar (clean, informative) */}
        <div className="flex flex-col gap-1 bg-neutral-900/60 border border-neutral-800/80 rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-neutral-400">
              Day {item.day.toString().padStart(2, "0")}
            </span>
            <span className="text-neutral-600 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              {item.category}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-100 m-0">
            {item.title}
          </h2>
          <p className="text-xs text-neutral-400 m-0">
            {item.description}
          </p>
        </div>

        {/* The Clean Studio Canvas Stage */}
        <div
          className="relative min-h-[460px] md:min-h-[520px] w-full rounded-xl border border-neutral-800/90 bg-[#0e0e11] text-neutral-100 flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
        >
          {/* Active Demo Rendering with smooth critically damped spring / fade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${item.id}-${replayKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center"
            >
              <ComponentToRender />
            </motion.div>
          </AnimatePresence>

          {/* Understated Concept Tags at Bottom */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
            <div className="flex flex-wrap gap-1.5 pointer-events-auto">
              {item.highlightProps.map((prop) => (
                <span
                  key={prop}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900/80 text-neutral-400 border border-neutral-800/80"
                >
                  {prop}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};
