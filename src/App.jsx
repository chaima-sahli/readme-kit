// src/App.jsx
import { useRef, useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Toolbar } from './components/Toolbar';
import { Preview } from './components/Preview';
import { GuidePopover } from './components/GuidePopover';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  Download, Copy, Save, Eye, Code2, Sparkles, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Editor } from './components/Editor';

function App() {
  const editorRef = useRef();
  const [markdown, setMarkdown] = useLocalStorage('readme-content', `# My Awesome Project

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`javascript
console.log("Hello World");
\`\`\`
`);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('split');
  const [showCopied, setShowCopied] = useState(false);

  const exportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col bg-[#0f0e1a]">
        {/* Header - Warm & Inviting */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#2a2a4a]/50 p-4 flex justify-between items-center bg-[#0f0e1a] backdrop-blur-sm"
        >
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

          <div className="flex items-center gap-3">
            {/* View Toggle - Rounded & Friendly */}
            <motion.div 
              className="flex items-center gap-1 bg-[#1a1a2e] rounded-2xl p-1 border border-[#2a2a4a]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { id: 'split', icon: <><Code2 className="h-3.5 w-3.5" /><Eye className="h-3.5 w-3.5" /></>, label: 'Split' },
                { id: 'editor', icon: <Code2 className="h-3.5 w-3.5" />, label: 'Edit' },
                { id: 'preview', icon: <Eye className="h-3.5 w-3.5" />, label: 'View' },
              ].map((tab) => (
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

            <div className="w-px h-8 bg-[#2a2a4a]/50" />

            {/* Action Buttons - Warm & Friendly */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
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
                onClick={exportMarkdown}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a]/50 transition-all duration-200 flex items-center gap-2"
              >
                <Download className="h-3.5 w-3.5" />
                export
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
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

        {/* Toolbar - Rounded & Friendly */}
        <Toolbar markdown={markdown} setMarkdown={setMarkdown} editorRef={editorRef} />

        {/* Main Content */}
        <motion.div 
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'split' && (
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full relative">
                  <div className="rounded-none h-full overflow-hidden">
                    <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle className="bg-[#2a2a4a]/50 hover:bg-[#bd93f9] transition-colors duration-300 w-1" />
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full relative">
                  
                  <Preview markdown={markdown} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}

          {activeTab === 'editor' && (
            <div className="h-full relative">
              <div className="absolute top-4 left-4 z-10 text-[10px] text-[#6272a4] bg-[#1a1a2e]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-[#2a2a4a]/50">
                <Code2 className="h-3 w-3" />
                <span className="font-mono">editor</span>
              </div>
              <div className="rounded-none h-full overflow-hidden">
                <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full relative">
              <div className="absolute top-4 right-4 z-10 text-[10px] text-[#6272a4] bg-[#1a1a2e]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-[#2a2a4a]/50">
                <Eye className="h-3 w-3" />
                <span className="font-mono">preview</span>
              </div>
              <Preview markdown={markdown} />
            </div>
          )}
        </motion.div>

        {/* Footer - Friendly Status Bar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-[#2a2a4a]/50 px-6 py-2 flex justify-between items-center bg-[#0f0e1a]"
        >
          <div className="flex items-center gap-4 text-[10px] text-[#6272a4] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#50fa7b] animate-pulse" />
              autosave
            </span>
            <span className="text-[#2a2a4a]">|</span>
            <span>{markdown.split(/\s+/).filter(Boolean).length} words</span>
            <span className="text-[#2a2a4a]">|</span>
            <span>{markdown.length} chars</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[#6272a4] font-mono">
            <span className="flex items-center gap-1.5">
              <Coffee className="h-3 w-3 text-[#f1fa8c]" />
              built with ❤️
            </span>
            <span className="text-[#2a2a4a]">|</span>
            <span>dracula</span>
          </div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

export default App;