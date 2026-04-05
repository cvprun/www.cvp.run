export function FeatureHero() {
  return (
    <section className="container flex mx-auto flex-col items-center justify-center space-y-6 py-16 md:py-24 lg:py-32">
      <div className="flex items-center space-x-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
        <span className="font-mono text-xs">v0.0.3</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">35+ Specialized Tools</span>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Comprehensive Computer Vision Toolkit
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
          CVP combines computer vision capabilities, visual programming tools, media
          playback, and desktop GUI components into a unified platform. Built with
          Python 3.12+, featuring hardware-accelerated rendering and over 80 specialized
          modules.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">PyGame CE</span>
          <span>•</span>
          <span className="font-semibold text-foreground">Dear ImGui</span>
          <span>•</span>
          <span className="font-semibold text-foreground">OpenGL</span>
          <span>•</span>
          <span className="font-semibold text-foreground">FFmpeg</span>
          <span>•</span>
          <span className="font-semibold text-foreground">OpenCV</span>
        </div>
      </div>
    </section>
  );
}
