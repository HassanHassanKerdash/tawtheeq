import { useTranslation } from 'kawkab-frontend';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#161b22] border-t border-[#30363d] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 rounded-b-xl">
        <div className="text-center">
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            © 2025 {t("app.name")}<span className="mx-1">·</span>
            <br className="block md:hidden" />
            <span className="inline-block mt-1 md:mt-0">{t("app.description")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
} 