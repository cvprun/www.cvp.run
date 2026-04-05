'use client';

import {useState} from 'react';

import {ChevronDown} from 'lucide-react';
import Image from 'next/image';

const settingsScreenshots = [
  {
    title: 'Appearance',
    description: 'Customize themes, colors, and visual presets',
    image: '/screenshots/cvp-settings-appearance.png',
  },
  {
    title: 'FFmpeg Configuration',
    description: 'Configure multimedia processing settings',
    image: '/screenshots/cvp-settings-ffmpeg.png',
  },
  {
    title: 'Flow Settings',
    description: 'Visual programming workflow preferences',
    image: '/screenshots/cvp-settings-flow.png',
  },
  {
    title: 'Font Browser',
    description: 'Font loading, preview, and management',
    image: '/screenshots/cvp-settings-font-browser.png',
  },
  {
    title: 'Layout Manager',
    description: 'Customize docking window layouts',
    image: '/screenshots/cvp-settings-layout.png',
  },
  {
    title: 'Logging Configuration',
    description: 'Configure logging levels and output',
    image: '/screenshots/cvp-settings-logging.png',
  },
  {
    title: 'Ollama Integration',
    description: 'AI chat and LLM configuration',
    image: '/screenshots/cvp-settings-ollama.png',
  },
  {
    title: 'Supabase Setup',
    description: 'Database and backend configuration',
    image: '/screenshots/cvp-settings-supabase.png',
  },
  {
    title: 'Thread Monitoring',
    description: 'Performance and concurrency monitoring',
    image: '/screenshots/cvp-settings-thread-monitoring.png',
  },
  {
    title: 'Toast Notifications',
    description: 'Notification system preferences',
    image: '/screenshots/cvp-settings-toast.png',
  },
];

export function SettingsGallery() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Comprehensive Configuration Center
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            CVP includes a powerful preference center with extensive customization
            options for every aspect of the application. Configure themes, workflows,
            integrations, and system behavior to match your needs.
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border"
          >
            {isExpanded ? 'Hide' : 'View'} Settings Gallery
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Settings Grid */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {settingsScreenshots.map((setting, index) => (
              <div
                key={index}
                className="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border shadow-sm p-4 hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={setting.image}
                    alt={`${setting.title} settings interface`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{setting.title}</h3>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
