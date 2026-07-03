import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles,  Search, Tag } from 'lucide-react';

// Define ALL badges with categories and tags
const ALL_BADGES = {
  'react': {
    label: 'React',
    icon: '⚛️',
    category: 'Framework',
    tags: ['react', 'ui', 'frontend', 'spa'],
    badge: '![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)'
  },
  'vite': {
    label: 'Vite',
    icon: '⚡',
    category: 'Build Tool',
    tags: ['vite', 'build', 'bundler', 'fast'],
    badge: '![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)'
  },
  'tailwind': {
    label: 'Tailwind CSS',
    icon: '🎨',
    category: 'CSS Framework',
    tags: ['tailwind', 'css', 'styling', 'utility'],
    badge: '![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)'
  },
  'typescript': {
    label: 'TypeScript',
    icon: '📘',
    category: 'Language',
    tags: ['typescript', 'ts', 'typed', 'javascript'],
    badge: '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)'
  },
  'vue': {
    label: 'Vue.js',
    icon: '🟢',
    category: 'Framework',
    tags: ['vue', 'frontend', 'spa'],
    badge: '![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat&logo=vue.js&logoColor=white)'
  },
  'nuxt': {
    label: 'Nuxt',
    icon: '🟢',
    category: 'Framework',
    tags: ['nuxt', 'vue', 'ssr', 'frontend'],
    badge: '![Nuxt](https://img.shields.io/badge/Nuxt-00C58E?style=flat&logo=nuxt.js&logoColor=white)'
  },
  'node': {
    label: 'Node.js',
    icon: '🟩',
    category: 'Runtime',
    tags: ['node', 'backend', 'javascript', 'runtime'],
    badge: '![Node](https://img.shields.io/badge/Node-339933?style=flat&logo=node.js&logoColor=white)'
  },
  'express': {
    label: 'Express',
    icon: '🚂',
    category: 'Framework',
    tags: ['express', 'backend', 'api', 'node'],
    badge: '![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)'
  },
  'mongodb': {
    label: 'MongoDB',
    icon: '🍃',
    category: 'Database',
    tags: ['mongodb', 'database', 'nosql', 'document'],
    badge: '![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)'
  },
  'python': {
    label: 'Python',
    icon: '🐍',
    category: 'Language',
    tags: ['python', 'py', 'backend', 'data'],
    badge: '![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)'
  },
  'django': {
    label: 'Django',
    icon: '🌿',
    category: 'Framework',
    tags: ['django', 'python', 'backend', 'web'],
    badge: '![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)'
  },
  'fastapi': {
    label: 'FastAPI',
    icon: '⚡',
    category: 'Framework',
    tags: ['fastapi', 'python', 'api', 'async'],
    badge: '![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)'
  },
  'nextjs': {
    label: 'Next.js',
    icon: '▲',
    category: 'Framework',
    tags: ['next', 'nextjs', 'react', 'ssr'],
    badge: '![Next](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)'
  },
  'vercel': {
    label: 'Vercel',
    icon: '▲',
    category: 'Deployment',
    tags: ['vercel', 'deploy', 'hosting', 'serverless'],
    badge: '![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)'
  },
  'graphql': {
    label: 'GraphQL',
    icon: '🔮',
    category: 'API',
    tags: ['graphql', 'api', 'query', 'data'],
    badge: '![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white)'
  },
  'rest': {
    label: 'REST API',
    icon: '🔄',
    category: 'API',
    tags: ['rest', 'api', 'http', 'json'],
    badge: '![REST](https://img.shields.io/badge/REST-FF6C37?style=flat&logo=postman&logoColor=white)'
  },
  'jwt': {
    label: 'JWT',
    icon: '🔐',
    category: 'Security',
    tags: ['jwt', 'auth', 'security', 'token'],
    badge: '![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)'
  },
  'jest': {
    label: 'Jest',
    icon: '🧪',
    category: 'Testing',
    tags: ['jest', 'testing', 'unit', 'test'],
    badge: '![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)'
  },
  'pytest': {
    label: 'Pytest',
    icon: '🧪',
    category: 'Testing',
    tags: ['pytest', 'python', 'testing', 'unit'],
    badge: '![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=flat&logo=pytest&logoColor=white)'
  },
  'docker': {
    label: 'Docker',
    icon: '🐳',
    category: 'DevOps',
    tags: ['docker', 'container', 'devops', 'deploy'],
    badge: '![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)'
  },
  'kubernetes': {
    label: 'Kubernetes',
    icon: '☸️',
    category: 'DevOps',
    tags: ['kubernetes', 'k8s', 'container', 'orchestration'],
    badge: '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)'
  },
  'github-actions': {
    label: 'GitHub Actions',
    icon: '🔄',
    category: 'CI/CD',
    tags: ['github', 'actions', 'ci', 'cd'],
    badge: '![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)'
  },
};

