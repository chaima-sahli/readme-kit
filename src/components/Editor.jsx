// src/components/Editor.jsx
import  { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';

export function Editor({ value, onChange }) {
  const editorRef = useRef(null);

  // Force dark theme on the editor element
  useEffect(() => {
    if (editorRef.current) {
      const editorElement = editorRef.current.querySelector('.cm-editor');
      if (editorElement) {
        editorElement.style.background = '#282a36';
        editorElement.style.color = '#f8f8f2';
      }
    }
  }, []);

  return (
    <div className="h-full w-full overflow-auto bg-[#282a36]" ref={editorRef}>
      <CodeMirror
        value={value}
        height="100%"
        width="100%"
        theme={oneDark}
        extensions={[
          markdown(),
          EditorView.theme({
            '&': {
              background: '#282a36 !important',
              color: '#f8f8f2 !important',
              height: '100%',
            },
            '.cm-content': {
              fontFamily: 'monospace',
              fontSize: '14px',
              padding: '16px',
            },
            '.cm-line': {
              color: '#f8f8f2 !important',
            },
            '.cm-gutters': {
              background: '#282a36 !important',
              color: '#6272a4 !important',
              borderRight: '1px solid #44475a',
            },
          }),
        ]}
        onChange={(value) => onChange(value)}
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
        className="h-full w-full"
      />
    </div>
  );
}