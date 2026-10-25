/**
 * Icon per feature page, shared by the top-bar menus, footer-adjacent lists
 * and the landing page. Pages that map to an app sidebar menu use the same
 * lucide icon as `constants/projectSidebar.ts` in app.cvp.run. Kept out of
 * `site.ts` so the build plugin can import the registry without React.
 */
import {
  Activity,
  Box,
  BrainCircuit,
  Clapperboard,
  Code,
  Cpu,
  Cuboid,
  Database,
  GraduationCap,
  Images,
  LayoutGrid,
  Map,
  MemoryStick,
  MessageSquareText,
  Mic,
  Package,
  Plug,
  Radar,
  Signature,
  Sparkles,
  Store,
  Table2,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import type {FeatureSlug} from '@/lib/site';

export const PAGE_ICONS: Record<FeatureSlug, LucideIcon> = {
  images: Images,
  videos: Video,
  pointClouds: Box,
  timeSeries: Activity,
  datasets: Database,
  training: GraduationCap,
  inference: Sparkles,
  mlops: BrainCircuit,
  review: MessageSquareText,
  collaboration: Users,
  developers: Code,
  agents: Cpu,
  collectors: Radar,
  modbus: Plug,
  twin: Cuboid,
  memory: MemoryStick,
  media: Clapperboard,
  grids: Table2,
  meetings: Mic,
  signatures: Signature,
  maps: Map,
  store: Store,
  graphs: Workflow,
  registry: Package,
  apps: LayoutGrid,
};