// Common standalone badges (licenses, status, etc.)
const COMMON_BADGES = {
  'license-mit': { label: 'MIT License', icon: '📄', category: 'License', badge: '![MIT](https://img.shields.io/badge/License-MIT-blue)' },
  'license-gpl': { label: 'GPLv3 License', icon: '📄', category: 'License', badge: '![GPL](https://img.shields.io/badge/License-GPLv3-red)' },
  'license-apache': { label: 'Apache 2.0', icon: '📄', category: 'License', badge: '![Apache](https://img.shields.io/badge/License-Apache_2.0-yellow)' },
  'status-active': { label: 'Active Development', icon: '✅', category: 'Status', badge: '![Status](https://img.shields.io/badge/status-active-brightgreen)' },
  'status-wip': { label: 'Work in Progress', icon: '🚧', category: 'Status', badge: '![Status](https://img.shields.io/badge/status-work_in_progress-yellow)' },
  'status-deprecated': { label: 'Deprecated', icon: '⚠️', category: 'Status', badge: '![Status](https://img.shields.io/badge/status-deprecated-red)' },
  'coverage-100': { label: '100% Coverage', icon: '🎯', category: 'Coverage', badge: '![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)' },
  'coverage-80': { label: '80% Coverage', icon: '🎯', category: 'Coverage', badge: '![Coverage](https://img.shields.io/badge/coverage-80%25-yellowgreen)' },
  'node-18': { label: 'Node v18+', icon: '🟩', category: 'Version', badge: '![Node](https://img.shields.io/badge/node-18.x-green)' },
  'node-20': { label: 'Node v20+', icon: '🟩', category: 'Version', badge: '![Node](https://img.shields.io/badge/node-20.x-brightgreen)' },
};

// Combine all badges
const ALL_BADGES_MAP = { ...ALL_BADGES, ...COMMON_BADGES };

// Presets (collections of badges)
const PRESETS = {
  'react': {
    label: 'React Stack',
    icon: '⚛️',
    description: 'React + Tailwind + Vite + TypeScript',
    badges: ['react', 'tailwind', 'vite', 'typescript']
  },
  'vue': {
    label: 'Vue Stack',
    icon: '🟢',
    description: 'Vue + Nuxt + Vite + TypeScript',
    badges: ['vue', 'nuxt', 'vite', 'typescript']
  },
  'node': {
    label: 'Node Stack',
    icon: '🟩',
    description: 'Node + Express + MongoDB + JWT',
    badges: ['node', 'express', 'mongodb', 'jwt']
  },
  'python': {
    label: 'Python Stack',
    icon: '🐍',
    description: 'Python + Django/FastAPI + Pytest',
    badges: ['python', 'django', 'fastapi', 'pytest']
  },
  'nextjs': {
    label: 'Next.js Stack',
    icon: '▲',
    description: 'Next.js + React + Tailwind + Vercel',
    badges: ['nextjs', 'react', 'tailwind', 'vercel']
  },
  'api': {
    label: 'API Stack',
    icon: '🔮',
    description: 'REST + GraphQL + JWT + Docker',
    badges: ['rest', 'graphql', 'jwt', 'docker']
  }
};

