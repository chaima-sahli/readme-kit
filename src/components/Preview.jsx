// src/components/Preview.jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function Preview({ markdown }) {
  return (
    <div className="h-full overflow-auto p-6 bg-background">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto">
                  <table className="border border-border">{children}</table>
                </div>
              );
            },
            th({ children }) {
              return <th className="border border-border bg-card px-4 py-2">{children}</th>;
            },
            td({ children }) {
              return <td className="border border-border px-4 py-2">{children}</td>;
            }
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}