import { useRef, useState, useMemo } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Toolbar } from './components/Toolbar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MagicButton } from './components/magic';
import { EditorContainer } from './components/EditorContainer';
import { PreviewContainer } from './components/PreviewContainer';

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

  // Memoized counts for performance
  const wordCount = useMemo(() => 
    markdown.split(/\s+/).filter(Boolean).length, 
    [markdown]
  );
  const charCount = useMemo(() => markdown.length, [markdown]);

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

  // Helper to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'split':
        return (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
              <EditorContainer editorRef={editorRef} markdown={markdown} setMarkdown={setMarkdown} />
            </ResizablePanel>
            <ResizableHandle className="bg-[#2a2a4a]/50 hover:bg-[#bd93f9] transition-colors duration-300 w-1" />
            <ResizablePanel defaultSize={50} minSize={30}>
              <PreviewContainer markdown={markdown} />
            </ResizablePanel>
          </ResizablePanelGroup>
        );
      case 'editor':
        return <EditorContainer editorRef={editorRef} markdown={markdown} setMarkdown={setMarkdown} showLabel />;
      case 'preview':
        return <PreviewContainer markdown={markdown} showLabel />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col bg-[#0f0e1a]">
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          markdown={markdown}
          onSave={handleSave}
          onExport={exportMarkdown}
          onCopy={copyToClipboard}
          isSaving={isSaving}
          showCopied={showCopied}
        />

        <Toolbar markdown={markdown} setMarkdown={setMarkdown} editorRef={editorRef}>

          <MagicButton markdown={markdown} setMarkdown={setMarkdown} />
        </Toolbar>

        <motion.div 
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {renderContent()}
        </motion.div>

        <Footer wordCount={wordCount} charCount={charCount} />
      </div>
    </ThemeProvider>
  );
}

export default App;