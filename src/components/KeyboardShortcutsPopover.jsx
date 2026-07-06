import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { Command } from 'lucide-react';

const shortcuts = [
  { keys: ['Ctrl', 'S'], description: 'Save README' },
  { keys: ['Ctrl', 'C'], description: 'Copy selected text' },
  { keys: ['Ctrl', 'Shift', 'E'], description: 'Focus Editor' },
  { keys: ['Ctrl', 'Shift', 'P'], description: 'Focus Preview' },
  { keys: ['Ctrl', 'Shift', 'S'], description: 'Switch to Split view' },
  { keys: ['Ctrl', 'Shift', 'V'], description: 'Toggle Split/Preview' },
];

export function KeyboardShortcutsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1 rounded text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a] transition-all duration-200">
          <Command className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 max-h-96 overflow-y-auto bg-[#1a1a2e] border-[#2a2a4a] p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Command className="h-4 w-4 text-[#bd93f9]" />
            <h4 className="text-sm font-medium text-[#f8f8f2]">keyboard shortcuts</h4>
          </div>
          
          <div className="space-y-1.5 text-sm">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="text-[13px] text-[#f8f8f2]">{shortcut.description}</span>
                <div className="flex items-center gap-0.5">
                  {shortcut.keys.map((key, i) => (
                    <span key={i} className="flex items-center gap-0.5">
                      <kbd className="px-1.5 py-0.5 rounded bg-[#2a2a4a]/50 text-[10px] text-[#6272a4] font-mono border border-[#2a2a4a]/30">
                        {key}
                      </kbd>
                      {i < shortcut.keys.length - 1 && (
                        <span className="text-[10px] text-[#6272a4]">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-[#2a2a4a]" />
          
          <div className="text-[10px] text-[#6272a4]">
            💡 For Mac users, use <kbd className="px-1 py-0.5 rounded bg-[#2a2a4a]/50 text-[10px] text-[#6272a4] font-mono">Cmd</kbd> instead of <kbd className="px-1 py-0.5 rounded bg-[#2a2a4a]/50 text-[10px] text-[#6272a4] font-mono">Ctrl</kbd>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}