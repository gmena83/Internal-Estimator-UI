
export type StageStatus = 'todo' | 'running' | 'done' | 'error';

export interface ProjectStage {
  id: string;
  label: string;
  status: StageStatus;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  createdAt: string;
  updatedAt: string;
  stages: ProjectStage[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ApiHealth {
  provider: string;
  status: 'online' | 'degraded' | 'offline';
  latency: number;
  errorRate: number;
}

export interface ProjectUsage {
  tokens: number;
  cost: number;
  limit: number;
}
