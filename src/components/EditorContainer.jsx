import { Editor } from './Editor';

export function EditorContainer({ editorRef, markdown, setMarkdown, showLabel = false }) {
  return (
    <div className="h-full relative">
      {showLabel && (
        <div className="absolute top-4 left-4 z-10 text-[10px] text-[#6272a4] bg-[#1a1a2e]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-[#2a2a4a]/50">
          <span className="font-mono">editor</span>
        </div>
      )}
      <div className="rounded-none h-full overflow-hidden">
        <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
      </div>
    </div>
  );
}