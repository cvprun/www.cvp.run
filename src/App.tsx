import {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import {DetailPage} from '@/pages/detail';
import {LandingPage} from '@/pages/landing';

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/features/:slug" element={<DetailPage kind="feature" />} />
        <Route path="/modules/:slug" element={<DetailPage kind="module" />} />
        <Route path="*" element={<DetailPage kind="feature" />} />
      </Routes>
    </>
  );
}

export default App;
