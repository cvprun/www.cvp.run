import {
  Aperture,
  Barcode,
  Binary,
  Box,
  Braces,
  Calculator,
  Camera,
  Crosshair,
  Focus,
  Globe,
  KeyRound,
  ScanLine,
  Search,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import type {Translations} from '@/lib/translations';

type AppItemKey = keyof Translations['mocks']['apps']['items'];
type CategoryKey = 'categoryOptics' | 'categoryVision' | 'categoryDev';

const APP_ITEMS: {key: AppItemKey; icon: LucideIcon; category: CategoryKey}[] = [
  {key: 'fov', icon: Camera, category: 'categoryOptics'},
  {key: 'lensPicker', icon: Aperture, category: 'categoryOptics'},
  {key: 'dof', icon: Focus, category: 'categoryOptics'},
  {key: 'calibrate', icon: Crosshair, category: 'categoryVision'},
  {key: 'undistort', icon: ScanLine, category: 'categoryVision'},
  {key: 'barcode', icon: Barcode, category: 'categoryVision'},
  {key: 'modeler', icon: Box, category: 'categoryVision'},
  {key: 'httpClient', icon: Globe, category: 'categoryDev'},
  {key: 'jsonFormatter', icon: Braces, category: 'categoryDev'},
  {key: 'jwtViewer', icon: KeyRound, category: 'categoryDev'},
  {key: 'hexEditor', icon: Binary, category: 'categoryDev'},
  {key: 'calculator', icon: Calculator, category: 'categoryDev'},
];

export function MockAppsGallery() {
  const {t} = useLanguage();
  const m = t.mocks.apps;

  return (
    <MockAppFrame activeNav="apps">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
        <span className="flex h-8 w-44 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[11px] text-muted-foreground">
          <Search className="size-3" />
          {m.searchPlaceholder}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {APP_ITEMS.map(({key, icon: Icon, category}) => (
          <div
            key={key}
            className="rounded-md border border-border bg-card p-3 transition-colors"
          >
            <span className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/40">
              <Icon className="size-4 text-muted-foreground" />
            </span>
            <span className="mt-2 block truncate text-[12px] font-medium">
              {m.items[key]}
            </span>
            <span className="mt-0.5 block text-[10px] text-muted-foreground">
              {m[category]}
            </span>
          </div>
        ))}
      </div>
    </MockAppFrame>
  );
}
