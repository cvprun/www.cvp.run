import type {Translations} from './translations';

export type ScreenKey =
  | 'dashboard'
  | 'graphs'
  | 'surveillance'
  | 'vision'
  | 'datasets'
  | 'mlflow'
  | 'agents'
  | 'manufacturing'
  | 'apps';

export type DetailKind = 'feature' | 'module';

/**
 * Maps each feature/module slug to the mockup screen it should display and the
 * sidebar navigation index that should appear active. Nav indices align with
 * `showcase.nav` in translations.ts (0=Dashboard … 10=Settings).
 */
export const SCREEN_META: Record<string, {screen: ScreenKey; activeNav: number}> = {
  // features
  'visual-programming': {screen: 'graphs', activeNav: 4},
  'realtime-streaming': {screen: 'surveillance', activeNav: 5},
  'vision-toolkit': {screen: 'vision', activeNav: 7},
  'vms-cctv': {screen: 'surveillance', activeNav: 5},
  'datasets-mlops': {screen: 'mlflow', activeNav: 8},
  extensible: {screen: 'apps', activeNav: 7},
  // modules
  vision: {screen: 'vision', activeNav: 7},
  vms: {screen: 'surveillance', activeNav: 5},
  manufacturing: {screen: 'manufacturing', activeNav: 6},
  datasets: {screen: 'datasets', activeNav: 3},
  graphs: {screen: 'graphs', activeNav: 4},
  mlflow: {screen: 'mlflow', activeNav: 8},
  agents: {screen: 'agents', activeNav: 2},
  apps: {screen: 'apps', activeNav: 7},
};

export type DetailItem = {
  slug: string;
  label: string;
  description: string;
  long: string;
  points: readonly string[];
};

export function getDetailItem(
  t: Translations,
  kind: DetailKind,
  slug: string | undefined,
): DetailItem | null {
  if (!slug) {
    return null;
  }
  if (kind === 'feature') {
    const item = t.features.items.find(i => i.slug === slug);
    return item
      ? {
          slug: item.slug,
          label: item.title,
          description: item.description,
          long: item.long,
          points: item.points,
        }
      : null;
  }
  const item = t.modules.items.find(i => i.slug === slug);
  return item
    ? {
        slug: item.slug,
        label: item.name,
        description: item.description,
        long: item.long,
        points: item.points,
      }
    : null;
}
