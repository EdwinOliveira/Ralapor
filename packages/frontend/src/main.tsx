import i18n from 'i18next';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';

i18n.use(initReactI18next).init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
