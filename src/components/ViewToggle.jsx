import { motion } from 'framer-motion';
import { Eye, Code2 } from 'lucide-react';

export function ViewToggle({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'split', icon: <><Code2 className="h-3.5 w-3.5" /><Eye className="h-3.5 w-3.5" /></>, label: 'Split' },
    { id: 'editor', icon: <Code2 className="h-3.5 w-3.5" />, label: 'Edit' },
    { id: 'preview', icon: <Eye className="h-3.5 w-3.5" />, label: 'View' },
  ];

  return (
    <motion.div 
      className="flex items-center gap-1 bg-[#1a1a2e] rounded-2xl p-1 border border-[#2a2a4a]/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(tab.id)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
            activeTab === tab.id 
              ? 'bg-[#bd93f9]/20 text-[#bd93f9] shadow-lg shadow-purple-500/10' 
              : 'text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50'
          }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}