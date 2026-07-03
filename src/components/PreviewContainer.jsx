import { Preview } from './Preview';

export function PreviewContainer({ markdown, showLabel = false }) {
  return (
    <div className="h-full relative">
      {showLabel && (
        <div className="absolute top-4 right-4 z-10 text-[10px] text-[#6272a4] bg-[#1a1a2e]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-[#2a2a4a]/50">
          <span className="font-mono">preview</span>
        </div>
      )}
      <Preview markdown={markdown} />
    </div>
  );
}