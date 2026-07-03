import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function Footer({ wordCount, charCount }) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="border-t border-[#2a2a4a]/50 px-6 py-2 flex justify-between items-center bg-[#0f0e1a]"
    >
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
      <div className="flex items-center gap-3 text-[10px] text-[#6272a4] font-mono">
        <span className="flex items-center gap-1.5">
          <Coffee className="h-3 w-3 text-[#f1fa8c]" />
          built with ❤️
        </span>
        <span className="text-[#2a2a4a]">|</span>
        <span>dracula</span>
      </div>
    </motion.div>
  );
}