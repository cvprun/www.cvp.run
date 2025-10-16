import { Button } from "@/components/ui/button"
import { Github, BookOpen } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-balance">
            Get started for free today
          </h2>
          <p className="text-lg text-muted-foreground mb-10 text-balance leading-relaxed">
            Open source and MIT licensed. Start building computer vision applications in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="https://github.com/cvprun/cvp" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                Get Started
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/cvprun/cvp#readme" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-5 w-5 mr-2" />
                Read Documentation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
