// src/components/magic/MagicButton.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import { MagicMenu } from './MagicMenu';
import { BadgeModal } from './BadgeModal';
import { TemplateModal } from './TemplateModal';
import { formatAction, greetingAction } from './actions';

export function MagicButton({ markdown, setMarkdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMagicActive, setIsMagicActive] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleMagicAction = (actionFn, actionId) => {
    setIsMagicActive(true);
    setLastAction(actionId);
    try {
      const newMarkdown = actionFn(markdown);
      setMarkdown(newMarkdown);
      setTimeout(() => {
        setIsMagicActive(false);
        setIsOpen(false);
      }, 500);
    } catch (error) {
      console.error('❌ Magic failed:', error);
      setIsMagicActive(false);
    }
  };

  const handleItemClick = (actionId) => {
    switch (actionId) {
      case 'format':
        handleMagicAction(formatAction, 'format');
        break;
      case 'template':
        setIsOpen(false);
        setShowTemplateModal(true);
        break;
      case 'badge':
        setIsOpen(false);
        setShowBadgeModal(true);
        break;
      case 'greeting':
        handleMagicAction(greetingAction, 'greeting');
        break;
      default:
        break;
    }
  };

  const handleBadgeInsert = (badges) => {
    setMarkdown(markdown + '\n\n<!-- Badges -->\n' + badges + '\n');
  };

  const handleTemplateInsert = (templateContent) => {
    setMarkdown(markdown + '\n\n' + templateContent);
  };

  return (
    <>
      <div className="relative">
        <motion.button
          variants={{
            idle: { scale: 1 },
            hover: { scale: 1.08 },
            tap: { scale: 0.92 },
          }}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs px-2 ${
            isMagicActive 
              ? 'bg-[#bd93f9]/30 text-[#bd93f9]' 
              : 'text-[#6272a4] hover:text-[#bd93f9] hover:bg-[#2a2a4a]/50'
          }`}
          title="Magic ✨"
        >
          <Wand2 className={`h-3.5 w-3.5 ${isMagicActive ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-medium">
            {isMagicActive ? 'casting...' : 'magic'}
          </span>
          {lastAction && !isMagicActive && (
            <span className="text-[8px] text-[#50fa7b] ml-0.5">✓</span>
          )}
        </motion.button>

        <MagicMenu 
          isOpen={isOpen}
          onItemClick={handleItemClick}
          lastAction={lastAction}
          isMagicActive={isMagicActive}
        />
      </div>

      <BadgeModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        onInsert={handleBadgeInsert}
      />

      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onInsert={handleTemplateInsert}
      />
    </>
  );
}