import { useLocalStorage } from '../hooks/useLocalStorage';

export function Editor({ value, onChange }) {
  return (
    <div className="h-full relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 bg-background text-foreground resize-none outline-none font-mono text-sm"
        placeholder="# Write your README here..."
        spellCheck="false"
      />
      <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
        {value.split(/\s+/).filter(Boolean).length} words
      </div>
    </div>
  );
}