import { Loader } from 'lucide-react';

interface ProcessingIndicatorProps {
  message?: string;
  progress?: number;
  onCancel?: () => void;
}

export default function ProcessingIndicator({
  message = 'Processing...',
  progress,
  onCancel,
}: ProcessingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Loader className="w-12 h-12 text-primary-600 animate-spin" />
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-900">{message}</p>
        
        {progress !== undefined && (
          <div className="w-64 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
        )}
        
        {progress !== undefined && (
          <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
        )}
      </div>

      {onCancel && (
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
