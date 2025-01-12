import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {LayoutProvider} from '@/context/layout-provider.tsx';
import {DialogProvider} from '@/context/dialog-provider.tsx';
import {Toaster} from '@/components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DialogProvider>
      <LayoutProvider>
        <App/>
        <Toaster/>
      </LayoutProvider>
    </DialogProvider>
  </StrictMode>,
);
