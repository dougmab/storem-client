import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export type FileLayout = 'grid' | 'table';

interface LayoutContextType {
  isSidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  filesLayout: FileLayout;
  setFilesLayout: (layout: FileLayout) => void;
}

const LayoutContext = createContext({} as LayoutContextType);

export const LayoutProvider = ({children}: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [filesLayout, setFilesLayout] = useState(localStorage.getItem('filesLayout') as FileLayout || 'table');

  const handleFileLayoutChange = (layout: FileLayout) => {
    localStorage.setItem('filesLayout', layout);
    setFilesLayout(layout);
  }

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleResize = () => {
    setMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LayoutContext.Provider value={{isSidebarOpen, isMobile, toggleSidebar, filesLayout, setFilesLayout: handleFileLayoutChange}}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};