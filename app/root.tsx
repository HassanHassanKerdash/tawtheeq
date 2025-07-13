import '../init';

import {
  Outlet,
  Meta,
  Links,
  Scripts,
  ScrollRestoration,
  TranslationProvider,
  formatTranslations,
  t,
  getCurrentLanguage,
  isRTL,
  type LoaderFunctionArgs,
  initLanguageFromRequest,
  useLoaderData
} from 'kawkab-frontend';
import configuration from './configuration';

import './app.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') || '';

  const headers: Record<string, string> = {};
  if (cookieHeader) headers.cookie = cookieHeader;

  const resourcesTranslations = formatTranslations(import.meta.glob('./*/translations/*.json', { eager: true }));
  const currentLang = initLanguageFromRequest(resourcesTranslations, configuration.translation.defaultLang, { headers });

  return {
    resourcesTranslations: resourcesTranslations,
    currentLang,
    cookieHeader
  };
}

export function meta() {
  const currentLang = getCurrentLanguage();
  const isRightToLeft = isRTL();

  return [
    {
      title: t('app.name'),
      charset: 'utf-8'
    },
    {
      name: "language",
      content: currentLang
    },
    {
      name: "direction",
      content: isRightToLeft ? 'rtl' : 'ltr'
    }
  ];
}

export const links = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const currentLang = getCurrentLanguage();
  const isRightToLeft = isRTL();

  return (
    <html lang={currentLang} dir={isRightToLeft ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { resourcesTranslations, currentLang, cookieHeader } = useLoaderData();

  const safeResourcesTranslations = (resourcesTranslations && Object.keys(resourcesTranslations).length > 0)
    ? resourcesTranslations
    : {
      en: {
        translation: {
          app: {
            name: "Kawkab",
          }
        }
      },
      ar: {
        translation: {
          app: {
            name: "كوكب",
          }
        }
      }
    };

  return (
    <TranslationProvider
      resources={safeResourcesTranslations}
      defaultLang={currentLang}
      currentLang={currentLang}
      cookieHeader={cookieHeader}
    >
      <Outlet />
    </TranslationProvider>
  );
}
