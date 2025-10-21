import Link from 'next/link';
import {Download, Github} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function Hero() {
  return (
    <section className="container flex mx-auto flex-col items-center justify-center space-y-8 py-16 md:py-24 lg:py-32">
      {/* Badge */}
      <div className="flex items-center space-x-2 rounded-full border border-border bg-muted px-3 py-1 text-sm">
        <Github className="h-4 w-4" />
        <span>Open Source • MIT License</span>
      </div>

      {/* Main Heading */}
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <span>The open source</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Computer Vision Player
          </span>
        </h1>
      </div>

      {/* Subheading */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-lg text-muted-foreground sm:text-xl">
          A powerful, flexible computer vision tool that helps you process, analyze, and
          visualize visual data—all in one place.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="https://pypi.org/project/cvp/" target="_blank" rel="noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Install with pip
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="https://github.com/cvprun/cvp" target="_blank" rel="noreferrer">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </div>

      {/* Terminal Code Preview */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-muted-foreground font-mono">cvp-demo.py</span>
          </div>

          {/* Terminal Content */}
          <div className="p-4 bg-card">
            <pre className="text-sm font-mono text-card-foreground">
              <code>
                <span className="text-muted-foreground"># Install CVP</span>
                {'\n'}
                <span className="text-primary">$</span> pip install cvp
                {'\n\n'}
                <span className="text-muted-foreground"># Basic usage</span>
                {'\n'}
                <span className="text-blue-400">from</span> <span className="text-yellow-400">cvp</span> <span className="text-blue-400">import</span> <span className="text-yellow-400">Player</span>
                {'\n\n'}
                <span className="text-muted-foreground"># Create player instance</span>
                {'\n'}
                <span className="text-green-400">player</span> <span className="text-blue-400">=</span> <span className="text-yellow-400">Player</span><span className="text-white">()</span>
                {'\n\n'}
                <span className="text-muted-foreground"># Process your data</span>
                {'\n'}
                <span className="text-green-400">player</span><span className="text-white">.</span><span className="text-yellow-400">run</span><span className="text-white">()</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
