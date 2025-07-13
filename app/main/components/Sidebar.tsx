import { Link, useTranslation } from "kawkab-frontend";
import sidebarSections, { type SidebarLink } from "../../docs/config/sidebarLinks";

interface SidebarProps {
  isRTL: boolean;
  currentPath: string;
}

export default function Sidebar({ isRTL, currentPath }: SidebarProps) {
  const { t } = useTranslation();

  const getLinkClassName = (href: string) => {
    const isActive = currentPath === href;
    
    let classes = 'transition-colors duration-200 block py-1.5 text-sm break-words w-full rounded ';
    
    if (isActive) {
      classes += 'text-[#58a6ff] font-medium bg-[#30363d] ';
      classes += isRTL ? 'pr-2 border-r-2 border-[#58a6ff]' : 'pl-2 border-l-2 border-[#58a6ff]';
    } else {
      classes += 'text-gray-400 hover:text-white ';
      classes += isRTL ? 'pr-2' : 'pl-2';
    }
    
    return classes;
  };

  const renderLinks = (links: SidebarLink[]) =>
    links.map((link, index) => (
      <li key={index}>
        <Link to={link.href} className={getLinkClassName(link.href)}>
          {t(link.label)}
        </Link>
        {link.children && (
          <ul className={`mt-1 space-y-1 ${isRTL ? 'mr-4' : 'ml-4'}`}>
            {renderLinks(link.children)}
          </ul>
        )}
      </li>
    ));

  return (
    <aside
      className={`w-56 hidden lg:block p-4 2xl:p-6 border-e border-[#30363d] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto ${isRTL ? 'order-2' : 'order-1'}`}
    >
      <nav className="space-y-6 2xl:space-y-8 text-sm">
        {sidebarSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              {t(section.title)}
            </h3>
            <ul className="space-y-1.5 2xl:space-y-2">{renderLinks(section.links)}</ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}