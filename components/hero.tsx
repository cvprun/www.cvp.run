import { Button } from "@/components/ui/button"
import { Github, Download } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <Github className="h-4 w-4" />
            <span>Open Source • MIT License</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            The open source
            <br />
            <span className="text-foreground">Computer Vision Player</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-10 max-w-2xl mx-auto leading-relaxed">
            A powerful, flexible computer vision tool that helps you process, analyze, and visualize visual data—all in
            one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Button size="lg" asChild>
              <a href="https://github.com/cvprun/cvp" target="_blank" rel="noopener noreferrer">
                <Download className="h-5 w-5 mr-2" />
                Install with pip
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/cvprun/cvp" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">Free and open source forever</p>
        </div>

        <div className="mt-16 mx-auto max-w-5xl">
          <div className="rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">cvp-demo.py</span>
            </div>
            <div className="p-6 bg-card">
              <pre className="text-sm text-left overflow-x-auto">
                <code className="text-foreground font-mono">
                  {`# Install CVP
pip install cvp

# Import and use
from cvp import Player

# Create a player instance
player = Player()

# Process your computer vision tasks
player.run()`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
