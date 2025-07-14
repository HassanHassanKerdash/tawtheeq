import { useParams } from "react-router-dom";
import { t, useTranslation } from 'kawkab';
import MarkdownRenderer from "~/main/components/MarkdownViewer";
import sidebarSections, { type SidebarLink } from "../../../docs/config/sidebarLinks";

const getAllLinks = (sections: typeof sidebarSections): SidebarLink[] => {
  const allLinks: SidebarLink[] = [];
  
  const flatten = (links: SidebarLink[]) => {
    for (const link of links) {
      allLinks.push(link);
      if (link.children) {
        flatten(link.children);
      }
    }
  };

  for (const section of sections) {
    flatten(section.links);
  }
  
  return allLinks;
};

const allLinks = getAllLinks(sidebarSections);

export function meta({ params }: { params: { slug?: string } }) {
    const slug = params.slug || "";
    
    const currentLink = allLinks.find(link => link.href === `/docs/${slug}`);
    
    const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ') : '';

    const pageTitle = currentLink ? t(currentLink.label) : capitalize(slug);
    
    return [
      { 
        title: `${pageTitle} - ${t('app.name')}`,
      }
    ];
}

export default function Docs() {
  const { slug } = useParams();
  const { currentLanguage } = useTranslation();
  const moduleName = "docs";

  return (
    <MarkdownRenderer
        key={`${moduleName}-${currentLanguage}-${slug}`}
        lang={currentLanguage as "ar" | "en"}
        slug={slug as string}
        moduleName={moduleName}
    />
  );
}