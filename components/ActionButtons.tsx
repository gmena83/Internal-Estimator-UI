
import React from 'react';
import { Button } from './ui/Button';

interface ActionButtonsProps {
  onGenerate: () => void;
  onApprove: () => void;
  onSendEmail: () => void;
  onReset: () => void;
  isProcessing?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onGenerate, 
  onApprove, 
  onSendEmail, 
  onReset,
  isProcessing 
}) => {
  return (
    <div className="flex items-center gap-2 p-4 bg-surface/80 border-t border-border backdrop-blur-md">
      <Button 
        variant="primary" 
        size="sm" 
        onClick={onGenerate} 
        loading={isProcessing}
        className="shadow-[0_0_15px_rgba(26,213,230,0.2)]"
      >
        Generate Estimates
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={onApprove}
        loading={isProcessing}
      >
        Approve & Generate PDFs
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onSendEmail}
      >
        Send Email Preview
      </Button>
      <div className="flex-1" />
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onReset}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
      >
        Reset Project
      </Button>
    </div>
  );
};
