// Ref: [ADR-SHOWCASE-04] [ADR-SHOWCASE-02] Strong typing for showcase catalog, category taxonomy, and constant Studio Dark stage.
import type { ComponentType } from "preact";

export type CategoryId = 
  | "all"
  | "basics"
  | "variants"
  | "keyframes"
  | "imperative"
  | "exits"
  | "layout";

export interface ShowcaseItem {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  category: CategoryId;
  tags: string[];
  description: string;
  highlightProps: string[];
  component: ComponentType<any>;
}
