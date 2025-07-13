import React, { useEffect, useState, useMemo, useCallback, memo, useRef, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import DOMPurify from 'dompurify';
import { createRoot } from 'react-dom/client';
import { t, useNavigate } from "kawkab-frontend";
import { useRightSidebarStore, type RightSidebarItem } from "../stores/useRightSidebarStore";
import { useVersionStore } from '../stores/useVersionStore';

interface MarkdownRendererProps {
  lang: string;
  moduleName: string;
  slug: string;
  onNavigate?: (id: string) => void;
  className?: string;
}

interface ErrorDisplayProps {
  message: string;
  lang: string;
}

const CACHE_DURATION = 1000 * 60 * 60;

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const contentCache = new Map<string, { content: string; timestamp: number }>();

const getCachedContent = (key: string): string | null => {
  const cached = contentCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.content;
  }
  contentCache.delete(key);
  return null;
};

const setCachedContent = (key: string, content: string): void => {
  contentCache.set(key, { content, timestamp: Date.now() });
};

const sanitizeContent = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'em', 'strong', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'br', 'hr', 'figure', 'figcaption'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel']
  });
};

const LoadingSpinner = memo(({ lang }: { lang: string }) => {
  return (
    <div
      className="flex justify-center items-center p-10"
      role="status"
      aria-live="polite"
      aria-label={t('loading')}
    >
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">
        {t('loading')}
      </span>
    </div>
  );
});

const ErrorDisplay = memo(({ message, lang }: ErrorDisplayProps) => {
  return (
    <div
      className={`p-4 bg-red-100 ${lang === 'ar' ? 'border-r-4 border-red-500' : 'border-l-4 border-red-500'} text-red-700 dark:bg-red-900/20 dark:border-red-600 dark:text-red-300 rounded-md`}
      role="alert"
      aria-live="assertive"
    >
      <h3 className="font-bold">{t('errorTitle')}</h3>
      <p>{message || t('errorDescription')}</p>
    </div>
  );
});

export const useTableOfContents = (content: string | null) => {
  return useMemo(() => {
    if (!content) return [];
    const headingRegex = /^(#{1,6})\s*(.+)$/gm;
    const toc: Array<{ level: number; text: string; id: string }> = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      let text = match[2].trim().replace(/\[(.*?)\]\(.*?\)/g, '$1');
      text = text.replace(/(^|\s)(\*\*|__)(.*?)\2(\s|$)/g, '$1$3$4');
      text = text.replace(/(^|\s)(\*|_)(.*?)\2(\s|$)/g, '$1$3$4');
      const id = slugify(text);
      if (level === 2 || level === 3) {
        toc.push({ level, text, id });
      }
    }
    return toc;
  }, [content]);
};

