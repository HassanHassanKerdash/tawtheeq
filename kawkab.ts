import { formatTranslations, initLanguageFromRequest, type LoaderFunctionArgs } from "kawkab-frontend";
import configuration from "~/configuration";

export function loadTranslations(request: Request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const headers: Record<string, string> = {};
  if (cookieHeader) headers.cookie = cookieHeader;

  const resourcesTranslations = formatTranslations(
    import.meta.glob('./app/*/translations/*.json', { eager: true })
  );

  const currentLang = initLanguageFromRequest(resourcesTranslations, configuration.translation.defaultLang, { headers });

  return {
    resourcesTranslations,
    currentLang,
    cookieHeader,
  };
}

export async function kawkabLoader({ request }: LoaderFunctionArgs) {
    return {
      translations: loadTranslations(request),
    };
}