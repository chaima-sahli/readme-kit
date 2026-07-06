import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Command } from 'lucide-react';

const shortcuts = [
  { keys: ['Ctrl', 'S'], description: 'Save README' },
  { keys: ['Ctrl', 'C'], description: 'Copy text' },
  { keys: ['Ctrl', 'Shift', 'E'], description: 'Focus Editor' },
  { keys: ['Ctrl', 'Shift', 'P'], description: 'Focus Preview' },
  { keys: ['Ctrl', 'Shift', 'S'], description: 'Switch to Split view' },
  { keys: ['Ctrl', 'Shift', 'V'], description: 'Toggle Split/Preview' },
];

export function KeyboardShortcutsGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-lg text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
        title="Keyboard Shortcuts"
      >
        <Command className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a4a]/50 shadow-2xl max-w-md w-full"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#bd93f9]/20 flex items-center justify-center">
                    <Keyboard className="h-4 w-4 text-[#bd93f9]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-[#f8f8f2]">Keyboard Shortcuts</h2>
                    <p className="text-[10px] text-[#6272a4]">Speed up your workflow</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-[#2a2a4a]/30 last:border-0">
                    <span className="text-sm text-[#f8f8f2]">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, i) => (
                        <span key={i}>
                          <span className="px-2 py-0.5 rounded bg-[#2a2a4a]/50 text-xs text-[#6272a4] font-mono">
                            {key}
                          </span>
                          {i < shortcut.keys.length - 1 && (
                            <span className="text-[#6272a4] mx-0.5 text-xs">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[#2a2a4a]/50">
                <p className="text-[10px] text-[#6272a4] text-center">
                  💡 For Mac users, use Cmd instead of Ctrl
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}