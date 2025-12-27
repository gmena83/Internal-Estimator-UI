
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const queryKeys = {
  projects: ['projects'] as const,
  project: (id: string) => ['project', id] as const,
  usage: (id: string) => ['usage', id] as const,
  health: ['health'] as const,
};
