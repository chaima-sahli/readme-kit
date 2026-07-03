// src/components/Toolbar.jsx
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Heading1, Heading2, Heading3,
  Bold, Italic, Code,
  List, ListOrdered,
  Table, Link, Image,
  FileCode, // ← NEW: Import for code block icon
} from 'lucide-react';

export function Toolbar({ markdown, setMarkdown }) {
  // Function to get current textarea and selection
  const getTextarea = () => document.querySelector('textarea');
  
  // Function to wrap selected text or insert at cursor
  const wrapText = (prefix, suffix = '') => {
    const textarea = getTextarea();
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    let newText;
    let cursorOffset = 0;
    
    if (selectedText) {
      // If text is selected, wrap it
      newText = markdown.substring(0, start) + 
                prefix + selectedText + suffix + 
                markdown.substring(end);
      cursorOffset = prefix.length + selectedText.length + suffix.length;
    } else {
      // If no text selected, just insert and place cursor inside
      newText = markdown.substring(0, start) + 
                prefix + suffix + 
                markdown.substring(end);
      cursorOffset = prefix.length;
    }
    
    setMarkdown(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + cursorOffset;
      textarea.selectionStart = newCursorPos;
      textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);
  };

  // Insert heading at current line
  const insertHeading = (level) => {
    const textarea = getTextarea();
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const lineStart = markdown.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = markdown.indexOf('\n', start);
    const currentLine = markdown.substring(lineStart, lineEnd === -1 ? markdown.length : lineEnd);
    
    // Check if the line already starts with #s
    const headingMatch = currentLine.match(/^(#+)\s*/);
    const newPrefix = '#'.repeat(level) + ' ';
    
    let newText;
    if (headingMatch) {
      // Replace existing heading level
      newText = markdown.substring(0, lineStart) + 
                newPrefix + 
                currentLine.substring(headingMatch[0].length) + 
                markdown.substring(lineEnd === -1 ? markdown.length : lineEnd);
    } else {
      // Insert new heading
      newText = markdown.substring(0, lineStart) + 
                newPrefix + 
                currentLine + 
                markdown.substring(lineEnd === -1 ? markdown.length : lineEnd);
    }
    
    setMarkdown(newText);
    
    // Focus back on textarea
    setTimeout(() => textarea.focus(), 0);
  };

  // Insert list item
  const insertListItem = (ordered = false) => {
    const textarea = getTextarea();
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const lineStart = markdown.lastIndexOf('\n', start - 1) + 1;
    const currentLine = markdown.substring(lineStart, start);
    
    // Check if we're on an empty line or start of line
    const isStartOfLine = currentLine.trim() === '';
    
    let newText;
    if (isStartOfLine) {
      // Insert new list item at current line
      const prefix = ordered ? '1. ' : '- ';
      newText = markdown.substring(0, lineStart) + 
                prefix + 
                markdown.substring(lineStart);
    } else {
      // Insert new list item on a new line
      const prefix = ordered ? '1. ' : '- ';
      newText = markdown.substring(0, start) + 
                '\n' + prefix + 
                markdown.substring(start);
    }
    
    setMarkdown(newText);
    
    // Focus back on textarea
    setTimeout(() => textarea.focus(), 0);
  };

  // NEW: Insert code block
  const insertCodeBlock = () => {
    const textarea = getTextarea();
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    let newText;
    let cursorOffset = 0;
    
    if (selectedText) {
      // Wrap selected text in a code block
      newText = markdown.substring(0, start) + 
                '```js\n' + selectedText + '\n```' + 
                markdown.substring(end);
      cursorOffset = 7 + selectedText.length + 4; // ```js\n + text + \n```
    } else {
      // Insert empty code block with cursor inside
      newText = markdown.substring(0, start) + 
                '```js\n\n```' + 
                markdown.substring(start);
      cursorOffset = 7; // Position cursor after ```js\n
    }
    
    setMarkdown(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + cursorOffset;
      textarea.selectionStart = newCursorPos;
      textarea.selectionEnd = newCursorPos;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="border-b border-border p-2 flex flex-wrap gap-1 items-center bg-card/50">
      {/* Headings */}
      <Button variant="ghost" size="sm" onClick={() => insertHeading(1)} title="Heading 1">
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertHeading(2)} title="Heading 2">
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertHeading(3)} title="Heading 3">
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Formatting */}
      <Button variant="ghost" size="sm" onClick={() => wrapText('**', '**')} title="Bold (Ctrl+B)">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => wrapText('*', '*')} title="Italic (Ctrl+I)">
        <Italic className="h-4 w-4" />
      </Button>
      
      {/* Inline Code */}
      <Button variant="ghost" size="sm" onClick={() => wrapText('`', '`')} title="Inline Code">
        <Code className="h-4 w-4" />
      </Button>
      
      {/* NEW: Code Block */}
      <Button variant="ghost" size="sm" onClick={insertCodeBlock} title="Code Block">
        <FileCode className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists */}
      <Button variant="ghost" size="sm" onClick={() => insertListItem(false)} title="Bullet List">
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertListItem(true)} title="Numbered List">
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Insert - Placeholders */}
      <Button variant="ghost" size="sm" title="Insert Table (Coming soon)">
        <Table className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" title="Insert Link (Coming soon)">
        <Link className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" title="Insert Image (Coming soon)">
        <Image className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" className="text-primary" title="Insert Badge (Coming soon)">
        🏷️ Badge
      </Button>
    </div>
  );
}