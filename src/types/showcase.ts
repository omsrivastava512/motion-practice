// DECISION [TRIGGER: PRODUCT_SPEC] [ORIGIN: AI_AUTONOMOUS]:
// Defined strong typing for showcase items, day metadata, and categories
// to ensure seamless navigation and tag filtering.
// DECISION [TRIGGER: CODE_REVIEW] [ORIGIN: USER_DIRECTIVE]:
// User directive: removed multi-backdrop switching to maintain a single, constant Studio Dark backdrop.
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
