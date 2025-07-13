import { t, useTranslation } from "kawkab-frontend";

export function meta() {
  return [
    { 
      title: `${t('app.name')} - ${t('introduction.title')}`,
    }
  ];
}

export default function Page() {
  const { t, isRTL } = useTranslation();

  return (
    <>
    <article className="prose prose-invert max-w-none prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:font-bold prose-h1:mb-4 sm:prose-h1:mb-6 prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-semibold prose-h2:mt-10 sm:prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-4 sm:prose-h2:mb-6 prose-p:leading-relaxed">
      <section id="introduction">
        <div className="mb-4 sm:mb-6">
          <span className="badge text-xs sm:text-sm font-medium text-blue-300 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-block">
            {t('introduction.badge')}
          </span>
        </div>
        <h1 className="text-white font-bold leading-tight">
          {t('introduction.title')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mt-4 sm:mt-6">
          {t('introduction.description')}
        </p>
      </section>
      
      <div className="section-divider" />
      
      <section id="what-is-tawtheeq">
        <h2 className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-3xl sm:text-4xl">🚀</span>
          {t('whatIs.title')}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mt-4">
          {t('whatIs.description')}
        </p>
      </section>
      
      <section id="quick-start" className="mt-12 sm:mt-14 md:mt-16">
        <h2 className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-3xl sm:text-4xl">⚡</span>
          {t('quickStart.title')}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mt-4">
          {t('quickStart.description')}
        </p>
        <div className="code-block rounded-lg sm:rounded-xl overflow-hidden mt-6 sm:mt-8 shadow-2xl">
          <div className="bg-[#21262d] px-3 sm:px-4 py-2 flex items-center justify-between border-b border-[#30363d]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-500">getting-started.md</span>
          </div>
          <div className="p-3 sm:p-4 md:p-6 overflow-x-auto">
            <pre className={`text-sm sm:text-base font-mono leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              <code>
                <span className="syntax-comment">{t('quickStart.codeExample.title')}</span>
                {"\n\n"}
                <span className="syntax-comment">{t('quickStart.codeExample.installation')}</span>
                {"\n"}
                {"npm install -g tawtheeq"}
                {"\n"}
                {"tawtheeq init my-docs"}
                {"\n"}
                {"cd my-docs"}
                {"\n"}
                {"tawtheeq serve"}
                {"\n\n"}
                <span className="syntax-comment">{t('quickStart.codeExample.firstPage')}</span>
                {"\n"}
                {t('quickStart.codeExample.welcome')}
                {"\n"}
                {t('quickStart.codeExample.description')}
                {"\n"}
                {t('quickStart.codeExample.markdown')}
                {"\n"}
                {t('quickStart.codeExample.realTime')}
              </code>
            </pre>
          </div>
        </div>
        <p className={`mt-4 sm:mt-6 text-base text-gray-300 flex items-start sm:items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <svg className="w-5 h-5 text-green-500 mt-1 sm:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {t('quickStart.availableAt')}{" "}
            <code className="bg-[#161b22] px-2 py-1 rounded text-[#79c0ff] text-sm">localhost:3000</code>
            {" "}{t('quickStart.liveReload')}
          </span>
        </p>
      </section>
      
      <section id="core-features" className="mt-12 sm:mt-14 md:mt-16">
        <h2 className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-3xl sm:text-4xl">✨</span>
          {t('coreFeatures.title')}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 mt-4">
          {t('coreFeatures.description')}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div id="feature-markdown" className="feature-card group">
            <div className="feature-icon text-xl">📝</div>
            <h3 className="font-semibold text-xl text-white mb-2">{t('coreFeatures.features.markdown.title')}</h3>
            <p className="text-base text-gray-400">{t('coreFeatures.features.markdown.description')}</p>
          </div>
          <div id="feature-collaboration" className="feature-card group">
            <div className="feature-icon text-xl">👥</div>
            <h3 className="font-semibold text-xl text-white mb-2">{t('coreFeatures.features.collaboration.title')}</h3>
            <p className="text-base text-gray-400">{t('coreFeatures.features.collaboration.description')}</p>
          </div>
          <div id="feature-themes" className="feature-card group">
            <div className="feature-icon text-xl">🎨</div>
            <h3 className="font-semibold text-xl text-white mb-2">{t('coreFeatures.features.themes.title')}</h3>
            <p className="text-base text-gray-400">{t('coreFeatures.features.themes.description')}</p>
          </div>
          <div id="feature-search" className="feature-card group">
            <div className="feature-icon text-xl">🔍</div>
            <h3 className="font-semibold text-xl text-white mb-2">{t('coreFeatures.features.search.title')}</h3>
            <p className="text-base text-gray-400">{t('coreFeatures.features.search.description')}</p>
          </div>
          <div id="feature-deployment" className="feature-card group">
            <div className="feature-icon text-xl">🚀</div>
            <h3 className="font-semibold text-xl text-white mb-2">{t('coreFeatures.features.deployment.title')}</h3>
            <p className="text-base text-gray-400">{t('coreFeatures.features.deployment.description')}</p>
          </div>
          <div id="feature-integrations" className="feature-card group">
            <div className="feature-icon text-xl">🔗</div>
            <h3 className="font-semibold text-xl text-white mb-2">{t('coreFeatures.features.integrations.title')}</h3>
            <p className="text-base text-gray-400">{t('coreFeatures.features.integrations.description')}</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      
      <section id="contributing" className="mt-12 sm:mt-14 md:mt-16">
        <h2 className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-3xl sm:text-4xl">🤝</span>
          {t('contributing.title')}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mt-4">
          {t('contributing.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <a href="#" className={`primary-button inline-flex items-center justify-center gap-2 text-white font-medium py-3 px-6 rounded-lg no-underline text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
            {t('contributing.buttons.viewGithub')}
          </a>
          <a href="#" className={`inline-flex items-center justify-center gap-2 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-white font-medium py-3 px-6 rounded-lg transition-all no-underline text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {t('contributing.buttons.readDocs')}
          </a>
        </div>
      </section>
      
      <section className="mt-16 sm:mt-20 md:mt-24 bg-gradient-to-r from-[#161b22] to-[#0d1117] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#30363d]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">25k+</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('statistics.sites')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">150+</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('statistics.contributors')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">4.8k</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('statistics.stars')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">99.9%</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('statistics.uptime')}</div>
          </div>
        </div>
      </section>
    </article>
  </>
  );
}