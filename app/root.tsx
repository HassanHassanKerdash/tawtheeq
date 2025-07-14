import '../index';
import { kawkabLoader } from '../kawkab';
import {
  Kawkab,
  Outlet,
  Meta,
  Links,
  Scripts,
  ScrollRestoration,
  getCurrentLanguage,
  isRTL,
  t,
  type LoaderFunctionArgs,
  useLoaderData,
} from 'kawkab';

import './app.css';

export async function loader(args: LoaderFunctionArgs) {
  return {
    kawkab: await kawkabLoader(args),
  };
}

export function meta() {
  const currentLang = getCurrentLanguage();
  const isRightToLeft = isRTL();

  return [
    {
      title: t('app.name'),
      charset: 'utf-8',
    },
    {
      name: 'language',
      content: currentLang,
    },
    {
      name: 'direction',
      content: isRightToLeft ? 'rtl' : 'ltr',
    },
  ];
}

export const links = () => [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const currentLang = getCurrentLanguage();
  const isRightToLeft = isRTL();

  return (
    <html suppressHydrationWarning lang={currentLang} dir={isRightToLeft ? 'rtl' : 'ltr'}>
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
  const data = useLoaderData();

  return (
    <Kawkab data={data}>
      <Outlet />
    </Kawkab>
  );
}

