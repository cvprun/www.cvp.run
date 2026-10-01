/**
 * Pricing single source of truth.
 *
 * Plan codes and limits mirror the app (`app.cvp.run/src/react-app/lib/plans.ts`
 * and `postgres/20-catalogs/03-plan_limits/70-datas.sql`). Prices are beta
 * placeholders until Paddle prices are finalized — update here only.
 */

export type PlanCode = 'free' | 'starter' | 'pro' | 'enterprise';

export type PlanDef = {
  code: PlanCode;
  /** USD per month. `null` = free or contact sales. */
  monthlyUsd: number | null;
  highlighted: boolean;
  /** `plan_limits` values; -1 = unlimited. */
  limits: {
    members: number;
    storageGb: number;
    apiCallsPerMonth: number;
    agentTrafficGb: number;
    graphNodeRunsPerMonth: number;
    wikiPages: number;
    gridRows: number;
    twinScenes: number;
    mlflowExperiments: number;
    licenseKeys: number;
    memoryMaps: number;
    mapFeatures: number;
    videoEncryption: boolean;
    prioritySupport: boolean;
    auditLogs: boolean;
    customS3: boolean;
    sso: boolean;
  };
};

export const PLANS: readonly PlanDef[] = [
  {
    code: 'free',
    monthlyUsd: null,
    highlighted: false,
    limits: {
      members: 2,
      storageGb: 0.5,
      apiCallsPerMonth: 1_000,
      agentTrafficGb: 1,
      graphNodeRunsPerMonth: 0,
      wikiPages: 20,
      gridRows: 1_000,
      twinScenes: 1,
      mlflowExperiments: 3,
      licenseKeys: 5,
      memoryMaps: 2,
      mapFeatures: 5_000,
      videoEncryption: false,
      prioritySupport: false,
      auditLogs: false,
      customS3: false,
      sso: false,
    },
  },
  {
    code: 'starter',
    monthlyUsd: 29,
    highlighted: false,
    limits: {
      members: 10,
      storageGb: 5,
      apiCallsPerMonth: 20_000,
      agentTrafficGb: 10,
      graphNodeRunsPerMonth: 10_000,
      wikiPages: 200,
      gridRows: 10_000,
      twinScenes: 5,
      mlflowExperiments: 20,
      licenseKeys: 100,
      memoryMaps: 10,
      mapFeatures: 50_000,
      videoEncryption: false,
      prioritySupport: false,
      auditLogs: false,
      customS3: false,
      sso: false,
    },
  },
  {
    code: 'pro',
    monthlyUsd: 99,
    highlighted: true,
    limits: {
      members: 30,
      storageGb: 10,
      apiCallsPerMonth: 100_000,
      agentTrafficGb: 50,
      graphNodeRunsPerMonth: 100_000,
      wikiPages: 1_000,
      gridRows: 100_000,
      twinScenes: 20,
      mlflowExperiments: 100,
      licenseKeys: 1_000,
      memoryMaps: 50,
      mapFeatures: 500_000,
      videoEncryption: true,
      prioritySupport: true,
      auditLogs: true,
      customS3: true,
      sso: false,
    },
  },
  {
    code: 'enterprise',
    monthlyUsd: null,
    highlighted: false,
    limits: {
      members: -1,
      storageGb: -1,
      apiCallsPerMonth: -1,
      agentTrafficGb: -1,
      graphNodeRunsPerMonth: -1,
      wikiPages: -1,
      gridRows: -1,
      twinScenes: -1,
      mlflowExperiments: -1,
      licenseKeys: -1,
      memoryMaps: -1,
      mapFeatures: -1,
      videoEncryption: true,
      prioritySupport: true,
      auditLogs: true,
      customS3: true,
      sso: true,
    },
  },
] as const;

/** Token packages (1 token = 1 US cent, per project). */
export const TOKEN_PACKAGES: readonly {usd: number; tokens: number}[] = [
  {usd: 10, tokens: 1_000},
  {usd: 50, tokens: 5_000},
  {usd: 100, tokens: 10_000},
  {usd: 500, tokens: 50_000},
];

export function formatLimit(value: number, unlimited: string): string {
  if (value === -1) {
    return unlimited;
  }
  return value.toLocaleString('en-US');
}

export function formatStorage(gb: number, unlimited: string): string {
  if (gb === -1) {
    return unlimited;
  }
  return gb < 1 ? `${Math.round(gb * 1000)}MB` : `${gb}GB`;
}
