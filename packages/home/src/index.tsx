import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './css/global.css';
import { About } from './components/About/index.tsx';
import { Hero } from './components/Hero/index.tsx';
import { Projects } from './components/Projects/index.tsx';
import { Footer } from './components/Footer/index.tsx';

const root = createRoot(document.getElementById('root')!);

root.render(
  <div>
    <Hero />
    <About />
    <Projects />
    <Footer />
  </div>,
);
