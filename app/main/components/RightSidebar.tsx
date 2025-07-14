import React from 'react';
import { useTranslation } from 'kawkab';
import { useRightSidebarStore } from '../stores/useRightSidebarStore';

export default function RightSidebar() {
  const { t, isRTL } = useTranslation();
  const items = useRightSidebarStore((state) => state.items) as Array<{
    href: string;
    label: string;
    children: { href: string; label: string }[];
  }>;

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside className={`w-64 hidden lg:block p-4 xl:p-6 border-s border-[#30363d] h-[calc(100vh-65px)] sticky top-[65px] flex flex-col ${isRTL ? 'order-0' : 'order-3'}`}>
      <div className="flex-grow overflow-y-auto">
        <nav className="space-y-4 text-sm">
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
            {t('onThisPage', 'في هذه الصفحة')}
          </h3>

          {items.length === 0 ? (
            <div className="text-gray-500 text-xs px-4 py-2">
              {t('noContentSidebar')}
            </div>
          ) : (
            <ul className="space-y-2">
              {items.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`sidebar-link block ${isRTL ? 'pr-4' : 'pl-4'} py-2 rounded-md`}
                  >
                    {item.label}
                  </a>

                  {item.children && item.children.length > 0 && (
                    <ul className={`space-y-2 mt-2 ms-4 ps-4 border-s border-gray-700`}>
                      {item.children.map((child, cidx) => (
                        <li key={cidx}>
                          <a
                            href={child.href}
                            className="sidebar-link block py-1.5 text-xs"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      <div className="mt-auto text-center pt-4 flex flex-col items-center gap-3 border-t border-[#30363d]">
        <button
          onClick={handleGoToTop}
          className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-[#23272e] rounded-md px-3 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161b22] focus:ring-[#30363d] cursor-pointer"
          title={t('goToTopTitle')}
        >
          {t('goToTop')}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}