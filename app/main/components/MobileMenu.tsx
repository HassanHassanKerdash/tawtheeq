import React from 'react'; 
import { Link, useTranslation } from "kawkab-frontend";
import sidebarSections, { type SidebarLink } from "../../docs/config/sidebarLinks";
import { useRightSidebarStore } from '../stores/useRightSidebarStore';
import langs from "../config/langs";
import versions from "../config/versions";

interface MobileMenuProps {
  isRTL: boolean;
  isOpen: boolean;
  currentPath: string;
  toggleMobileMenu: () => void;
}

export default function MobileMenu({ isRTL, isOpen, currentPath, toggleMobileMenu }: MobileMenuProps) {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const tocItems = useRightSidebarStore((state) => state.items);

  const getLinkClassName = (href: string) => {
    const isActive = currentPath === href;
    return `block py-2 transition text-sm ${isActive ? 'text-[#58a6ff] font-semibold' : 'text-gray-400 hover:text-white'}`;
  };

  const renderLinks = (links: SidebarLink[]) => (
    links.map((link, index) => (
      <li key={index}>
        <Link to={link.href} className={getLinkClassName(link.href)} onClick={toggleMobileMenu}>
          {t(link.label)}
        </Link>
      </li>
    ))
  );

  return (
    <>
      <div
        className={`mobile-menu fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-80 max-w-[85vw] bg-[#161b22] border-${isRTL ? 'l' : 'r'} border-[#30363d] lg:hidden overflow-y-auto transition-transform duration-300 ease-in-out z-60`}
        aria-hidden={!isOpen}
        style={{
          transform: isOpen ? 'translateX(0)' : isRTL ? 'translateX(100vw)' : 'translateX(-100vw)'
        }}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">{t('navigation.menu')}</h3>
            <button
              onClick={toggleMobileMenu}
              className={`text-gray-400 hover:text-white transition p-2 ${isRTL ? '-ml-2' : '-mr-2'}`}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-6">
            {sidebarSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                  {t(section.title)}
                </h4>
                <ul className="space-y-1">
                  {renderLinks(section.links)}
                </ul>
              </div>
            ))}

            {tocItems.length > 0 && (
              <div className="border-t border-[#30363d] pt-6">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                  {t('onThisPage')}
                </h4>
                <ul className="space-y-1">
                  {tocItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="block text-gray-400 hover:text-white py-2 transition text-sm" onClick={toggleMobileMenu}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-t border-[#30363d] pt-6">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                {t('footer.settings')}
              </h4>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-2">{t('navigation.version')}</label>
                <div className="relative">
                  <select className={`version-select-mobile bg-[#161b22] border border-[#30363d] text-gray-300 text-sm rounded-md px-3 py-2 w-full appearance-none cursor-pointer hover:border-[#58a6ff] focus:border-[#58a6ff] focus:outline-none transition-colors ${isRTL ? 'pl-8' : 'pr-8'}`}>
                    {versions.map((version, index) => (
                      <option key={version} value={version}>
                        {version}{index === 0 ? ` (${t('app.versions.latest')})` : ''}
                      </option>
                    ))}
                  </select>
                  <svg className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-2">{t('navigation.language')}</label>
                <div className="relative">
                  <select 
                    className={`language-select-mobile bg-[#161b22] border border-[#30363d] text-gray-300 text-sm rounded-md px-3 py-2 w-full appearance-none cursor-pointer hover:border-[#58a6ff] focus:border-[#58a6ff] focus:outline-none transition-colors ${isRTL ? 'pl-8' : 'pr-8'}`}
                    value={currentLanguage}
                    onChange={(e) => {
                      changeLanguage(e.target.value);
                      toggleMobileMenu();
                    }}
                  >
                    {Object.values(langs).map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <svg className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
