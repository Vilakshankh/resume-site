import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Home } from './components/Home';
import './home.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider delay={300}>
      <Home />
    </TooltipProvider>
  </StrictMode>
);
