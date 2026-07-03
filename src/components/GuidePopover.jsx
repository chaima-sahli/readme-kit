// src/components/GuidePopover.jsx
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { HelpCircle } from 'lucide-react';

export function GuidePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1 rounded text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#2a2a4a] transition-all duration-200">
          <HelpCircle className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 max-h-96 overflow-y-auto bg-[#1a1a2e] border-[#2a2a4a] p-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#f8f8f2]">markdown cheat sheet</h4>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between items-center">
              <code className="text-[#bd93f9]"># heading</code>
              <span className="text-[10px] text-[#6272a4]">h1</span>
            </div>
            <div className="flex justify-between items-center">
              <code className="text-[#bd93f9]">## heading</code>
              <span className="text-[10px] text-[#6272a4]">h2</span>
            </div>
            <div className="flex justify-between items-center">
              <code className="text-[#bd93f9]">### heading</code>
              <span className="text-[10px] text-[#6272a4]">h3</span>
            </div>
            <Separator className="bg-[#2a2a4a]" />
            <div className="flex justify-between items-center">
              <code className="text-[#ff79c6]">**bold**</code>
              <span className="text-[10px] text-[#6272a4]">ctrl+b</span>
            </div>
            <div className="flex justify-between items-center">
              <code className="text-[#ff79c6]">*italic*</code>
              <span className="text-[10px] text-[#6272a4]">ctrl+i</span>
            </div>
            <div className="flex justify-between items-center">
              <code className="text-[#50fa7b]">`code`</code>
              <span className="text-[10px] text-[#6272a4]">inline</span>
            </div>
            <Separator className="bg-[#2a2a4a]" />
            <div className="flex justify-between items-center">
              <code className="text-[#f1fa8c]">- item</code>
              <span className="text-[10px] text-[#6272a4]">bullet</span>
            </div>
            <div className="flex justify-between items-center">
              <code className="text-[#f1fa8c]">1. item</code>
              <span className="text-[10px] text-[#6272a4]">numbered</span>
            </div>
            <Separator className="bg-[#2a2a4a]" />
            <div className="flex justify-between items-center">
              <code className="text-[#8be9fd]">[link](url)</code>
              <span className="text-[10px] text-[#6272a4]">link</span>
            </div>
            <div className="flex justify-between items-center">
              <code className="text-[#8be9fd]">![alt](img)</code>
              <span className="text-[10px] text-[#6272a4]">image</span>
            </div>
          </div>

          <Separator className="bg-[#2a2a4a]" />
          
          <div className="text-[10px] text-[#6272a4]">
            💡 select text + click a button to wrap it
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}