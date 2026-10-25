import {Navigate, Route, Routes} from 'react-router-dom';

import {SiteLayout} from '@/components/site-layout';
import {ChangelogPage} from '@/pages/changelog';
import {FeaturePage} from '@/pages/feature';
import {LandingPage} from '@/pages/landing';
import {NewsletterActionPage} from '@/pages/newsletter';
import {NotFoundPage} from '@/pages/not-found';
import {PricingPage} from '@/pages/pricing';
import {SecurityPage} from '@/pages/security';
import {LEGACY_REDIRECTS, paths} from '@/lib/site';

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={paths.home} element={<LandingPage />} />
        <Route path={paths.pricing} element={<PricingPage />} />
        <Route path={paths.security} element={<SecurityPage />} />
        <Route path={paths.changelog} element={<ChangelogPage />} />
        <Route
          path={paths.newsletterConfirm}
          element={<NewsletterActionPage mode="confirm" />}
        />
        <Route
          path={paths.newsletterUnsubscribe}
          element={<NewsletterActionPage mode="unsubscribe" />}
        />
        <Route path="/labeling/:slug" element={<FeaturePage category="labeling" />} />
        <Route path="/platform/:slug" element={<FeaturePage category="platform" />} />
        <Route path="/more/:slug" element={<FeaturePage category="more" />} />

        {/* legacy marketing routes → new IA (the build also emits 301s) */}
        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="/features/*" element={<Navigate to={paths.home} replace />} />
        <Route path="/modules/*" element={<Navigate to={paths.home} replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
