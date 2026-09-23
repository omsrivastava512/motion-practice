// Ref: [ADR-SHOWCASE-01] ShowcaseShell coordinating URL hash routing, keyboard shortcuts, and stage remounts.
import { useState, useEffect, useMemo } from "preact/hooks";
import { SHOWCASE_ITEMS } from "../../data/showcaseItems";
import type { CategoryId } from "../../types/showcase";
import { ShowcaseHeader } from "./ShowcaseHeader";
import { ShowcaseSidebar } from "./ShowcaseSidebar";
import { ShowcaseStage } from "./ShowcaseStage";

export const ShowcaseShell = () => {
  const [selectedId, setSelectedId] = useState<string>(() => {
    const hash = window.location.hash.replace("#", "");
    const found = SHOWCASE_ITEMS.find((item) => item.id === hash);
    return found ? found.id : SHOWCASE_ITEMS[0].id;
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [replayKey, setReplayKey] = useState<number>(0);

  // Filtered items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return SHOWCASE_ITEMS;
    return SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Ensure current selection is valid within filtered items, or fallback
  const activeItem = useMemo(() => {
    const found = SHOWCASE_ITEMS.find((item) => item.id === selectedId);
    if (found) return found;
    return SHOWCASE_ITEMS[0];
  }, [selectedId]);

  // Update hash when item changes
  const handleSelectItem = (id: string) => {
    setSelectedId(id);
    window.location.hash = id;
  };

  // Sync hash changes from back/forward browser navigation
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && SHOWCASE_ITEMS.some((i) => i.id === hash)) {
        setSelectedId(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Current item index inside filtered list for Prev/Next
  const currentIndexInFiltered = filteredItems.findIndex((i) => i.id === activeItem.id);
  const hasPrev = currentIndexInFiltered > 0;
  const hasNext = currentIndexInFiltered >= 0 && currentIndexInFiltered < filteredItems.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      handleSelectItem(filteredItems[currentIndexInFiltered - 1].id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      handleSelectItem(filteredItems[currentIndexInFiltered + 1].id);
    }
  };

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowLeft" || e.key === "[") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "]") {
        e.preventDefault();
        handleNext();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        handleReplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndexInFiltered, filteredItems]);

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-950 text-neutral-100 overflow-hidden font-sans select-text">
      {/* Top Header */}
      <ShowcaseHeader
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          // If active item not in new category, switch to first item of category
          const newFiltered = cat === "all" ? SHOWCASE_ITEMS : SHOWCASE_ITEMS.filter((i) => i.category === cat);
          if (newFiltered.length > 0 && !newFiltered.some((i) => i.id === selectedId)) {
            handleSelectItem(newFiltered[0].id);
          }
        }}
        currentTitle={activeItem.title}
        currentDay={activeItem.day}
        onReplayCurrent={handleReplay}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />

      {/* Main Workspace: Sidebar + Stage */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <ShowcaseSidebar
          items={filteredItems}
          selectedId={activeItem.id}
          onSelectItem={handleSelectItem}
        />

        <ShowcaseStage
          item={activeItem}
          replayKey={replayKey}
        />
      </div>
    </div>
  );
};

export default ShowcaseShell;
