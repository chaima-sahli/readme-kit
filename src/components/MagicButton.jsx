// src/components/MagicButton.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles, Zap, Star, Feather } from "lucide-react";

const magicActions = [
  {
    id: "format",
    icon: <Sparkles className='h-3.5 w-3.5' />,
    label: "Auto-format",
    description: "Fix spacing and structure",
    action: (markdown) => {
      let formatted = markdown;
      // Add a nice header if missing
      if (!formatted.startsWith("#")) {
        formatted = "# My Project\n\n" + formatted;
      }
      // Ensure proper spacing around headers
      formatted = formatted.replace(/([^\n])(\n#{1,6} )/g, "$1\n\n$2");
      // Ensure proper spacing around code blocks
      formatted = formatted.replace(/```(\w+)\n([\s\S]*?)```/g, (match) => {
        return "\n" + match + "\n";
      });
      return formatted;
    },
  },
  {
    id: "template",
    icon: <Zap className='h-3.5 w-3.5' />,
    label: "Add Template",
    description: "Insert a project template",
    action: (markdown) => {
      const templates = [
        "\n\n## 🚀 Quick Start\n```bash\nnpm install\nnpm start\n```",
        "\n\n## 📦 Tech Stack\n- React\n- Tailwind CSS\n- Vite",
        "\n\n## ✨ Features\n- Feature 1\n- Feature 2\n- Feature 3",
        "\n\n## 📝 License\nMIT",
      ];
      const random = templates[Math.floor(Math.random() * templates.length)];
      return markdown + random;
    },
  },
 // Updated MagicButton.jsx - Better badge options
{
  id: 'badge',
  icon: <Star className="h-3.5 w-3.5" />,
  label: 'Add Badges',
  description: 'Add project badges',
  action: (markdown) => {
    // Ask what the project is about
    const projectType = window.prompt('What type of project?\n(react, vue, node, python, or custom)') || 'react';
    
    const badgeSets = {
      react: [
        '![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)',
        '![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)',
        '![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)'
      ],
      vue: [
        '![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat&logo=vue.js&logoColor=white)',
        '![Nuxt](https://img.shields.io/badge/Nuxt-00C58E?style=flat&logo=nuxt.js&logoColor=white)'
      ],
      node: [
        '![Node](https://img.shields.io/badge/Node-339933?style=flat&logo=node.js&logoColor=white)',
        '![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)'
      ],
      python: [
        '![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)',
        '![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)'
      ]
    };
    
    const badges = badgeSets[projectType] || [
      '![Status](https://img.shields.io/badge/status-active-brightgreen)',
      '![License](https://img.shields.io/badge/license-MIT-blue)'
    ];
    
    return markdown + '\n\n<!-- Badges -->\n' + badges.join(' ') + '\n';
  }
},
  {
    id: "greeting",
    icon: <Feather className='h-3.5 w-3.5' />,
    label: "Add Greeting",
    description: "A friendly welcome message",
    action: (markdown) => {
      const greetings = [
        "\n\n> ✨ Welcome to the project! Feel free to contribute.",
        "\n\n> 🌟 Thanks for stopping by! Let's build something great.",
        "\n\n> 🚀 Happy coding! May your bugs be few.",
        "\n\n> 💡 Ideas? Feedback? Let's chat!",
      ];
      const random = greetings[Math.floor(Math.random() * greetings.length)];
      return markdown + random;
    },
  },
];

export function MagicButton({ markdown, setMarkdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMagicActive, setIsMagicActive] = useState(false);

  const handleMagic = (actionFn) => {
    setIsMagicActive(true);
    const newMarkdown = actionFn(markdown);
    setMarkdown(newMarkdown);
    setTimeout(() => {
      setIsMagicActive(false);
      setIsOpen(false);
    }, 500);
  };

  return (
    <div className='relative'>
      <motion.button
        variants={{
          idle: { scale: 1 },
          hover: {
            scale: 1.08,
            transition: { type: "spring", stiffness: 400 },
          },
          tap: { scale: 0.92 },
        }}
        initial='idle'
        whileHover='hover'
        whileTap='tap'
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs px-2 ${
          isMagicActive
            ? "bg-[#bd93f9]/30 text-[#bd93f9]"
            : "text-[#6272a4] hover:text-[#bd93f9] hover:bg-[#2a2a4a]/50"
        }`}
        title='Magic ✨'
      >
        <Wand2
          className={`h-3.5 w-3.5 ${isMagicActive ? "animate-spin" : ""}`}
        />
        <span className='text-[10px] font-medium'>magic</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ type: "spring", damping: 20 }}
            className='absolute right-0 top-full mt-2 w-56 bg-[#1a1a2e] rounded-2xl border border-[#2a2a4a]/50 shadow-xl overflow-hidden z-50'
          >
            <div className='p-2'>
              <div className='px-2 py-1.5 text-[10px] font-medium text-[#6272a4] uppercase tracking-wider'>
                ✨ Magic Spells
              </div>
              {magicActions.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMagic(item.action)}
                  className='w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-[#2a2a4a]/50 transition-all duration-200 group'
                >
                  <span className='text-[#6272a4] group-hover:text-[#bd93f9] transition-colors'>
                    {item.icon}
                  </span>
                  <div>
                    <div className='text-xs text-[#f8f8f2]'>{item.label}</div>
                    <div className='text-[10px] text-[#6272a4]'>
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
