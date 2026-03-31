import React from 'react';
import './App.css';
import Layout from './views/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Layout/>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
