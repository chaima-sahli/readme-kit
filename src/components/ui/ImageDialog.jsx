import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Check, Link as LinkIcon, Sparkles } from 'lucide-react';

// Inner component — always mounts with fresh state, no useEffect needed
function ImageDialogForm({ onClose, onInsert }) {
  const [alt, setAlt] = useState('');
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('');
  const [caption, setCaption] = useState('');

  const handleInsert = () => {
    if (!url.trim()) return;

    let markdown;

    if (width) {
      markdown = `<img src="${url.trim()}" alt="${alt || 'Image'}" width="${width}" />`;
    } else {
      markdown = `![${alt || 'Image'}](${url.trim()})`;
    }

    if (caption) {
      markdown += `\n\n*${caption}*`;
    }

    onInsert(markdown);
    onClose();
  };

  const sampleImages = [
    { label: 'Screenshot', url: 'https://via.placeholder.com/800x400/282a36/8be9fd?text=Screenshot' },
    { label: 'Diagram', url: 'https://via.placeholder.com/600x400/282a36/f1fa8c?text=Diagram' },
    { label: 'Logo', url: 'https://via.placeholder.com/200x200/282a36/bd93f9?text=Logo' },
    { label: 'Banner', url: 'https://via.placeholder.com/1200x300/282a36/ff79c6?text=Banner' },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#50fa7b]/20 flex items-center justify-center">
            <Image className="h-4 w-4 text-[#50fa7b]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#f8f8f2]">Insert Image</h2>
            <p className="text-[10px] text-[#6272a4]">Add an image to your README</p>
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
      <div className="p-4 overflow-y-auto max-h-[55vh] space-y-4">
        {/* Quick Samples */}
        <div>
          <label className="text-[10px] text-[#6272a4] uppercase tracking-wider mb-2 block">
            Quick Samples
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setUrl(img.url)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-colors ${
                  url === img.url
                    ? 'bg-[#50fa7b]/20 text-[#50fa7b] border border-[#50fa7b]/30'
                    : 'bg-[#2a2a4a]/30 text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  {img.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[#6272a4] flex items-center gap-1.5 mb-1.5">
            <LinkIcon className="h-3 w-3" />
            Image URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] transition-colors"
            autoFocus
          />
        </div>

        <div>
          <label className="text-xs font-medium text-[#6272a4] mb-1.5 block">
            Alt Text (description)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="A screenshot of the app"
            className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-[#6272a4] mb-1.5 block">
            Width (optional, e.g., 300px or 50%)
          </label>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="300px"
            className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] transition-colors"
          />
          <p className="text-[9px] text-[#6272a4] mt-1">
            💡 Leave empty for default size
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-[#6272a4] mb-1.5 block">
            Caption (optional)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Figure 1: App screenshot"
            className="w-full bg-[#0f0e1a] border border-[#2a2a4a]/50 rounded-xl px-4 py-2.5 text-sm text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] transition-colors"
          />
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
          disabled={!url.trim()}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
            url.trim()
              ? 'bg-[#50fa7b] text-[#0f0e1a] hover:bg-[#50fa7b]/90'
              : 'bg-[#2a2a4a] text-[#6272a4] cursor-not-allowed'
          }`}
        >
          <Check className="h-3.5 w-3.5" />
          Insert Image
        </button>
      </div>
    </>
  );
}

export function ImageDialog({ isOpen, onClose, onInsert }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a4a]/50 shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <ImageDialogForm onClose={onClose} onInsert={onInsert} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}