import React from 'react';
import './App.css';
import Layout from './views/Layout';
import DetailProjets from './components/DetailProjets/DetailProjets';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const path = window.location.pathname;

  return (
    <LanguageProvider>
      <ThemeProvider>
        {path === '/detail-projets' ? <DetailProjets /> : <Layout />}
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
