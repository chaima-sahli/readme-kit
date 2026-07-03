import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Feather, Wand2 } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 'format',
    icon: <Sparkles className="h-3.5 w-3.5" />,
    label: 'Auto-format',
    description: 'Fix spacing and structure',
  },
  {
    id: 'template',
    icon: <Zap className="h-3.5 w-3.5" />,
    label: 'Add Template',
    description: 'Insert a complete README template',
  },
  {
    id: 'badge',
    icon: <Star className="h-3.5 w-3.5" />,
    label: 'Add Badges',
    description: 'Open badge picker',
  },
  {
    id: 'greeting',
    icon: <Feather className="h-3.5 w-3.5" />,
    label: 'Add Greeting',
    description: 'A friendly welcome message',
  },
];

export function MagicMenu({ isOpen, onItemClick, lastAction, isMagicActive }) {
  return (
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
            <div className="px-2 py-1.5 text-[10px] font-medium text-[#6272a4] uppercase tracking-wider flex items-center gap-2">
              <Wand2 className="h-3 w-3" />
              Magic Spells
            </div>
            {MENU_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onItemClick(item.id)}
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
  );
}