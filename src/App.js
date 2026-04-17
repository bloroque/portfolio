import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader/Loader';

const Layout = lazy(() => import('./views/Layout'));
const DetailProjets = lazy(() => import('./components/DetailProjets/DetailProjets'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          {loading && <Loader onFinish={() => setLoading(false)} />}
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/detail-projets" element={<DetailProjets />} />
                <Route path="*" element={<Layout />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MotionConfig>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
