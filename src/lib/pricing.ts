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
  limits: {
    projects: number; // -1 = unlimited
    members: number;
    storageGb: number;
    apiCallsPerMonth: number;
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
      projects: 1,
      members: 2,
      storageGb: 0.5,
      apiCallsPerMonth: 1_000,
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
      projects: 3,
      members: 10,
      storageGb: 5,
      apiCallsPerMonth: 20_000,
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
      projects: 10,
      members: 30,
      storageGb: 10,
      apiCallsPerMonth: 100_000,
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
      projects: -1,
      members: -1,
      storageGb: -1,
      apiCallsPerMonth: -1,
      prioritySupport: true,
      auditLogs: true,
      customS3: true,
      sso: true,
    },
  },
] as const;

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
