import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { About } from './components/About/index.tsx';
import { Hero } from './components/Hero/index.tsx';
import { Projects } from './components/Projects/index.tsx';
import { Footer } from './components/Footer/index.tsx';
import { GlobalStyle } from './styles.ts';

const root = createRoot(document.getElementById('root')!);

root.render(
  <div>
    <GlobalStyle />
    <Hero />
    <About />
    <Projects />
    <Footer />
  </div>,
);
