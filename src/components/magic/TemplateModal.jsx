// src/components/magic/TemplateModal.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, FileText, Sparkles } from 'lucide-react';
import { TEMPLATES } from './data/templates';

export function TemplateModal({ isOpen, onClose, onInsert }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTemplate(null);
    }
  }, [isOpen]);

  const handleInsert = () => {
    if (selectedTemplate) {
      onInsert(selectedTemplate.content);
      onClose();
    }
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
          className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a4a]/50 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a4a]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#bd93f9]/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-[#bd93f9]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#f8f8f2]">Choose a Template</h2>
                <p className="text-[10px] text-[#6272a4]">Select a README template to insert</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Template Grid */}
          <div className="p-4 overflow-y-auto max-h-[55vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(TEMPLATES).map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTemplate(
                    selectedTemplate?.id === template.id ? null : template
                  )}
                  className={`p-4 rounded-2xl border transition-all duration-200 text-left ${
                    selectedTemplate?.id === template.id
                      ? 'border-[#bd93f9] bg-[#bd93f9]/10'
                      : 'border-[#2a2a4a]/50 hover:border-[#bd93f9]/50 hover:bg-[#2a2a4a]/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#f8f8f2]">
                        {template.label}
                      </div>
                      <div className="text-[10px] text-[#6272a4] mt-0.5">
                        {template.description}
                      </div>
                      <div className="text-[9px] text-[#6272a4] mt-1 opacity-50">
                        {template.content.substring(0, 80)}...
                      </div>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <Check className="h-4 w-4 text-[#50fa7b] flex-shrink-0 mt-1" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#2a2a4a]/50 flex justify-between items-center">
            <div className="text-[10px] text-[#6272a4]">
              {selectedTemplate ? '1 template selected' : 'No template selected'}
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
                disabled={!selectedTemplate}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                  selectedTemplate
                    ? 'bg-[#bd93f9] text-[#0f0e1a] hover:bg-[#bd93f9]/90'
                    : 'bg-[#2a2a4a] text-[#6272a4] cursor-not-allowed'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Insert Template
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}