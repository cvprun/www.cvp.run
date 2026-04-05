import {Monitor, Workflow, Activity, Beaker} from 'lucide-react';

const modes = [
  {
    icon: Monitor,
    title: 'Player Mode',
    command: 'cvp player',
    description:
      'Desktop GUI application with 35+ specialized tools for multimedia processing, visual programming, and computer vision workflows.',
  },
  {
    icon: Workflow,
    title: 'Worker Mode',
    command: 'cvp worker',
    description:
      'Node-based visual programming environment for creating and executing computational workflows with real-time debugging.',
  },
  {
    icon: Activity,
    title: 'Agent Mode',
    command: 'cvp agent',
    description:
      'Background service mode designed for future background processing capabilities and automated tasks.',
  },
  {
    icon: Beaker,
    title: 'Tester Mode',
    command: 'cvp tester',
    description:
      'Configuration and feature testing mode for validating system setup, OpenGL capabilities, and hardware acceleration.',
  },
];

export function ModesOverview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">APPLICATION MODES</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Four Ways to Use CVP
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            CVP operates through four primary application modes, each designed for
            specific use cases and workflows.
          </p>
        </div>

        {/* Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modes.map((mode, index) => (
            <div
              key={index}
              className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <mode.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{mode.title}</h3>
                <code className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {mode.command}
                </code>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {mode.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
