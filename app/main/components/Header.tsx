import { Link, useTranslation } from "kawkab-frontend";
import langs from "../config/langs";
import versions from "../config/versions";
import links from "../config/links";
import { useSearchStore } from "../stores/useSearchStore";

interface HeaderProps {
  isRTL: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ isRTL, toggleMobileMenu }: HeaderProps) {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const { open: openSearch } = useSearchStore();

  return (
    <>
      <header className="header-bg px-3 sm:px-4 md:px-6 py-3 sticky top-0 z-50">
        <div className={`flex items-center justify-between max-w-7xl mx-auto ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          
          {/* START: Left side (Logo and Tablet Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
            {/* Hamburger Menu for Tablet view ONLY (sm to lg) */}
            <button
              className="hidden sm:flex lg:hidden text-gray-400 hover:text-white transition p-2 -ms-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo */}
            <Link to="/" className={`flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse group ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="logo-icon">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-[#58a6ff] group-hover:text-[#79c0ff] transition-colors"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg sm:text-xl group-hover:text-[#79c0ff] transition-colors">
                {t('app.name')}
              </span>
            </Link>
          </div>
          {/* END: Left side */}


          {/* START: Right side (contains either mobile icons or full desktop controls) */}
          <div className="flex items-center">
            {/* Group of icons for Mobile view (< sm) */}
            <div className="flex items-center sm:hidden space-x-0 rtl:space-x-reverse">
              <button
                className="p-2 text-gray-400 hover:text-white transition"
                onClick={openSearch}
                aria-label="Toggle mobile search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button
                className="text-gray-400 hover:text-white transition p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>

            {/* Group of controls for Desktop & Tablet view (>= sm) */}
            <div className={`hidden sm:flex items-center space-x-3 lg:space-x-4 rtl:space-x-reverse`}>
                <div className="flex-1 max-w-xs md:max-w-sm lg:max-w-lg">
                    <button onClick={openSearch} className="relative w-full text-left bg-[#0d1117] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div className={`w-full ps-10 pe-4 md:pe-16 py-2 text-sm text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{t('search.placeholder')}</div>
                        <div className="absolute inset-y-0 end-0 hidden md:flex items-center pe-3 pointer-events-none"><span className="kbd">⌘ K</span></div>
                    </button>
                </div>
                <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 rtl:space-x-reverse">
                  <Link to="/" className="nav-link text-sm text-gray-400 hover:text-white">{t('navigation.docs')}</Link>
                </nav>
                <div className="relative group">
                  <select className="version-select bg-[#161b22] border border-[#30363d] text-gray-300 text-sm rounded-md px-3 py-1.5 pe-8 appearance-none cursor-pointer hover:border-[#58a6ff] focus:border-[#58a6ff] focus:outline-none transition-colors" title="Select Framework Version">
                    {versions.map((version, index) => ( <option key={version} value={version}>{version}{index === 0 ? ` (${t('app.versions.latest')})` : ''}</option> ))}
                  </select>
                  <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-500 group-hover:text-[#58a6ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" /></svg></div>
                  <div className={`tooltip absolute bottom-full ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} mb-2 px-3 py-1.5 bg-gray-900 border border-[#30363d] text-white text-xs rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50`}>Framework Version</div>
                </div>
                <div className="relative group">
                  <select className="language-select bg-[#161b22] border border-[#30363d] text-gray-300 text-sm rounded-md px-3 py-1.5 pe-8 appearance-none cursor-pointer hover:border-[#58a6ff] focus:border-[#58a6ff] focus:outline-none transition-colors" title={t('navigation.language')} value={currentLanguage} onChange={(e) => changeLanguage(e.target.value)}>
                    {Object.values(langs).map((lang) => ( <option key={lang.code} value={lang.code}>{lang.name}</option> ))}
                  </select>
                  <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none"><svg className="w-4 h-4 text-gray-500 group-hover:text-[#58a6ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg></div>
                  <div className={`tooltip absolute bottom-full ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} mb-2 px-3 py-1.5 bg-gray-900 border border-[#30363d] text-white text-xs rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50`}>Language / اللغة</div>
                </div>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition group" aria-label="GitHub Repository">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                </a>
              </div>
          </div>
          {/* END: Right side */}
        </div>
      </header>
    </>
  );
}