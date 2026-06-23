import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './App.tsx';
import {LanguageProvider} from './lib/i18n.tsx';
import {ThemeProvider} from './components/theme-provider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="cvp-theme">
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
