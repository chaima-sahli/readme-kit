// src/App.jsx
import { ThemeProvider } from './components/theme-provider'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable'
import { Button } from './components/ui/button'
import { Toolbar } from './components/Toolbar'
import { Preview } from './components/Preview'
import { GuidePopover } from './components/GuidePopover'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Download, Copy } from 'lucide-react'

function App() {
  // Use localStorage to auto-save the README content
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
`)

  // Function to export as .md file
  const exportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Function to copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      // You could add a toast notification here
      console.log('Copied!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-primary">📝 README Builder</h1>
            <GuidePopover />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportMarkdown}>
              <Download className="h-4 w-4 mr-2" /> Export MD
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
          </div>
        </header>

        {/* Toolbar */}
        <Toolbar markdown={markdown} setMarkdown={setMarkdown} />

        {/* Main Content - Split View */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full relative">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full p-4 bg-background text-foreground resize-none outline-none font-mono text-sm"
                placeholder="Write your README here..."
                spellCheck="false"
              />
              <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                {markdown.split(/\s+/).filter(Boolean).length} words
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Preview Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <Preview markdown={markdown} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ThemeProvider>
  )
}

export default App