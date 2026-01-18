import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {
  Network,
  Wifi,
  Radio,
  Video,
  MessageSquare,
  Database,
  Hash,
  Binary,
  CaseSensitive,
  Settings,
  FileText,
  Activity,
  Server,
  FolderTree,
  Play,
  Image as ImageIcon,
  Folder,
  Eye,
  Camera,
  QrCode,
  Calendar,
  Download,
  Clock,
  FileJson,
  Database as DataIcon,
  FileSearch,
  FileType,
  Gamepad,
} from 'lucide-react';
import {FeatureHero} from '@/components/features-page/feature-hero';
import {ModesOverview} from '@/components/features-page/modes-overview';
import {FeatureShowcase} from '@/components/features-page/feature-showcase';
import {FeatureCategory} from '@/components/features-page/feature-category';
import {SettingsGallery} from '@/components/features-page/settings-gallery';
import {CTA} from '@/components/cta';
import {Footer} from '@/components/footer';
import {isValidLanguage, languages, type Language} from '@/lib/i18n';
import {getTranslations} from '@/lib/translations';

interface FeaturesPageProps {
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map((lang) => ({lang}));
}

export async function generateMetadata({params}: FeaturesPageProps): Promise<Metadata> {
  const {lang} = await params;
  const t = getTranslations(lang as Language);
  return {
    title: t.featuresPage.title,
    description: t.featuresPage.description,
  };
}

