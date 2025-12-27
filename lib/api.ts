
import { Project, Message, ApiHealth, ProjectUsage } from '../types';

const BASE_URL = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  return response.json();
}

export const api = {
  projects: {
    list: () => fetch(`${BASE_URL}/projects`).then(res => handleResponse<Project[]>(res)),
    get: (id: string) => fetch(`${BASE_URL}/projects/${id}`).then(res => handleResponse<Project>(res)),
    create: (data: Partial<Project>) => fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => handleResponse<Project>(res)),
    usage: (id: string) => fetch(`${BASE_URL}/projects/${id}/usage`).then(res => handleResponse<ProjectUsage>(res)),
    approveEstimate: (id: string) => fetch(`${BASE_URL}/projects/${id}/approve-estimate`, { method: 'POST' }).then(res => handleResponse(res)),
    sendEmail: (id: string) => fetch(`${BASE_URL}/projects/${id}/send-email`, { method: 'POST' }).then(res => handleResponse(res)),
  },
  chat: {
    send: (id: string, message: string) => fetch(`${BASE_URL}/projects/${id}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => handleResponse<Message>(res)),
  },
  health: {
    check: () => fetch(`${BASE_URL}/health`).then(res => handleResponse<ApiHealth[]>(res)),
  }
};
