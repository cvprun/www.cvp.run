import {Eye, Play, Zap, Code, Puzzle, Layers} from 'lucide-react';
import {getTranslations} from '@/lib/translations';
import type {Language} from '@/lib/i18n';

const featureIcons = [Eye, Play, Zap, Code, Puzzle, Layers];

interface FeaturesProps {
  lang: Language;
}

export function Features({lang}: FeaturesProps) {
  const t = getTranslations(lang);
  const features = t.featuresSection.items.map((item, index) => ({
    icon: featureIcons[index],
    ...item,
  }));

  return (
    <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2">
            {t.featuresSection.label}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t.featuresSection.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.featuresSection.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
