import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

export function Preview({ markdown }) {
  return (
    // Changed from p-8 to p-6 and added h-full
    <div className="h-full overflow-auto bg-[#0f0e1a] p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        // Added h-full here too
        className="h-full prose prose-invert max-w-3xl mx-auto prose-headings:text-[#bd93f9] prose-strong:text-[#ff79c6] prose-code:text-[#50fa7b] prose-a:text-[#8be9fd] prose-a:no-underline hover:prose-a:underline prose-ul:text-[#f1fa8c] prose-ol:text-[#f1fa8c] prose-blockquote:text-[#f1fa8c] prose-blockquote:border-l-[#bd93f9]"
      >
        <div className="bg-[#1a1a2e]/50 rounded-3xl p-8 border border-[#2a2a4a]/30 backdrop-blur-sm min-h-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative group my-4">
                    <div className="absolute top-2 right-3 text-[10px] text-[#6272a4] bg-[#0f0e1a] px-2 py-0.5 rounded-full border border-[#2a2a4a]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-2xl border border-[#2a2a4a]/50"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-[#2a2a4a]/50 px-2 py-0.5 rounded-lg text-[#50fa7b] text-sm" {...props}>
                    {children}
                  </code>
                );
              },
              h1({ children }) {
                return <h1 className="text-4xl font-bold mb-6 text-[#bd93f9] border-b border-[#2a2a4a]/50 pb-4">{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="text-3xl font-bold mb-4 text-[#bd93f9] border-b border-[#2a2a4a]/50 pb-3">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-2xl font-bold mb-3 text-[#bd93f9]">{children}</h3>;
              },
              p({ children }) {
                return <p className="mb-4 text-[#f8f8f2]/90 leading-relaxed">{children}</p>;
              },
              a({ href, children }) {
                return <a href={href} className="text-[#8be9fd] hover:text-[#bd93f9] transition-colors duration-200 underline-offset-2 hover:underline">{children}</a>;
              },
              blockquote({ children }) {
                return <blockquote className="border-l-4 border-[#bd93f9] pl-6 my-6 text-[#f1fa8c] bg-[#2a2a4a]/20 py-3 rounded-r-2xl">{children}</blockquote>;
              },
              ul({ children }) {
                return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;
              },
              li({ children }) {
                return <li className="text-[#f8f8f2]/80">{children}</li>;
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-6 rounded-2xl border border-[#2a2a4a]/50">
                    <table className="min-w-full">{children}</table>
                  </div>
                );
              },
              th({ children }) {
                return <th className="border-b border-[#2a2a4a]/50 bg-[#1a1a2e] px-4 py-3 text-left text-[#bd93f9] font-semibold">{children}</th>;
              },
              td({ children }) {
                return <td className="border-b border-[#2a2a4a]/30 px-4 py-3 text-[#f8f8f2]/80">{children}</td>;
              },
              hr() {
                return <hr className="border-[#2a2a4a]/50 my-8" />;
              },
            }}
          >
            {markdown || '*Start writing your README in the editor →*'}
          </ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
}