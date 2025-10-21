import {Eye, Play, Zap, Code, Puzzle, Layers} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Visual Processing',
    description:
      'Advanced computer vision algorithms for image and video processing with real-time analysis capabilities.',
  },
  {
    icon: Play,
    title: 'Interactive Player',
    description:
      'Built-in media player with frame-by-frame navigation, annotation tools, and visualization overlays.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description:
      'Optimized for speed with GPU acceleration, multi-threading, and efficient memory management.',
  },
  {
    icon: Code,
    title: 'Python Native',
    description:
      'Pure Python implementation with familiar APIs, seamless integration with NumPy, OpenCV, and scikit-learn.',
  },
  {
    icon: Puzzle,
    title: 'Modular Design',
    description:
      'Flexible architecture allowing you to use individual components or the complete processing pipeline.',
  },
  {
    icon: Layers,
    title: 'Extensible',
    description:
      'Plugin system for custom algorithms, filters, and processing modules to extend functionality.',
  },
];

export function Features() {
  return (
    <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-2">FEATURES</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need for computer vision
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CVP provides a comprehensive suite of tools for computer vision tasks, from
            basic image processing to advanced machine learning workflows.
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
