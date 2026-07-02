import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { HelpCircle } from 'lucide-react';

export function GuidePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto bg-card border-border">
        <div className="space-y-4">
          <h4 className="font-semibold text-primary">Markdown Cheatsheet</h4>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-accent font-mono"># Heading 1</span>
              <p className="text-muted-foreground">Main title</p>
            </div>
            <div>
              <span className="text-accent font-mono">## Heading 2</span>
              <p className="text-muted-foreground">Section header</p>
            </div>
            <div>
              <span className="text-accent font-mono">**bold**</span>
              <p className="text-muted-foreground">Bold text</p>
            </div>
            <div>
              <span className="text-accent font-mono">*italic*</span>
              <p className="text-muted-foreground">Italic text</p>
            </div>
            <div>
              <span className="text-accent font-mono">- List item</span>
              <p className="text-muted-foreground">Bulleted list</p>
            </div>
            <div>
              <span className="text-accent font-mono">1. Item</span>
              <p className="text-muted-foreground">Numbered list</p>
            </div>
            <div>
              <span className="text-accent font-mono">`code`</span>
              <p className="text-muted-foreground">Inline code</p>
            </div>
            <div>
              <span className="text-accent font-mono">```js\ncode\n```</span>
              <p className="text-muted-foreground">Code block</p>
            </div>
            <div>
              <span className="text-accent font-mono">[Link](url)</span>
              <p className="text-muted-foreground">Hyperlink</p>
            </div>
            <div>
              <span className="text-accent font-mono">![Alt](image.jpg)</span>
              <p className="text-muted-foreground">Image</p>
            </div>
          </div>

          <Separator className="my-2" />
          
          <div className="text-xs text-muted-foreground">
            💡 Tip: Highlight text and click a button to wrap it!
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}