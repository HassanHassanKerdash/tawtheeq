import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useTranslation, t } from 'kawkab';
import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
import Highlight from 'react-highlight-words';
import sidebarSections from '../../docs/config/sidebarLinks';
import { useVersionStore } from '../stores/useVersionStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchableItem {
  href: string;
  title: string;
  content: string;
  breadcrumbs: string[];
}

// Build a map of all valid documentation links for quick lookups.
const allLinks = sidebarSections.flatMap(section => section.links);
const linkMap = new Map<string, string>();
allLinks.forEach(link => linkMap.set(link.href, link.label));


const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, isRTL } = useTranslation();
  const { version } = useVersionStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchableItem>[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIndexing, setIsIndexing] = useState(true);
  const [fuse, setFuse] = useState<Fuse<SearchableItem> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Effect to build the search index whenever language or version changes.
  useEffect(() => {
    const buildIndex = () => {
      setIsIndexing(true);
      try {
        // Use a reliable glob pattern to find all markdown files recursively.
        const markdownFiles = import.meta.glob('../../docs/markdown/**/*.md', { query: '?raw', import: 'default', eager: true });

        // Filter the found files by the current version and language.
        const filteredPaths = Object.keys(markdownFiles).filter(
          path => path.includes(`/${version}/`) && path.includes(`/${currentLanguage}/`)
        );

        const index: SearchableItem[] = [];
        
        filteredPaths.forEach(path => {
          const content = markdownFiles[path] as string;
          const pathParts = path.split('/');
          
          const slug = pathParts[pathParts.length - 1].replace('.md', '').toLowerCase();
          const href = `/docs/${slug}`;
          
          // Check if this generated href exists in our sidebar configuration.
          // This ensures we only index pages that are actually part of the documentation.
          const titleKey = linkMap.get(href);
          
          if (!titleKey) {
            // Skip this file if it's not listed in the sidebar config.
            return;
          }

          const title = t(titleKey) || slug.replace(/-/g, ' ');
          let breadcrumbs: string[] = [];
          for (const section of sidebarSections) {
            const found = section.links.find(link => link.href === href);
            if (found) {
              breadcrumbs.push(t(section.title));
              break;
            }
          }
          index.push({ href, title, content, breadcrumbs });
        });
        
        // Configure Fuse.js for optimal search quality.
        setFuse(new Fuse(index, {
          keys: [
            { name: 'title', weight: 0.7 }, 
            { name: 'content', weight: 0.3 }
          ],
          includeMatches: true,
          minMatchCharLength: 2,
          // ignoreLocation allows finding substrings anywhere, crucial for fuzzy search and Arabic.
          ignoreLocation: true,
          // A more lenient threshold for better fuzzy matching.
          threshold: 0.5,
        }));

      } catch (error) {
        console.error("Failed to build search index:", error);
      } finally {
        setIsIndexing(false);
      }
    };

    buildIndex();
  }, [currentLanguage, version]);

  // Effect to perform search when the query or fuse index changes.
  useEffect(() => {
    if (query && fuse) {
      setResults(fuse.search(query).slice(0, 10));
      setActiveIndex(0);
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  // Keyboard navigation handler.
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + (results.length || 1)) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        navigate(results[activeIndex].item.href);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [activeIndex, results, navigate, onClose]);
  
  // Effect to manage component state and focus when the modal opens/closes.
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
    } else {
       // Delay focus slightly to ensure the element is visible.
       setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="relative">
          <svg className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isIndexing ? t('search.indexing') : t('search.placeholder')}
            disabled={isIndexing}
            className={`w-full bg-transparent text-white placeholder-gray-500 text-lg py-4 border-b border-[#30363d] focus:outline-none disabled:opacity-50 ${isRTL ? 'pr-12' : 'pl-12'}`}
          />
        </div>

        {!isIndexing && results.length > 0 ? (
          <ul className="max-h-[50vh] overflow-y-auto p-2">
            {results.map((result, index) => (
              <li key={result.item.href}>
                <Link
                  to={result.item.href}
                  onClick={onClose}
                  className={`block p-4 rounded-lg transition-colors ${activeIndex === index ? 'bg-[#2d3748]' : 'hover:bg-[#21262d]'}`}
                  aria-current={activeIndex === index ? 'true' : 'false'}
                >
                  <div className={`flex items-center text-gray-400 text-sm mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {result.item.breadcrumbs.join(` ${isRTL ? '<' : '>'} `)}
                  </div>
                  <h3 className={`text-white font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Highlight
                      searchWords={query.split(' ')}
                      autoEscape={true}
                      textToHighlight={result.item.title}
                      highlightClassName="bg-blue-500/30 text-blue-300 rounded"
                    />
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !isIndexing && query && (
            <div className="p-8 text-center text-gray-500">
              <p>{t('search.noResults')} "{query}"</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchModal;