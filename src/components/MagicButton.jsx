import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Zap, Star, Feather } from 'lucide-react';
import { BadgeModal } from './BadgeModal';

export function MagicButton({ markdown, setMarkdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMagicActive, setIsMagicActive] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const handleMagic = (actionFn, actionId) => {
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

  const handleBadgeAction = () => {
    setIsOpen(false);
    setShowBadgeModal(true);
  };

  const handleBadgeInsert = (badges) => {
    setMarkdown(markdown + '\n\n<!-- Badges -->\n' + badges + '\n');
  };

  const magicActions = [
    {
      id: 'format',
      icon: <Sparkles className="h-3.5 w-3.5" />,
      label: 'Auto-format',
      description: 'Fix spacing and structure',
      action: (markdown) => {
        let formatted = markdown;
        if (!formatted.startsWith('#')) {
          formatted = '# My Project\n\n' + formatted;
        }
        formatted = formatted.replace(/([^\n])(\n#{1,6} )/g, '$1\n\n$2');
        formatted = formatted.replace(/```(\w+)\n([\s\S]*?)```/g, (match) => {
          return '\n' + match + '\n';
        });
        return formatted;
      }
    },
    {
      id: 'template',
      icon: <Zap className="h-3.5 w-3.5" />,
      label: 'Add Template',
      description: 'Insert a project template',
      action: (markdown) => {
        const templates = [
          '\n\n## 🚀 Quick Start\n```bash\nnpm install\nnpm start\n```',
          '\n\n## 📦 Tech Stack\n- React\n- Tailwind CSS\n- Vite',
          '\n\n## ✨ Features\n- Feature 1\n- Feature 2\n- Feature 3',
          '\n\n## 📝 License\nMIT',
        ];
        const random = templates[Math.floor(Math.random() * templates.length)];
        return markdown + random;
      }
    },
    {
      id: 'badge',
      icon: <Star className="h-3.5 w-3.5" />,
      label: 'Add Badges',
      description: 'Open badge picker',
      action: null // Special case - opens modal
    },
    {
      id: 'greeting',
      icon: <Feather className="h-3.5 w-3.5" />,
      label: 'Add Greeting',
      description: 'A friendly welcome message',
      action: (markdown) => {
        const greetings = [
          '\n\n> ✨ Welcome to the project! Feel free to contribute.',
          '\n\n> 🌟 Thanks for stopping by! Let\'s build something great.',
          '\n\n> 🚀 Happy coding! May your bugs be few.',
          '\n\n> 💡 Ideas? Feedback? Let\'s chat!'
        ];
        const random = greetings[Math.floor(Math.random() * greetings.length)];
        return markdown + random;
      }
    }
  ];

  const handleActionClick = (item) => {
    if (item.id === 'badge') {
      handleBadgeAction();
    } else if (item.action) {
      handleMagic(item.action, item.id);
    }
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a2e] rounded-2xl border border-[#2a2a4a]/50 shadow-xl overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="px-2 py-1.5 text-[10px] font-medium text-[#6272a4] uppercase tracking-wider">
                  ✨ Magic Spells
                </div>
                {magicActions.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleActionClick(item)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-[#2a2a4a]/50 transition-all duration-200 group"
                  >
                    <span className="text-[#6272a4] group-hover:text-[#bd93f9] transition-colors">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs text-[#f8f8f2]">{item.label}</div>
                      <div className="text-[10px] text-[#6272a4]">{item.description}</div>
                    </div>
                    {lastAction === item.id && !isMagicActive && (
                      <span className="ml-auto text-[#50fa7b] text-xs">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BadgeModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        onInsert={handleBadgeInsert}
      />
    </>
  );
}