
import React from 'react';

// A placeholder for a robust markdown renderer. 
// In a real production app, use 'react-markdown' with 'remark-gfm'.
export const Markdown: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-primary mt-6 mb-4">{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-primary/80 mt-5 mb-3">{line.slice(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-slate-200 mt-4 mb-2">{line.slice(4)}</h3>;
        if (line.match(/^\d+\. /)) return <div key={i} className="ml-4 my-1">{line}</div>;
        if (line.startsWith('- ')) return <div key={i} className="ml-4 my-1">• {line.slice(2)}</div>;
        return <p key={i} className="mb-2 text-slate-300">{line}</p>;
      })}
    </div>
  );
};
