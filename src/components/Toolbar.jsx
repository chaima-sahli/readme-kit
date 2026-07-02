// src/components/Toolbar.jsx
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Heading1, Heading2, Heading3,
  Bold, Italic, Code,
  List, ListOrdered,
  Table, Link, Image,
  
} from 'lucide-react'

export function Toolbar({ markdown, setMarkdown }) {
  // Function to insert markdown at cursor position
  const insertMarkdown = (syntax, wrap = false) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    let newText;
    if (wrap && selectedText) {
      // Wrap selected text (e.g., **bold**)
      newText = markdown.substring(0, start) + 
                syntax + selectedText + syntax + 
                markdown.substring(end);
    } else {
      // Insert at cursor (e.g., # heading)
      newText = markdown.substring(0, start) + 
                syntax + 
                markdown.substring(end);
    }
    
    setMarkdown(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + syntax.length;
      textarea.selectionStart = newCursorPos;
      textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="border-b border-border p-2 flex flex-wrap gap-1 items-center bg-card/50">
      {/* Headings */}
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('# ')}>
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('## ')}>
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('### ')}>
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Formatting */}
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('**', true)}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('*', true)}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('`', true)}>
        <Code className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists */}
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('- ')}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertMarkdown('1. ')}>
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Insert */}
      <Button variant="ghost" size="sm">
        <Table className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Link className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Image className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" className="text-primary">
        🏷️ Badge
      </Button>
    </div>
  );
}