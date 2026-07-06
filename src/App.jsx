import { useRef, useState, useMemo, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/ui/resizable";
import { Toolbar } from "./components/Toolbar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MagicButton } from "./components/magic";
import { EditorContainer } from "./components/EditorContainer";
import { PreviewContainer } from "./components/PreviewContainer";
import { Toaster, toast } from "sonner";

function App() {
  const editorRef = useRef();
  const [markdown, setMarkdown] = useLocalStorage(
    "readme-content",
    `# My Awesome Project

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
`,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("split");
  const [showCopied, setShowCopied] = useState(false);

  // Memoized counts for performance
  const wordCount = useMemo(
    () => markdown.split(/\s+/).filter(Boolean).length,
    [markdown],
  );
  const charCount = useMemo(() => markdown.length, [markdown]);

  const exportMarkdown = () => {
    try {
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("README exported successfully! 📄", {
        icon: "🎉",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Failed to export README", {
        description: error.message,
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setShowCopied(true);
      toast.success("Copied to clipboard! ✨", {
        icon: "📋",
        duration: 2000,
      });
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy", {
        description: "Please try again",
      });
      console.log(err.description);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    toast.info("Saving...", {
      id: "saving-toast",
      duration: 1000,
    });
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Saved successfully! 💾", {
        id: "saving-toast",
        icon: "✅",
        duration: 2000,
      });
    }, 1000);
  };

  //  Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S or Cmd+S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }

      // Ctrl+C or Cmd+C - Copy (only if text is selected)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        // Let default copy work, but show a toast
        setTimeout(() => {
          if (window.getSelection().toString()) {
            toast.info("Text copied! 📋", { duration: 1500 });
          }
        }, 100);
      }

      // Ctrl+Shift+E - Focus Editor
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "E") {
        e.preventDefault();
        setActiveTab("editor");
        setTimeout(() => {
          const textarea = document.querySelector(".cm-content");
          if (textarea) textarea.focus();
        }, 100);
        toast.info("Switched to Editor mode", { duration: 1500 });
      }

      // Ctrl+Shift+P - Focus Preview
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setActiveTab("preview");
        toast.info("Switched to Preview mode", { duration: 1500 });
      }

      // Ctrl+Shift+S - Switch to Split view
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "S") {
        e.preventDefault();
        setActiveTab("split");
        toast.info("Switched to Split view", { duration: 1500 });
      }

      // Ctrl+Shift+V - Toggle between Split and Preview
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "V") {
        e.preventDefault();
        const nextTab = activeTab === "split" ? "preview" : "split";
        setActiveTab(nextTab);
        toast.info(
          `Switched to ${nextTab === "split" ? "Split" : "Preview"} view`,
          {
            duration: 1500,
          },
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  // Helper to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "split":
        return (
          <ResizablePanelGroup direction='horizontal' className='h-full'>
            <ResizablePanel defaultSize={50} minSize={30}>
              <EditorContainer
                editorRef={editorRef}
                markdown={markdown}
                setMarkdown={setMarkdown}
              />
            </ResizablePanel>
            <ResizableHandle className='bg-[#2a2a4a]/50 hover:bg-[#bd93f9] transition-colors duration-300 w-1' />
            <ResizablePanel defaultSize={50} minSize={30}>
              <PreviewContainer markdown={markdown} />
            </ResizablePanel>
          </ResizablePanelGroup>
        );
      case "editor":
        return (
          <EditorContainer
            editorRef={editorRef}
            markdown={markdown}
            setMarkdown={setMarkdown}
            showLabel
          />
        );
      case "preview":
        return <PreviewContainer markdown={markdown} showLabel />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/*  Toast Container */}
      <Toaster
        position='bottom-right'
        theme='dark'
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "#1a1a2e",
            border: "1px solid #2a2a4a",
            color: "#f8f8f2",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
          className: "toast-custom",
          duration: 3000,
        }}
        className='toast-container'
      />

      

      
      <div className='h-screen flex flex-col bg-[#0f0e1a]'>
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

        <Toolbar
          markdown={markdown}
          setMarkdown={setMarkdown}
          editorRef={editorRef}
        >
          <MagicButton markdown={markdown} setMarkdown={setMarkdown} />
        </Toolbar>

        <motion.div
          className='flex-1 overflow-hidden'
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
