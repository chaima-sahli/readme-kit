import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Heading1, Heading2, Heading3,
  Bold, Italic, Code,
  List, ListOrdered,
  Table, Link, Image,
  FileCode,
} from 'lucide-react';

export function Toolbar({ markdown, setMarkdown, editorRef }) {
  // Get the editor view from the ref
  const getView = () => {
    if (!editorRef?.current) {
      console.log('Editor ref not available');
      return null;
    }
    const view = editorRef.current.getView?.();
    if (!view) {
      console.log('View not available yet');
      return null;
    }
    return view;
  };

  // Get current selection from CodeMirror
  const getSelection = () => {
    const view = getView();
    if (!view) return { start: 0, end: 0, selectedText: '' };
    
    const selection = view.state.selection.main;
    const start = selection.from;
    const end = selection.to;
    const selectedText = view.state.sliceDoc(start, end);
    
    return { start, end, selectedText };
  };

  // Insert text at cursor position
  const insertText = (prefix, suffix = '') => {
    const view = getView();
    if (!view) {
      console.log('No view available, using fallback');
      // Fallback: append to the end
      setMarkdown(markdown + '\n' + prefix + suffix);
      return;
    }

    const { start, end, selectedText } = getSelection();
    
    let newText;
    let cursorOffset = 0;
    
    if (selectedText) {
      newText = markdown.substring(0, start) + 
                prefix + selectedText + suffix + 
                markdown.substring(end);
      cursorOffset = prefix.length + selectedText.length + suffix.length;
    } else {
      newText = markdown.substring(0, start) + 
                prefix + suffix + 
                markdown.substring(end);
      cursorOffset = prefix.length;
    }
    
    setMarkdown(newText);
    
    // Focus and set cursor after update
    setTimeout(() => {
      view.focus();
      const newPos = start + cursorOffset;
      view.dispatch({
        selection: { anchor: newPos, head: newPos },
      });
    }, 10);
  };

  // Insert heading
  const insertHeading = (level) => {
  const view = getView();
  if (!view) {
    setMarkdown(markdown + '\n' + '#'.repeat(level) + ' ');
    return;
  }
  
  const { start } = getSelection();
  const lineStart = markdown.lastIndexOf('\n', start - 1) + 1;
  const lineEnd = markdown.indexOf('\n', start);
  const currentLine = markdown.substring(lineStart, lineEnd === -1 ? markdown.length : lineEnd);
  
  const headingMatch = currentLine.match(/^(#+)\s*/);
  const newPrefix = '#'.repeat(level) + ' ';
  
  let newText;
  let cursorOffset = 0;
  
  if (headingMatch) {
    // Replace existing heading
    newText = markdown.substring(0, lineStart) + 
              newPrefix + 
              currentLine.substring(headingMatch[0].length) + 
              markdown.substring(lineEnd === -1 ? markdown.length : lineEnd);
    // FIX: Cursor goes after the # and space
    cursorOffset = lineStart + newPrefix.length;
  } else {
    // Insert new heading
    newText = markdown.substring(0, lineStart) + 
              newPrefix + 
              currentLine + 
              markdown.substring(lineEnd === -1 ? markdown.length : lineEnd);
    // FIX: Cursor goes after the # and space
    cursorOffset = lineStart + newPrefix.length + currentLine.length;
  }
  
  setMarkdown(newText);
  
  setTimeout(() => {
    view.focus();
    view.dispatch({
      selection: { anchor: cursorOffset, head: cursorOffset },
    });
  }, 10);
};

  // Insert list item
  const insertListItem = (ordered = false) => {
    const view = getView();
    if (!view) {
      setMarkdown(markdown + '\n' + (ordered ? '1. ' : '- '));
      return;
    }
    
    const { start } = getSelection();
    const lineStart = markdown.lastIndexOf('\n', start - 1) + 1;
    const currentLine = markdown.substring(lineStart, start);
    
    const isStartOfLine = currentLine.trim() === '';
    const prefix = ordered ? '1. ' : '- ';
    
    let newText;
    if (isStartOfLine) {
      newText = markdown.substring(0, lineStart) + 
                prefix + 
                markdown.substring(lineStart);
    } else {
      newText = markdown.substring(0, start) + 
                '\n' + prefix + 
                markdown.substring(start);
    }
    
    setMarkdown(newText);
    setTimeout(() => view.focus(), 10);
  };

  // Insert code block
  const insertCodeBlock = () => {
    const view = getView();
    if (!view) {
      setMarkdown(markdown + '\n```js\n\n```');
      return;
    }
    
    const { start, end, selectedText } = getSelection();
    
    let newText;
    let cursorOffset = 0;
    
    if (selectedText) {
      newText = markdown.substring(0, start) + 
                '```js\n' + selectedText + '\n```' + 
                markdown.substring(end);
      cursorOffset = 7 + selectedText.length + 4;
    } else {
      newText = markdown.substring(0, start) + 
                '```js\n\n```' + 
                markdown.substring(start);
      cursorOffset = 7;
    }
    
    setMarkdown(newText);
    
    setTimeout(() => {
      view.focus();
      const newPos = start + cursorOffset;
      view.dispatch({
        selection: { anchor: newPos, head: newPos },
      });
    }, 10);
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
      <Button variant="ghost" size="sm" onClick={() => insertText('**', '**')} title="Bold (Ctrl+B)">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertText('*', '*')} title="Italic (Ctrl+I)">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => insertText('`', '`')} title="Inline Code">
        <Code className="h-4 w-4" />
      </Button>
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

      {/* Placeholders */}
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