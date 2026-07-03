import { motion } from 'framer-motion';
import { Sparkles, Save, Download, Copy } from 'lucide-react';
import { GuidePopover } from './GuidePopover';
import { ViewToggle } from './ViewToggle';

export function Header({ 
  activeTab, 
  setActiveTab, 
  onSave, 
  onExport, 
  onCopy,
  isSaving,
  showCopied 
}) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-[#2a2a4a]/50 p-4 flex justify-between items-center bg-[#0f0e1a] backdrop-blur-sm"
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -5 }}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center shadow-lg shadow-purple-500/10">
            <span className="text-white text-xl">📝</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#f8f8f2] tracking-tight">
              README Builder
            </h1>
            <p className="text-xs text-[#6272a4] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#f1fa8c]" />
              make it shine ✨
            </p>
          </div>
        </motion.div>
        <GuidePopover />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <ViewToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="w-px h-8 bg-[#2a2a4a]/50" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-all duration-200 flex items-center gap-2"
          >
            <Save className="h-3.5 w-3.5" />
            {isSaving ? (
              <span className="flex items-center gap-1">
                <span className="animate-pulse">●</span> saving
              </span>
            ) : 'save'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExport}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-all duration-200 flex items-center gap-2"
          >
            <Download className="h-3.5 w-3.5" />
            export
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCopy}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
              showCopied 
                ? 'bg-[#50fa7b]/20 text-[#50fa7b]' 
                : 'text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
            }`}
          >
            <Copy className="h-3.5 w-3.5" />
            {showCopied ? (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                copied! ✨
              </motion.span>
            ) : 'copy'}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}