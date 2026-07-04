import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, Check, Globe, AtSign } from 'lucide-react';

export function LinkDialog({ isOpen, onClose, onInsert }) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [openInNewTab, setOpenInNewTab] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setText('');
      setUrl('');
      setOpenInNewTab(true);
    }
  }, [isOpen]);

  const handleInsert = () => {
    if (!text.trim() || !url.trim()) return;
    
    let markdown;
    if (openInNewTab) {
      markdown = `[${text}](${url}){target="_blank"}`;
    } else {
      markdown = `[${text}](${url})`;
    }
    onInsert(markdown);
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
          className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a4a]/50 shadow-2xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8be9fd]/20 flex items-center justify-center">
                <LinkIcon className="h-4 w-4 text-[#8be9fd]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#f8f8f2]">Insert Link</h2>
                <p className="text-[10px] text-[#6272a4]">Add a hyperlink to your README</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-[#6272a4] flex items-center gap-1.5 mb-1.5">
                <AtSign className="h-3 w-3" />
                Link Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Click here"
                className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#8be9fd] transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#6272a4] flex items-center gap-1.5 mb-1.5">
                <Globe className="h-3 w-3" />
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#8be9fd] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 bg-[#0f0e1a] rounded-xl p-2 border border-[#2a2a4a]/30">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                id="newTab"
                className="accent-[#8be9fd]"
              />
              <label htmlFor="newTab" className="text-xs text-[#f8f8f2]">
                Open in new tab
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#2a2a4a]/50 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!text.trim() || !url.trim()}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                text.trim() && url.trim()
                  ? 'bg-[#8be9fd] text-[#0f0e1a] hover:bg-[#8be9fd]/90'
                  : 'bg-[#2a2a4a] text-[#6272a4] cursor-not-allowed'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              Insert Link
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}