import Link from 'next/link';
import {Check, Github, Building2} from 'lucide-react';
import {Button} from '@/components/ui/button';

const freeTierFeatures = [
  'All 35+ features included',
  'Visual programming with Flow Mode',
  'FFmpeg video player',
  'ONVIF camera support',
  'Computer vision algorithms',
  'Community support',
  'Regular updates',
];

const enterpriseFeatures = [
  'Everything in Free',
  'Commercial use license',
  'Priority support',
  'Custom integrations',
  'SLA guarantees',
  'Dedicated account manager',
  'On-premise deployment',
];

export function PricingTiers() {
  return (
    <section className="container mx-auto pb-16 md:pb-24 lg:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Free Tier */}
          <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Github className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Free</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For personal and non-commercial use. Get started instantly from
                GitHub.
              </p>
            </div>

            <ul className="mb-8 space-y-3">
              {freeTierFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" variant="outline" size="lg" asChild>
              <Link
                href="https://github.com/cvprun/cvp"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Get from GitHub
              </Link>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Licensed under PolyForm Noncommercial License 1.0.0
            </p>
          </div>

          {/* Enterprise Tier */}
          <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Commercial Use
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Enterprise</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For commercial and enterprise use with dedicated support and
                custom solutions.
              </p>
            </div>

            <ul className="mb-8 space-y-3">
              {enterpriseFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" size="lg" asChild>
              <Link href="mailto:contact@cvp.run">Contact Sales</Link>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Custom commercial license agreement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
