import {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {FeaturePage} from '@/pages/feature';
import {LandingPage} from '@/pages/landing';
import {NewsletterActionPage} from '@/pages/newsletter';
import {NotFoundPage} from '@/pages/not-found';
import {PricingPage} from '@/pages/pricing';
import {LEGACY_REDIRECTS, paths} from '@/lib/site';

function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={paths.home} element={<LandingPage />} />
        <Route path={paths.pricing} element={<PricingPage />} />
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

        {/* legacy marketing routes → new IA */}
        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="/features/*" element={<Navigate to={paths.home} replace />} />
        <Route path="/modules/*" element={<Navigate to={paths.home} replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
