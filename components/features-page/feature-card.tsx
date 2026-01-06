import Image from 'next/image';
import {LucideIcon} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  screenshot?: string;
  screenshotAlt?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  screenshot,
  screenshotAlt,
}: FeatureCardProps) {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border shadow-sm p-6 hover:shadow-lg transition-shadow">
      {screenshot && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
          <Image
            src={screenshot}
            alt={screenshotAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
