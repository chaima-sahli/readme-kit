import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// === EDITOR CHROME (background, gutters, cursor, etc.) ===
const draculaChrome = EditorView.theme({
  '&': {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
  },
  '.cm-content': {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
    caretColor: '#f8f8f2',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '16px',
  },
  '.cm-gutters': {
    backgroundColor: '#282a36',
    color: '#6272a4',
    borderRight: '1px solid #44475a',
  },
  '.cm-activeLine': {
    backgroundColor: '#44475a',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#44475a',
    color: '#f8f8f2',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#44475a',
  },
  '.cm-cursor': {
    borderLeftColor: '#f8f8f2',
  },
  '.cm-matchingBracket': {
    backgroundColor: '#44475a',
    color: '#f8f8f2',
    outline: '1px solid #f8f8f2',
  },
  '.cm-panels': {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
  },
  '.cm-tooltip': {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
    border: '1px solid #44475a',
  },
}, {
  dark: true, // tells CodeMirror this is a dark theme
});

// === SYNTAX HIGHLIGHTING (the actual token colors) ===
const draculaHighlight = HighlightStyle.define([
  // Headings - Purple
  { tag: tags.heading1, color: '#bd93f9', fontWeight: 'bold', fontSize: '1.6em' },
  { tag: tags.heading2, color: '#bd93f9', fontWeight: 'bold', fontSize: '1.4em' },
  { tag: tags.heading3, color: '#bd93f9', fontWeight: 'bold', fontSize: '1.2em' },
  { tag: tags.heading, color: '#bd93f9', fontWeight: 'bold' },

  // Bold / Strong - Pink
  { tag: tags.strong, color: '#ff79c6', fontWeight: 'bold' },

  // Italic / Emphasis - Pink
  { tag: tags.emphasis, color: '#ff79c6', fontStyle: 'italic' },

  // Inline Code - Green
  { tag: tags.monospace, color: '#50fa7b', backgroundColor: 'rgba(68, 71, 90, 0.3)' },

  // Links - Cyan
  { tag: tags.link, color: '#8be9fd', textDecoration: 'underline' },
  { tag: tags.url, color: '#8be9fd', textDecoration: 'underline' },

  // Lists / Bullets - Yellow
  { tag: tags.list, color: '#f1fa8c' },

  // Quotes - Yellow
  { tag: tags.quote, color: '#f1fa8c' },

  // Keywords - Pink
  { tag: tags.keyword, color: '#ff79c6' },

  // Strings - Yellow
  { tag: tags.string, color: '#f1fa8c' },

  // Numbers - Purple
  { tag: tags.number, color: '#bd93f9' },

  // Comments - Gray
  { tag: tags.comment, color: '#6272a4', fontStyle: 'italic' },

  // Meta - Gray
  { tag: tags.meta, color: '#6272a4' },

  // Operators - Pink
  { tag: tags.operator, color: '#ff79c6' },

  // Variables - Foreground
  { tag: tags.variableName, color: '#f8f8f2' },

  // Functions - Green
  { tag: tags.function(tags.variableName), color: '#50fa7b' },
  { tag: tags.function(tags.propertyName), color: '#50fa7b' },

  // Properties - Pink
  { tag: tags.propertyName, color: '#ff79c6' },

  // Attributes - Green
  { tag: tags.attributeName, color: '#50fa7b' },

  // Tags - Pink
  { tag: tags.tagName, color: '#ff79c6' },

  // Atoms / Booleans - Purple
  { tag: tags.atom, color: '#bd93f9' },

  // Types - Cyan
  { tag: tags.typeName, color: '#8be9fd' },

  // Invalid / Errors - Red
  { tag: tags.invalid, color: '#ff5555', textDecoration: 'underline' },

  // Content / Plain text
  { tag: tags.content, color: '#f8f8f2' },

  // Label / Processing instructions
  { tag: tags.labelName, color: '#8be9fd' },
  { tag: tags.processingInstruction, color: '#6272a4' },

  // Punctuation / Brackets
  { tag: tags.punctuation, color: '#f8f8f2' },
  { tag: tags.bracket, color: '#f8f8f2' },

  // Square brackets for links
  { tag: tags.squareBracket, color: '#ff79c6' },

  // Angle brackets
  { tag: tags.angleBracket, color: '#f8f8f2' },
], {
  themeType: 'dark',
});

export const Editor = forwardRef(({ value, onChange }, ref) => {
  const editorRef = useRef();
  const viewRef = useRef(null);

  useEffect(() => {
    const getView = () => {
      if (editorRef.current) {
        const view = editorRef.current.view || 
                    editorRef.current.editor?.view ||
                    editorRef.current;
        if (view && view.state) {
          viewRef.current = view;
        }
      }
    };

    getView();
    const timeout = setTimeout(getView, 100);
    return () => clearTimeout(timeout);
  }, []);

  useImperativeHandle(ref, () => ({
    getView: () => viewRef.current,
    focus: () => viewRef.current?.focus(),
    refresh: () => viewRef.current?.dispatch({}),
  }));

  const handleEditorMount = (view) => {
    viewRef.current = view;
  };

  return (
    <div className="h-full w-full overflow-auto bg-[#282a36]">
      <CodeMirror
        ref={editorRef}
        value={value}
        height="100%"
        width="100%"
        // No theme prop needed — we handle everything via extensions
        extensions={[
          markdown(),
          draculaChrome,
          syntaxHighlighting(draculaHighlight),
        ]}
        onChange={(value) => onChange(value)}
        onMount={handleEditorMount}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
        }}
        className="h-full text-sm font-mono"
      />
    </div>
  );
});