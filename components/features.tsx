import { Card } from "@/components/ui/card"
import { Eye, Zap, Code, Layers, Play, Settings } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Visual Processing",
    description: "Advanced computer vision algorithms for real-time image and video processing.",
  },
  {
    icon: Play,
    title: "Interactive Player",
    description: "Built-in player interface for visualizing and controlling your CV pipelines.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for speed with efficient processing and minimal latency.",
  },
  {
    icon: Code,
    title: "Python Native",
    description: "Clean Python API that integrates seamlessly with your existing workflow.",
  },
  {
    icon: Layers,
    title: "Modular Design",
    description: "Flexible architecture that lets you build custom CV pipelines easily.",
  },
  {
    icon: Settings,
    title: "Extensible",
    description: "Plugin system for adding custom processors and filters to your pipeline.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold text-accent mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Computer Vision reimagined</h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Simple, powerful tools for processing visual data. Build CV applications faster with an intuitive API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