export default async function FeaturesPage({params}: FeaturesPageProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <>
      <main>
        {/* Hero Section */}
        <FeatureHero />

        {/* Core Modes Overview */}
        <ModesOverview />

        {/* Hero Feature: Flow Mode */}
        <FeatureShowcase
          title="Visual Programming Made Simple"
          description="Build complex computer vision workflows without writing code. CVP's Flow Mode provides a node-based visual programming environment with real-time execution, debugging, and over 30 built-in node types."
          features={[
            'Drag-and-drop node editor with automatic type checking',
            'Real-time execution with step-by-step debugging',
            'Mathematical, comparison, and computer vision operations',
            'Undo/redo with unlimited history',
            'Export and share workflows as JSON',
          ]}
          screenshot="/screenshots/cvp-flow.png"
          screenshotAlt="Visual programming interface with node-based flow editor showing connected nodes for data processing"
          priority={true}
        />

        {/* Hero Feature: Image Processing */}
        <div className="bg-muted/30">
          <FeatureShowcase
            title="Advanced Image Processing & Analysis"
            description="Professional-grade image inspection and computer vision tools. Examine image properties, analyze color channels, extract metadata, and perform sophisticated image processing operations with an intuitive interface."
            features={[
              'Multi-channel image analysis with histogram visualization',
              'Real-time image property inspection and metadata extraction',
              'Advanced color space conversion and manipulation',
              'High-resolution image viewing with zoom and pan controls',
              'Support for multiple image formats via PIL integration',
            ]}
            screenshot="/screenshots/cvp-image-inspection.png"
            screenshotAlt="Image inspection interface showing detailed image analysis with histograms and property panels"
            reverse={true}
          />
        </div>

        {/* Hero Feature: FFmpeg Player */}
        <FeatureShowcase
          title="Professional Media Player"
          description="Full-featured video player powered by FFmpeg with network streaming support. Play local files, stream from network sources, and control playback with frame-perfect precision."
          features={[
            'FFmpeg backend with comprehensive codec support',
            'Network streaming (RTSP, HTTP, HLS) capabilities',
            'Frame-by-frame navigation and playback control',
            'Real-time performance monitoring',
            'Hardware acceleration support (VAAPI, QSV)',
          ]}
          screenshot="/screenshots/cvp-ffmpeg-pipe-player.png"
          screenshotAlt="FFmpeg video player interface showing video playback with controls and stream information"
        />

        {/* Network & Connectivity Category */}
        <FeatureCategory
          title="Network & Connectivity"
          description="Comprehensive networking tools for IP camera management, device discovery, and network analysis."
          background="muted"
          features={[
            {
              icon: Network,
              title: 'ONVIF Camera Control',
              description:
                'Complete IP camera management with PTZ control, stream configuration, and device discovery. Support for ONVIF-compliant cameras with real-time video streaming.',
              screenshot: '/screenshots/cvp-onvif.png',
              screenshotAlt:
                'ONVIF interface showing IP camera controls and configuration options',
            },
            {
              icon: Wifi,
              title: 'WS-Discovery',
              description:
                'Automatic network device discovery and enumeration. Find ONVIF cameras, network services, and compatible devices on your local network.',
              screenshot: '/screenshots/cvp-wsdiscovery.png',
              screenshotAlt:
                'Network discovery interface displaying found devices and services',
            },
            {
              icon: Radio,
              title: 'Socket Mapping & Visualization',
              description:
                'Network socket mapping, connection analysis, and real-time monitoring. Visualize network connections and debug socket-level communications.',
              screenshot: '/screenshots/cvp-socket-mapping-discovery.png',
              screenshotAlt:
                'Socket mapping visualization showing network connections and ports',
            },
            {
              icon: Video,
              title: 'MediaMTX Streaming',
              description:
                'Configure and manage MediaMTX streaming server for HLS and RTSP streams. Set up streaming workflows with real-time preview and monitoring.',
              screenshot: '/screenshots/cvp-ffmpeg-pipe-stream.png',
              screenshotAlt:
                'MediaMTX streaming configuration interface with server settings',
            },
          ]}
        />

        {/* Development Tools Category */}
        <FeatureCategory
          title="Development & Testing Tools"
          description="Powerful utilities for developers including AI chat integration, test data generation, and code analysis tools."
          features={[
            {
              icon: MessageSquare,
              title: 'Ollama AI Chat',
              description:
                'Integrated AI chat interface powered by Ollama. Run local language models for code assistance, documentation, and general queries.',
              screenshot: '/screenshots/cvp-ollama-chat.png',
              screenshotAlt:
                'AI chat interface showing conversation with Ollama language model',
            },
            {
              icon: Database,
              title: 'Test Data Generator',
              description:
                'Generate realistic test data using the Faker library. Create names, addresses, emails, and custom datasets for testing and development.',
              screenshot: '/screenshots/cvp-faker.png',
              screenshotAlt:
                'Test data generator interface with faker library options',
            },
            {
              icon: Hash,
              title: 'Hash Functions & Verification',
              description:
                'Calculate and verify file hashes using multiple algorithms (MD5, SHA-1, SHA-256, SHA-512). Ensure file integrity and security.',
              screenshot: '/screenshots/cvp-hash-functions.png',
              screenshotAlt: 'Hash calculator showing multiple hash algorithms',
            },
            {
              icon: Binary,
              title: 'Binary to Text Analysis',
              description:
                'Binary file inspection and analysis tools. Convert binary data to text, examine file structures, and debug binary formats.',
              screenshot: '/screenshots/cvp-binary-to-text.png',
              screenshotAlt:
                'Binary analysis interface showing hexadecimal and text representations',
            },
            {
              icon: CaseSensitive,
              title: 'Case Converter',
              description:
                'Text transformation utilities for various case formats. Convert between camelCase, snake_case, PascalCase, kebab-case, and more.',
              screenshot: '/screenshots/cvp-case-converter.png',
              screenshotAlt:
                'Case converter showing different text formatting options',
            },
            {
              icon: Settings,
              title: 'Environment Variables Manager',
              description:
                'View, edit, and manage system environment variables. Configure application settings and system paths with a user-friendly interface.',
              screenshot: '/screenshots/cvp-environment-variables.png',
              screenshotAlt:
                'Environment variables interface showing system configuration',
            },
            {
              icon: FileType,
              title: 'TTF Property Browser',
              description:
                'Explore TrueType font properties and metadata. Preview glyphs, examine font metrics, and analyze font files in detail.',
              screenshot: '/screenshots/cvp-ttf-property-browser.png',
              screenshotAlt:
                'Font property browser displaying TrueType font information',
            },
          ]}
        />

        {/* System Tools Category */}
        <div className="bg-muted/30">
          <FeatureCategory
            title="System Monitoring & Management"
            description="Real-time system monitoring, process management, and service control for comprehensive system oversight."
            features={[
              {
                icon: Activity,
                title: 'Process Monitor (psutil)',
                description:
                  'Comprehensive system process monitoring with CPU, memory, and disk usage. Real-time performance tracking and resource analysis.',
                screenshot: '/screenshots/cvp-psutil.png',
                screenshotAlt:
                  'Process monitor showing system resource usage and running processes',
              },
              {
                icon: Server,
                title: 'Service Manager',
                description:
                  'System service monitoring and control. Start, stop, and configure system services with status tracking and dependency management.',
                screenshot: '/screenshots/cvp-service-manager.png',
                screenshotAlt:
                  'Service manager interface showing system services and their status',
              },
              {
                icon: FolderTree,
                title: 'OS Directories Explorer',
                description:
                  'Navigate and manage operating system directories. Quick access to system folders, configuration directories, and application data.',
                screenshot: '/screenshots/cvp-os-directories.png',
                screenshotAlt:
                  'OS directories explorer showing system folder structure',
              },
            ]}
          />
        </div>

        {/* Media & Multimedia Category (text only) */}
        <FeatureCategory
          title="Media & Multimedia"
          description="Complete multimedia toolkit for video playback, image viewing, and media management."
          features={[
            {
              icon: Play,
              title: 'Video Player',
              description:
                'Full-featured video player with FFmpeg backend. Support for all major video formats, network streaming, and hardware acceleration.',
            },
            {
              icon: ImageIcon,
              title: 'Image Viewer',
              description:
                'Advanced image viewer with PIL integration. Zoom, pan, rotate, and perform basic image operations with a responsive interface.',
            },
            {
              icon: Folder,
              title: 'Media Manager',
              description:
                'Organize and manage media files. Configure stream sources, view media information, and manage multimedia assets efficiently.',
            },
          ]}
        />

        {/* Computer Vision & AI Category (text only) */}
        <div className="bg-muted/30">
          <FeatureCategory
            title="Computer Vision & AI"
            description="Advanced computer vision algorithms and AI-powered tools for image processing and analysis."
            features={[
              {
                icon: Eye,
                title: 'Object Tracker',
                description:
                  'Real-time object tracking with multiple tracking algorithms. Track objects across video frames with high accuracy and performance.',
              },
              {
                icon: Camera,
                title: 'Camera Calibration',
                description:
                  'Professional camera and sensor calibration tools. Calculate intrinsic and extrinsic parameters for precise computer vision applications.',
              },
              {
                icon: ImageIcon,
                title: 'Image Stitching',
                description:
                  'Create panoramic images with advanced stitching algorithms. Support for multiple feature detectors (SURF, ORB, SIFT) and blending methods.',
              },
              {
                icon: QrCode,
                title: 'QR Code Tools',
                description:
                  'Generate and scan QR codes. Create custom QR codes with various error correction levels and decode QR codes from images or camera.',
              },
            ]}
          />
        </div>

        {/* Utilities Category (text only) */}
        <FeatureCategory
          title="Utilities & Tools"
          description="Essential utilities for task automation, file management, and system administration."
          features={[
            {
              icon: Calendar,
              title: 'Scheduler',
              description:
                'Task scheduling and automation. Create cron-like scheduled tasks, set up recurring operations, and manage automated workflows.',
            },
            {
              icon: Download,
              title: 'File Downloader',
              description:
                'Multi-threaded download manager with resume support. Download files efficiently with progress tracking and automatic retry.',
            },
            {
              icon: Clock,
              title: 'Timezone Tools',
              description:
                'Time zone utilities and conversion. Convert between time zones, schedule across regions, and manage time-sensitive operations.',
            },
            {
              icon: FileJson,
              title: 'Swagger Interface',
              description:
                'API documentation and testing. Interact with REST APIs, test endpoints, and generate API documentation with Swagger UI.',
            },
            {
              icon: DataIcon,
              title: 'Dataset Manager',
              description:
                'Organize and manage datasets for machine learning and computer vision projects. Import, export, and version control your data.',
            },
            {
              icon: FileSearch,
              title: 'File Watcher',
              description:
                'Real-time file system monitoring. Watch directories for changes, trigger actions on file events, and automate file-based workflows.',
            },
            {
              icon: FileText,
              title: 'File Tail',
              description:
                'Real-time file content monitoring. Follow log files and text files in real-time with automatic scrolling and filtering.',
            },
            {
              icon: Gamepad,
              title: 'Entertainment',
              description:
                'Built-in games including Tetris and Minidun dungeon explorer. Take a break with classic games while CVP runs in the background.',
            },
          ]}
        />

        {/* Settings Gallery */}
        <SettingsGallery />

        {/* CTA Section */}
        <CTA lang={lang as Language} />
      </main>
      <Footer lang={lang as Language} />
    </>
  );
}
