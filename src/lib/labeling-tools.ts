/**
 * Per-modality labeling-tool grids for the "Packed with advanced labeling
 * tools" section on the labeling feature pages. Kept in sync with the product's
 * toolbar (app.cvp.run `constants/annotationTools.ts` → EDITOR_KIND_TOOLS):
 * same icons, same shortcut letters, same order. Names and one-line
 * descriptions live in translations under `labelingTools.tools.<id>`; only the
 * icon, shortcut, and AI flag are structural and live here.
 *
 * Select / pan / comment are intentionally omitted — this grid is about the
 * drawing and AI tools, not scene navigation.
 */
import {
  Bone,
  Box,
  BoxSelect,
  Brush,
  Circle,
  CircleDot,
  Diamond,
  Eraser,
  Hexagon,
  Lasso,
  Locate,
  Pentagon,
  PersonStanding,
  Ruler,
  Spline,
  Square,
  Wand2,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';

/** A single tool card. `id` keys into `labelingTools.tools.<id>` for the
 * localized name and description; `ai` badges the AI-assisted tools. */
export type LabelingTool = {
  id: string;
  icon: LucideIcon;
  shortcut: string;
  ai?: boolean;
};

/** Slugs that carry a tool grid (the three labeling editors). */
export type ToolSlug = 'images' | 'videos' | 'pointClouds';

const IMAGE_TOOLS: readonly LabelingTool[] = [
  {id: 'rectangle', icon: Square, shortcut: 'R'},
  {id: 'rotatedRectangle', icon: Diamond, shortcut: 'O'},
  {id: 'ellipse', icon: Circle, shortcut: 'E'},
  {id: 'polygon', icon: Pentagon, shortcut: 'G'},
  {id: 'polyline', icon: Spline, shortcut: 'L'},
  {id: 'point', icon: CircleDot, shortcut: 'P'},
  {id: 'keypoint', icon: PersonStanding, shortcut: 'K'},
  {id: 'brush', icon: Brush, shortcut: 'B'},
  {id: 'eraser', icon: Eraser, shortcut: 'X'},
  {id: 'magicWand', icon: Wand2, shortcut: 'W', ai: true},
];

// Video shares every 2D drawing tool with images except the magic wand, which
// is image-only in the product.
const VIDEO_TOOLS: readonly LabelingTool[] = IMAGE_TOOLS.filter(
  t => t.id !== 'magicWand',
);

const POINT_CLOUD_TOOLS: readonly LabelingTool[] = [
  {id: 'cuboid', icon: Box, shortcut: 'B'},
  {id: 'point3d', icon: Locate, shortcut: 'I'},
  {id: 'polyline3d', icon: Waypoints, shortcut: 'L'},
  {id: 'polygon3d', icon: Hexagon, shortcut: 'P'},
  {id: 'keypoint3d', icon: Bone, shortcut: 'K'},
  {id: 'segmentLasso', icon: Lasso, shortcut: 'G'},
  {id: 'segmentRect', icon: BoxSelect, shortcut: 'X'},
  {id: 'dimension', icon: Ruler, shortcut: 'D'},
];

export const LABELING_TOOLS: Record<ToolSlug, readonly LabelingTool[]> = {
  images: IMAGE_TOOLS,
  videos: VIDEO_TOOLS,
  pointClouds: POINT_CLOUD_TOOLS,
};

/** The tool grid for a feature slug, or null for non-labeling pages. */
export function getLabelingTools(slug: string): readonly LabelingTool[] | null {
  return slug in LABELING_TOOLS ? LABELING_TOOLS[slug as ToolSlug] : null;
}
