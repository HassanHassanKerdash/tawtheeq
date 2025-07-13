export interface SidebarLink {
  label: string;
  href: string;
  children?: SidebarLink[];
}

export interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "sidebar.sections.getting-started",
    links: [
      { label: "sidebar.links.introduction", href: "/docs/introduction" },
      { label: "sidebar.links.installation", href: "/docs/installation" },
      { label: "sidebar.links.routing", href: "/docs/routing" },
    ],
  },
  {
    title: "sidebar.sections.core-concepts",
    links: [
      { label: "sidebar.links.controllers", href: "/docs/controllers" },
      { label: "sidebar.links.validation", href: "/docs/validation" },
      { label: "sidebar.links.dependency-injection", href: "/docs/dependency-injection" },
    ],
  },
  {
    title: "sidebar.sections.advanced",
    links: [
      { label: "sidebar.links.middleware", href: "/docs/middleware" },
      { label: "sidebar.links.authentication", href: "/docs/authentication" },
      { label: "sidebar.links.testing", href: "/docs/testing" },
    ],
  },
];

export default sidebarSections;