export function BadgeModal({ isOpen, onClose, onInsert }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPreset, setSelectedPreset] = useState(null);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    Object.values(ALL_BADGES_MAP).forEach(badge => {
      if (badge.category) cats.add(badge.category);
    });
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter badges based on search and category
  const filteredBadges = useMemo(() => {
    let results = Object.entries(ALL_BADGES_MAP);
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(([key, badge]) => badge.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(([key, badge]) => {
        const searchable = [
          badge.label,
          badge.category,
          ...(badge.tags || []),
          key
        ].join(' ').toLowerCase();
        return searchable.includes(term);
      });
    }
    
    return results;
  }, [searchTerm, selectedCategory]);

  // Check if a preset matches the search
  const matchingPresets = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase().trim();
    return Object.entries(PRESETS).filter(([key, preset]) => {
      const searchable = [
        preset.label,
        preset.description,
        ...preset.badges
      ].join(' ').toLowerCase();
      return searchable.includes(term);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSelectedBadges([]);
      setSelectedPreset(null);
      setSelectedCategory('all');
    }
  }, [isOpen]);

  const handlePresetClick = (presetKey) => {
    const preset = PRESETS[presetKey];
    setSelectedPreset(presetKey);
    const badgeStrings = preset.badges
      .map(key => ALL_BADGES_MAP[key]?.badge)
      .filter(Boolean);
    setSelectedBadges(badgeStrings);
    setSearchTerm('');
  };

  const toggleBadge = (badge) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter(b => b !== badge));
    } else {
      setSelectedBadges([...selectedBadges, badge]);
    }
    // Clear preset selection if user manually toggles
    if (selectedPreset) setSelectedPreset(null);
  };

  const handleInsert = () => {
    if (selectedBadges.length === 0) return;
    const badgeRow = selectedBadges.join(' ');
    onInsert(badgeRow);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a4a]/50 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#bd93f9]/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-[#bd93f9]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#f8f8f2]">Add Badges</h2>
                <p className="text-[10px] text-[#6272a4]">Search or browse to find badges</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-[#2a2a4a]/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6272a4]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search badges (e.g., 'react', 'database', 'testing')..."
                className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#bd93f9] transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto max-h-[55vh] p-4">
            {/* Search Results - Show matching presets first */}
            {matchingPresets.length > 0 && searchTerm.trim() && (
              <div className="mb-4">
                <div className="text-[10px] text-[#6272a4] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Tag className="h-3 w-3" />
                  Preset Matches
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchingPresets.map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => handlePresetClick(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all duration-200 flex items-center gap-1.5 ${
                        selectedPreset === key
                          ? 'bg-[#bd93f9]/20 text-[#bd93f9] border border-[#bd93f9]/30'
                          : 'bg-[#2a2a4a]/30 text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
                      }`}
                    >
                      <span>{preset.icon}</span>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-4">
              <div className="text-[10px] text-[#6272a4] uppercase tracking-wider mb-2">Category</div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs capitalize transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-[#bd93f9]/20 text-[#bd93f9] border border-[#bd93f9]/30'
                        : 'bg-[#2a2a4a]/30 text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Badge Grid */}
            <div className="space-y-1">
              {filteredBadges.length === 0 ? (
                <div className="text-center py-8 text-[#6272a4] text-sm">
                  <p>No badges found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              ) : (
                filteredBadges.map(([key, badge]) => {
                  const isSelected = selectedBadges.includes(badge.badge);
                  return (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleBadge(badge.badge)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#bd93f9]/10 border border-[#bd93f9]/30'
                          : 'hover:bg-[#2a2a4a]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{badge.icon}</span>
                        <div className="text-left">
                          <div className="text-xs text-[#f8f8f2]">{badge.label}</div>
                          <div className="text-[9px] text-[#6272a4]">{badge.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected && <Check className="h-4 w-4 text-[#50fa7b]" />}
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#2a2a4a]/50 flex justify-between items-center">
            <div className="text-[10px] text-[#6272a4]">
              {selectedBadges.length} badge{selectedBadges.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInsert}
                disabled={selectedBadges.length === 0}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                  selectedBadges.length > 0
                    ? 'bg-[#bd93f9] text-[#0f0e1a] hover:bg-[#bd93f9]/90'
                    : 'bg-[#2a2a4a] text-[#6272a4] cursor-not-allowed'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
                Insert Badges
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}