function MarkdownRenderer(props: MarkdownRendererProps) {
  const { lang, moduleName, slug, onNavigate, className = '' } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const setItems = useRightSidebarStore((state) => state.setItems);
  const toc = useTableOfContents(content);
  const version = useVersionStore((state) => state.version);

  useEffect(() => {
    const loadContent = async () => {
      const cacheKey = `${moduleName}-${lang}-${slug}`;

      const cached = getCachedContent(cacheKey);
      if (cached) {
        setContent(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const module = await import(`../../${moduleName}/markdown/${version}/${lang}/${slug}.md?raw`);
        const sanitizedContent = sanitizeContent(module.default);
        setCachedContent(cacheKey, sanitizedContent);
        setContent(sanitizedContent);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [lang, moduleName, slug, version, navigate]);

  useEffect(() => {
    const sidebarItems: RightSidebarItem[] = toc.map((item): RightSidebarItem => ({
      label: item.text,
      href: `#${item.id}`,
    }));
    setItems(sidebarItems);
    return () => {
      setItems([]);
    };
  }, [toc, setItems]);

  useEffect(() => {
    if (!containerRef.current || !content) return;
    if (containerRef.current.shadowRoot) return;

    const shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    const style = document.createElement('style');

    style.textContent = `
      :host { all: initial; color: #1a1a1a; display: block; font-size: 16px; max-width: 100%; overflow-wrap: break-word; text-rendering: optimizeLegibility; }
      @media (prefers-color-scheme: dark) { :host { color: #e5e7eb; } }
      h1, h2, h3, h4, h5, h6 { font-weight: bold; margin: 1.5em 0 0.5em; color: #111827; line-height: 1.3; }
      @media (prefers-color-scheme: dark) { h1, h2, h3, h4, h5, h6 { color: #f9fafb; } }
      h1 { font-size: 2.25rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
      h2 { font-size: 1.875rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25rem; }
      h3 { font-size: 1.5rem; }
      h4 { font-size: 1.25rem; }
      h5, h6 { font-size: 1.125rem; }
      @media (prefers-color-scheme: dark) { h1 { border-bottom-color: #374151; } h2 { border-bottom-color: #374151; } }
      p { margin: 1em 0; text-align: justify; word-wrap: break-word; line-height: 1.7; }
      a { color: #2563eb; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; transition: color 0.2s; }
      a:hover { color: #1d4ed8; }
      a:focus { outline: 2px solid #2563eb; outline-offset: 2px; border-radius: 2px; }
      @media (prefers-color-scheme: dark) { a { color: #60a5fa; } a:hover { color: #3b82f6; } }
      .code-block-container { position: relative; margin: 1.5em 0; border-radius: 0.5rem; overflow: hidden; background: #282c34; border: 1px solid #444c56; }
      .code-header { background: #333842; color: #abb2bf; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; border-bottom: 1px solid #444c56; position: relative; z-index: 1; }
      .language-label { font-weight: 600; text-transform: uppercase; font-size: 0.75rem; color: #abb2bf; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; }
      .language-label::before { content: "●"; color: #98c379; font-size: 0.75rem; }
      .copy-button { background: transparent; color: #abb2bf; border: 1px solid #444c56; padding: 0.25rem 0.75rem; border-radius: 0.25rem; cursor: pointer; font-size: 0.8rem; transition: all 0.2s ease; font-family: "Cairo"; min-width: 60px; text-align: center; font-weight: 500; }
      .copy-button:hover { background: #444c56; color: #ffffff; border-color: #5c6370; }
      .copy-button.copied { background: #5c8a54; color: white; border-color: #5c8a54; }
      .syntax-highlighter-wrapper { background: transparent; overflow: auto; position: relative; max-height: 600px; }
      .syntax-highlighter-wrapper pre { background: transparent !important; color: #f8f8f2 !important; padding: 1rem !important; margin: 0 !important; overflow: visible !important; direction: ltr !important; font-size: 0.875rem !important; line-height: 1.6 !important; border-radius: 0 !important; font-weight: 400 !important; text-align: left !important; }
      .syntax-highlighter-wrapper code { white-space: pre !important; }
      code { background: #f3f4f6; color: #dc2626; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-size: 0.875em; direction: ltr; display: inline-block; font-weight: 500; }
      @media (prefers-color-scheme: dark) { code { background: rgb(29, 31, 33); color: #f87171; } }
      ul, ol { margin: 1em 0; line-height: 1.7; padding-${lang === 'ar' ? 'right' : 'left'}: 2em; }
      li { margin: 0.5em 0; }
      blockquote { background: #fffbeb; padding: 1rem; margin: 1.5em 0; border-radius: 0.25rem; font-style: italic; position: relative; border-${lang === 'ar' ? 'right' : 'left'}: 4px solid #fbbf24; }
      @media (prefers-color-scheme: dark) { blockquote { background: #451a03; border-color: #f59e0b; color: #fde68a; } }
      table { border-collapse: collapse; margin: 1.5em 0; border: 1px solid #d1d5db; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); width: 100%; }
      th, td { padding: 0.75rem 1rem; text-align: ${lang === 'ar' ? 'right' : 'left'}; border: 1px solid #d1d5db; vertical-align: top; line-height: 1.5; }
      th { background: #f9fafb; font-weight: 600; text-transform: uppercase; color: #374151; }
      tbody tr:hover { background: #f8fafc; }
      @media (prefers-color-scheme: dark) { table, th, td { border-color: #4b5563; } th { background: #374151; color: #f3f4f6; } tbody tr:hover { background: #2d3748; } }
      img { max-width: 100%; height: auto; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin: 1rem 0; }
      figure { margin: 1.5em 0; text-align: center; }
      figcaption { margin-top: 0.75rem; font-size: 0.875rem; color: #6b7280; font-style: italic; }
      @media (prefers-color-scheme: dark) { figcaption { color: #9ca3af; } }
      @media (max-width: 768px) {
        :host { padding: 0.5rem; font-size: 15px; }
        h1 { font-size: 1.875rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; }
        .syntax-highlighter-wrapper { max-height: 400px; }
        .syntax-highlighter-wrapper pre { font-size: 0.8125rem !important; }
        table { display: block; overflow-x: auto; white-space: nowrap; }
        th, td { white-space: normal; }
      }
    `;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(wrapper);

    const EnhancedCodeBlock = ({ codeString, language }: { codeString: string; language: string }) => {
      const [copied, setCopied] = React.useState(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(codeString).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      };

      return (
        <div className="code-block-container">
          <div className="code-header">
            <span className="language-label">{language}</span>
            <button
              className={`copy-button ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title={t('copy')}
            >
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
          <div className="syntax-highlighter-wrapper">
            <SyntaxHighlighter
              style={atomDark}
              language={language}
              PreTag="div"
              showLineNumbers={true}
              wrapLines={true}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    };

    const enhancedComponents: Components = {
      h1: ({ children }) => <h1 id={slugify(React.Children.toArray(children).join(''))}>{children}</h1>,
      h2: ({ children }) => <h2 id={slugify(React.Children.toArray(children).join(''))}>{children}</h2>,
      h3: ({ children }) => <h3 id={slugify(React.Children.toArray(children).join(''))}>{children}</h3>,
      h4: ({ children }) => <h4 id={slugify(React.Children.toArray(children).join(''))}>{children}</h4>,
      h5: ({ children }) => <h5 id={slugify(React.Children.toArray(children).join(''))}>{children}</h5>,
      h6: ({ children }) => <h6 id={slugify(React.Children.toArray(children).join(''))}>{children}</h6>,
      a: ({ href, children }) => {
        const isInternal = href?.startsWith('#');
        let processedHref = href?.startsWith('javascript:') ? '#' : href;
        return (
          <a
            href={processedHref}
            target={isInternal ? undefined : "_blank"}
            rel={isInternal ? undefined : "noopener noreferrer"}
            onClick={isInternal ? (e) => {
              e.preventDefault();
              const id = href?.slice(1);
              if (id && onNavigate) onNavigate(id);
            } : undefined}
          >
            {children}
          </a>
        );
      },
      code: ({ className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        const codeString = String(children).replace(/\n$/, '');
        if (match) {
          return <EnhancedCodeBlock codeString={codeString} language={match[1]} />;
        }
        return <code>{children}</code>;
      },
      img: ({ src, alt }) => {
        let processedSrc = (src && (src.startsWith('./') || src.startsWith('../'))) ? new URL(src, window.location.href).href : src;
        return (
          <figure>
            <img src={processedSrc} alt={alt || ''} loading="lazy" />
            {alt && <figcaption>{alt}</figcaption>}
          </figure>
        );
      }
    };

    createRoot(wrapper).render(
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={enhancedComponents}
        skipHtml={false}
      >
        {content}
      </ReactMarkdown>
    );
  }, [content, lang, moduleName, onNavigate, slug]);

  if (error) {
    return <ErrorDisplay message={error} lang={lang} />;
  }

  if (loading) {
    return <LoadingSpinner lang={lang} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{
        minHeight: '200px',
        width: '100%',
        display: 'block'
      }}
    />
  );
}

export default memo(MarkdownRenderer);

export const SkipToContent = ({ targetId = 'main-content' }: { targetId?: string; }) => {
  return (
    <a
      href={`#${targetId}`}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-50`}
    >
      {t('skipToMainContent')}
    </a>
  );
};