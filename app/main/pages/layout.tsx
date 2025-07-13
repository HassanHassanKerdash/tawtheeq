import '../../main.css'
import { useState, useEffect, useRef } from 'react'
import { Outlet, t, useTranslation, useLocation } from 'kawkab-frontend';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import Footer from '../components/Footer';
import { SkipToContent } from '../components/MarkdownViewer';
import SearchModal from '../components/SearchModal';
import { useSearchStore } from '../stores/useSearchStore';

export function meta() {
  return [
    { 
      title: t('app.name'),
      description: t('app.description'),
      keywords: t('app.keywords'),
    }
  ];
}

export default function () {
  const { direction, isRTL } = useTranslation();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSearchStore();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openSearch]);

  useEffect(() => {
    document.body.classList.add('loaded');
    
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const directionClasses = isRTL ? 'rtl' : 'ltr';

  return (
    <div className={`${directionClasses} ${direction}`}>
      <SkipToContent />
      
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />

      <div 
        ref={progressBarRef}
        style={{
          position: 'fixed',
          top: 0,
          [isRTL ? 'right' : 'left']: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #58a6ff, #79c0ff, #22d3ee)',
          transition: 'width 0.2s ease',
          zIndex: 100,
          width: `${scrollProgress}%`
        }}
      />

      <MobileMenu 
        isRTL={isRTL}
        isOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        currentPath={location.pathname}
      />
      
      <Header 
        isRTL={isRTL} 
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <div className="flex max-w-8xl mx-auto">
        <Sidebar 
          isRTL={isRTL} 
          currentPath={location.pathname}
        />

        <main id="main-content" className={`flex-1 min-w-0 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 ${isRTL ? 'order-1' : 'order-2'}`}>
            <Outlet />
        </main>

        <RightSidebar />
      </div>
      
      <Footer />
    </div>
  )
}