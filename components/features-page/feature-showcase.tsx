import Image from 'next/image';

interface FeatureShowcaseProps {
  title: string;
  description: string;
  features: string[];
  screenshot: string;
  screenshotAlt: string;
  reverse?: boolean;
  priority?: boolean;
}

export function FeatureShowcase({
  title,
  description,
  features,
  screenshot,
  screenshotAlt,
  reverse = false,
  priority = false,
}: FeatureShowcaseProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
            reverse ? 'md:grid-flow-dense' : ''
          }`}
        >
          {/* Content */}
          <div className={reverse ? 'md:col-start-2' : ''}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">{description}</p>
            <ul className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshot */}
          <div className={reverse ? 'md:col-start-1 md:row-start-1' : ''}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border shadow-2xl">
              <Image
                src={screenshot}
                alt={screenshotAlt}
                fill
                className="object-cover"
                quality={90}
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
