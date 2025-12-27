
import React, { useState } from 'react';
import { useParams } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { StageProgress } from '../components/StageProgress';
import { ChatPanel } from '../components/ChatPanel';
import { DocTabs } from '../components/DocTabs';
import { ActionButtons } from '../components/ActionButtons';
import { api } from '../lib/api';
import { queryKeys, queryClient } from '../lib/query';
import { ToastProvider, useToast } from '../components/ui/Toast';
import { Project, Message, ProjectStage } from '../types';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const mockStages: ProjectStage[] = [
    { id: '1', label: 'Mission', status: 'done' },
    { id: '2', label: 'Estimates', status: 'running' },
    { id: '3', label: 'Assets', status: 'todo' },
    { id: '4', label: 'Email', status: 'todo' },
    { id: '5', label: 'Guide', status: 'todo' }
  ];

  const { data: project } = useQuery({
    queryKey: queryKeys.project(id!),
    queryFn: () => api.projects.get(id!),
    initialData: { id, name: 'Project Details', client: 'Client Name', createdAt: '', updatedAt: '', stages: mockStages } as Project
  });

  const { data: projects = [] } = useQuery({ queryKey: queryKeys.projects, queryFn: api.projects.list });
  const { data: usage } = useQuery({ queryKey: queryKeys.usage(id!), queryFn: () => api.projects.usage(id!), initialData: { tokens: 12500, cost: 42.12, limit: 100000 } });
  const { data: health = [] } = useQuery({ queryKey: queryKeys.health, queryFn: api.health.check });

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Project "Global Brand Refresh" initialized. I have indexed the initial brief. Would you like me to generate a mission summary?', timestamp: new Date().toISOString() }
  ]);

  const chatMutation = useMutation({
    mutationFn: (msg: string) => api.chat.send(id!, msg),
    onSuccess: (response) => {
      setMessages(prev => [...prev, response]);
    },
    onError: () => toast('Failed to send message', 'error')
  });

  const handleSendMessage = (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    chatMutation.mutate(content);
  };

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      <LeftSidebar projects={projects} isLoading={false} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/30">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{project.name}</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{project.client} • PROJECT_ID_{id}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500">LAST SYNC: 2m ago</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-border">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>

        <StageProgress stages={project.stages.length ? project.stages : mockStages} />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 flex flex-col">
            <ChatPanel 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isLoading={chatMutation.isPending} 
            />
          </div>
          <div className="w-1/2 flex flex-col bg-surface/10 border-l border-border">
            <DocTabs 
              proposal={`# Project Proposal: ${project.name}\n\n## Overview\nThis proposal outlines the strategy for the brand refresh...`} 
              report={`# Internal Strategy Report\n\n## Risk Assessment\nLow impact on current production schedules...`} 
              guide={`# Execution Guide\n\n1. Initial Design Sprints\n2. Feedback Loops\n3. Final Handover`} 
            />
          </div>
        </div>

        <ActionButtons 
          onGenerate={() => toast('Estimates generation started', 'info')}
          onApprove={() => toast('Approving and generating PDFs...', 'success')}
          onSendEmail={() => toast('Email preview modal coming soon', 'info')}
          onReset={() => toast('Resetting project state...', 'info')}
        />
      </div>

      <RightSidebar health={health} usage={usage} />
    </div>
  );
};

const WrappedProjectDetailPage = () => (
  <ToastProvider>
    <ProjectDetailPage />
  </ToastProvider>
);

export default WrappedProjectDetailPage;
