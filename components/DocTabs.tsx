
import React, { useState } from 'react';

interface DocTabsProps {
  proposal: string;
  report: string;
  guide: string;
}

export const DocTabs: React.FC<DocTabsProps> = ({ proposal, report, guide }) => {
  const [activeTab, setActiveTab] = useState<'proposal' | 'report' | 'guide'>('proposal');

  const tabs = [
    { id: 'proposal', label: 'Proposal.md' },
    { id: 'report', label: 'InternalReport.md' },
    { id: 'guide', label: 'ExecutionGuide.md' },
  ] as const;

  const content = {
    proposal,
    report,
    guide,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="flex border-b border-border bg-surface/30 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(26,213,230,0.5)]" />
            )}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-8 font-mono text-sm leading-relaxed">
        <div className="max-w-3xl mx-auto prose prose-invert">
          {content[activeTab] ? (
            <pre className="whitespace-pre-wrap break-words text-slate-300">
              {content[activeTab]}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
              <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Document not yet generated. Complete the previous stages to see output here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
