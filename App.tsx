
import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query';
import ProjectsPage from './routes/ProjectsPage';
import ProjectDetailPage from './routes/ProjectDetailPage';
import { Toaster } from './components/ui/Toast';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full bg-background text-slate-200 overflow-hidden">
        <Router>
          <Switch>
            <Route path="/" component={ProjectsPage} />
            <Route path="/project/:id" component={ProjectDetailPage} />
            <Route>404 Not Found</Route>
          </Switch>
        </Router>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
