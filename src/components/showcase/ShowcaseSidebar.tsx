// Ref: [ADR-SHOWCASE-02] [ADR-SHOWCASE-04] Searchable day-grouped navigation sidebar with Apple-style quiet active states.
import { useState } from "preact/hooks";
import type { ShowcaseItem } from "../../types/showcase";
import { Search } from "lucide-react";
import { motion } from "motion/react";

interface ShowcaseSidebarProps {
  items: ShowcaseItem[];
  selectedId: string;
  onSelectItem: (id: string) => void;
}

export const ShowcaseSidebar = ({
  items,
  selectedId,
  onSelectItem,
}: ShowcaseSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      `day ${item.day}`.includes(query)
    );
  });

  return (
    <aside className="w-full md:w-72 lg:w-80 shrink-0 flex flex-col border-r border-neutral-800/80 bg-neutral-950/70 h-full overflow-hidden">
      {/* Search Input Bar */}
      <div className="p-3 border-b border-neutral-800/60">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 size-3.5 text-neutral-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search demos, tags, days..."
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              title="Clear search query"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-xs text-neutral-500 hover:text-neutral-300 cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Navigable Items Scroll Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {filteredItems.length === 0 ? (
          <div className="p-6 text-center text-xs text-neutral-500 font-mono">
            No demos found
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSelected = item.id === selectedId;

            return (
              <button
                key={item.id}
                type="button"
                title={`Open Day ${item.day}: ${item.title}`}
                onClick={() => onSelectItem(item.id)}
                className={`relative w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer group flex flex-col gap-1 select-none ${
                  isSelected
                    ? "text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
                }`}
              >
                {/* Active Indicator Layer */}
                {isSelected && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute inset-0 bg-neutral-800/70 border border-neutral-700/60 rounded-lg shadow-sm"
                    transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-200 font-semibold' : 'text-neutral-500'}`}>
                      Day {item.day.toString().padStart(2, "0")}
                    </span>
                    <h3 className="text-xs font-medium tracking-tight text-inherit m-0 truncate">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500">
                    {item.category}
                  </span>
                </div>

                <p className="relative z-10 text-[11px] text-neutral-400 line-clamp-1">
                  {item.subtitle}
                </p>
              </button>
            );
          })
        )}
      </div>

      {/* Keyboard navigation footer hint */}
      <div className="p-2.5 border-t border-neutral-850 text-[11px] text-neutral-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px]">
          <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
            →
          </kbd>
          <span className="text-neutral-500">navigate</span>
        </span>
        <span className="text-[10px] text-neutral-500 font-mono">
          {filteredItems.length} Demos
        </span>
      </div>
    </aside>
  );
};
