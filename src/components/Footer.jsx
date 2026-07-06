import { motion } from 'framer-motion';
import { Coffee, Heart, Sparkles } from 'lucide-react';

// Cute animated GitHub SVG component
function GitHubIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function Footer({ wordCount, charCount }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="border-t border-[#2a2a4a]/50 px-6 py-2 flex justify-between items-center bg-[#0f0e1a]"
    >
      {/* Left — Stats */}
      <div className="flex items-center gap-4 text-[10px] text-[#6272a4] font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#50fa7b] animate-pulse" />
          autosave
        </span>
        <span className="text-[#2a2a4a]">|</span>
        <span>{wordCount} words</span>
        <span className="text-[#2a2a4a]">|</span>
        <span>{charCount} chars</span>
      </div>

      {/* Center — GitHub link */}
      <motion.a
        href="https://github.com/chaima-sahli"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a2a4a]/30 border border-[#2a2a4a]/50 text-[10px] text-[#f8f8f2] font-mono hover:bg-[#2a2a4a]/50 hover:border-[#bd93f9]/40 transition-colors group cursor-pointer"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        >
          <GitHubIcon className="h-3.5 w-3.5 text-[#bd93f9] group-hover:text-[#ff79c6] transition-colors" />
        </motion.div>
        <span className="flex items-center gap-1">
          Created by
          <span className="text-[#ff79c6] font-semibold">Chaima Sahli</span>
        </span>
        <Sparkles className="h-3 w-3 text-[#f1fa8c] opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.a>

      {/* Right — Theme */}
      <div className="flex items-center gap-3 text-[10px] text-[#6272a4] font-mono">
        <span className="flex items-center gap-1.5">
          <Coffee className="h-3 w-3 text-[#f1fa8c]" />
          built with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
          >
            <Heart className="h-3 w-3 text-[#ff5555] fill-[#ff5555]" />
          </motion.span>
        </span>
        <span className="text-[#2a2a4a]">|</span>
        <span>dracula</span>
      </div>
    </motion.div>
  );
}