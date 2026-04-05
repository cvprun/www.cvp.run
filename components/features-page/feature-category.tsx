import {LucideIcon} from 'lucide-react';

import {FeatureCard} from './feature-card';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  screenshot?: string;
  screenshotAlt?: string;
}

interface FeatureCategoryProps {
  title: string;
  description: string;
  features: Feature[];
  background?: 'default' | 'muted';
}

export function FeatureCategory({
  title,
  description,
  features,
  background = 'default',
}: FeatureCategoryProps) {
  return (
    <section
      className={`py-16 md:py-24 ${background === 'muted' ? 'bg-muted/30' : ''}`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              screenshot={feature.screenshot}
              screenshotAlt={feature.screenshotAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
