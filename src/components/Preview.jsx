import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function Preview({ markdown }) {
  return (
    <div className="h-full overflow-auto p-6 bg-background">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Handle code blocks with syntax highlighting
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
            // Style headings
            h1({ children }) {
              return <h1 className="text-4xl font-bold mb-4 text-foreground">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-3xl font-bold mb-3 text-foreground">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-2xl font-bold mb-2 text-foreground">{children}</h3>;
            },
            // Style lists
            ul({ children }) {
              return <ul className="list-disc pl-6 mb-4">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
            },
            // Style paragraphs
            p({ children }) {
              return <p className="mb-4 text-foreground/90">{children}</p>;
            },
            // Style tables
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-border">{children}</table>
                </div>
              );
            },
            th({ children }) {
              return <th className="border border-border bg-card px-4 py-2 text-left">{children}</th>;
            },
            td({ children }) {
              return <td className="border border-border px-4 py-2">{children}</td>;
            },
            // Style links
            a({ href, children }) {
              return <a href={href} className="text-primary hover:underline">{children}</a>;
            },
            // Style blockquotes
            blockquote({ children }) {
              return <blockquote className="border-l-4 border-primary pl-4 my-4 text-muted-foreground">{children}</blockquote>;
            }
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}