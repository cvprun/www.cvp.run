import Link from 'next/link';
import {Github} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl text-primary">CVP</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Computer Vision Player - An open source tool for processing, analyzing,
              and visualizing visual data.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cvprun/cvp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cvprun/cvp/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/cvprun/cvp/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cvprun/cvp/discussions"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/cvprun/cvp/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 CVP. MIT License.</p>
          <Link
            href="https://github.com/cvprun/cvp"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 sm:mt-0"
          >
            <Github className="h-4 w-4" />
            <span>Open Source on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
