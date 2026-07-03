import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Table,
  Link,
  Image,
  FileCode,
  Sparkles,

} from "lucide-react";
import {  useCallback } from "react";
import { motion } from "framer-motion";

export function Toolbar({ markdown, setMarkdown, editorRef, children }) {

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.08, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: 0.92 },
  };

  // Get the editor view from the ref - wrapped in useCallback
  const getView = useCallback(() => {
    if (!editorRef?.current) {
      return null;
    }
    const view = editorRef.current.getView?.();
    return view || null;
  }, [editorRef]);

  // Get current selection from CodeMirror - wrapped in useCallback
  const getSelection = useCallback(() => {
    const view = getView();
    if (!view) return { start: 0, end: 0, selectedText: "" };

    const selection = view.state.selection.main;
    const start = selection.from;
    const end = selection.to;
    const selectedText = view.state.sliceDoc(start, end);

    return { start, end, selectedText };
  }, [getView]);

  // Insert text at cursor position - wrapped in useCallback
  const insertText = useCallback((prefix, suffix = "") => {
    const view = getView();
    if (!view) {
      setMarkdown(markdown + "\n" + prefix + suffix);
      return;
    }

    const { start, end, selectedText } = getSelection();

    let newText;
    let cursorOffset = 0;

    if (selectedText) {
      newText =
        markdown.substring(0, start) +
        prefix +
        selectedText +
        suffix +
        markdown.substring(end);
      cursorOffset = prefix.length + selectedText.length + suffix.length;
    } else {
      newText =
        markdown.substring(0, start) +
        prefix +
        suffix +
        markdown.substring(end);
      cursorOffset = prefix.length;
    }

    setMarkdown(newText);

    setTimeout(() => {
      view.focus();
      const newPos = start + cursorOffset;
      view.dispatch({
        selection: { anchor: newPos, head: newPos },
      });
    }, 10);
  }, [markdown, setMarkdown, getView, getSelection]);

  // Insert heading - wrapped in useCallback
  const insertHeading = useCallback((level) => {
    const view = getView();
    if (!view) {
      setMarkdown(markdown + "\n" + "#".repeat(level) + " ");
      return;
    }

    const { start } = getSelection();
    const lineStart = markdown.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = markdown.indexOf("\n", start);
    const currentLine = markdown.substring(
      lineStart,
      lineEnd === -1 ? markdown.length : lineEnd,
    );

    const headingMatch = currentLine.match(/^(#+)\s*/);
    const newPrefix = "#".repeat(level) + " ";

    let newText;
    let cursorOffset = 0;

    if (headingMatch) {
      newText =
        markdown.substring(0, lineStart) +
        newPrefix +
        currentLine.substring(headingMatch[0].length) +
        markdown.substring(lineEnd === -1 ? markdown.length : lineEnd);
      cursorOffset = lineStart + newPrefix.length;
    } else {
      newText =
        markdown.substring(0, lineStart) +
        newPrefix +
        currentLine +
        markdown.substring(lineEnd === -1 ? markdown.length : lineEnd);
      cursorOffset = lineStart + newPrefix.length + currentLine.length;
    }

    setMarkdown(newText);

    setTimeout(() => {
      view.focus();
      view.dispatch({
        selection: { anchor: cursorOffset, head: cursorOffset },
      });
    }, 10);
  }, [markdown, setMarkdown, getView, getSelection]);

  // Insert list item - wrapped in useCallback
  const insertListItem = useCallback((ordered = false) => {
    const view = getView();
    if (!view) {
      setMarkdown(markdown + "\n" + (ordered ? "1. " : "- "));
      return;
    }

    const { start } = getSelection();
    const lineStart = markdown.lastIndexOf("\n", start - 1) + 1;
    const currentLine = markdown.substring(lineStart, start);

    const isStartOfLine = currentLine.trim() === "";
    const prefix = ordered ? "1. " : "- ";

    let newText;
    if (isStartOfLine) {
      newText =
        markdown.substring(0, lineStart) +
        prefix +
        markdown.substring(lineStart);
    } else {
      newText =
        markdown.substring(0, start) +
        "\n" +
        prefix +
        markdown.substring(start);
    }

    setMarkdown(newText);
    setTimeout(() => view.focus(), 10);
  }, [markdown, setMarkdown, getView, getSelection]);

  // Insert code block - wrapped in useCallback
  const insertCodeBlock = useCallback(() => {
    const view = getView();
    if (!view) {
      setMarkdown(markdown + "\n```js\n\n```");
      return;
    }

    const { start, end, selectedText } = getSelection();

    let newText;
    let cursorOffset = 0;

    if (selectedText) {
      newText =
        markdown.substring(0, start) +
        "```js\n" +
        selectedText +
        "\n```" +
        markdown.substring(end);
      cursorOffset = 7 + selectedText.length + 4;
    } else {
      newText =
        markdown.substring(0, start) +
        "```js\n\n```" +
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
  }, [markdown, setMarkdown, getView, getSelection]);

  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="border-b border-[#2a2a4a]/50 px-3 py-2 flex flex-wrap gap-1 items-center bg-[#0f0e1a]"
    >
      {/* Headings Group */}
      <div className="flex items-center gap-0.5 bg-[#1a1a2e] rounded-2xl p-1 border border-[#2a2a4a]/30">
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertHeading(1)}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#bd93f9] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertHeading(2)}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#bd93f9] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertHeading(3)}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#bd93f9] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </motion.button>
      </div>

      <span className="w-px h-6 bg-[#2a2a4a]/50 mx-1" />

      {/* Formatting Group */}
      <div className="flex items-center gap-0.5 bg-[#1a1a2e] rounded-2xl p-1 border border-[#2a2a4a]/30">
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertText('**', '**')}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#ff79c6] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertText('*', '*')}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#ff79c6] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertText('`', '`')}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#50fa7b] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={insertCodeBlock}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#50fa7b] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Code Block"
        >
          <FileCode className="h-4 w-4" />
        </motion.button>
      </div>

      <span className="w-px h-6 bg-[#2a2a4a]/50 mx-1" />

      {/* Lists Group */}
      <div className="flex items-center gap-0.5 bg-[#1a1a2e] rounded-2xl p-1 border border-[#2a2a4a]/30">
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertListItem(false)}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#f1fa8c] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          onClick={() => insertListItem(true)}
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#f1fa8c] hover:bg-[#2a2a4a]/50 transition-all duration-200"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </motion.button>
      </div>

      <span className="w-px h-6 bg-[#2a2a4a]/50 mx-1" />

      {/* Insert Group */}
      <div className="flex items-center gap-0.5 bg-[#1a1a2e] rounded-2xl p-1 border border-[#2a2a4a]/30">
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#8be9fd] hover:bg-[#2a2a4a]/50 transition-all duration-200 cursor-not-allowed opacity-50"
          title="Table (soon)"
          disabled
        >
          <Table className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#8be9fd] hover:bg-[#2a2a4a]/50 transition-all duration-200 cursor-not-allowed opacity-50"
          title="Link (soon)"
          disabled
        >
          <Link className="h-4 w-4" />
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#8be9fd] hover:bg-[#2a2a4a]/50 transition-all duration-200 cursor-not-allowed opacity-50"
          title="Image (soon)"
          disabled
        >
          <Image className="h-4 w-4" />
        </motion.button>
      </div>

      <span className="w-px h-6 bg-[#2a2a4a]/50 mx-1" />

      {/* Badge Button */}
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        className="p-1.5 rounded-xl text-[#6272a4] hover:text-[#f1fa8c] hover:bg-[#2a2a4a]/50 transition-all duration-200 flex items-center gap-1.5 text-xs px-2"
        title="Badge (soon)"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span className="text-[10px] font-medium">badge</span>
      </motion.button>

     
      {children}
    </motion.div>
  );
}