import { AlertCircle } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';

interface PlaceholderPDFToolProps {
  toolName: string;
  description: string;
  accept?: string;
  multiple?: boolean;
}

export default function PlaceholderPDFTool({ 
  toolName, 
  description,
  accept = '.pdf',
  multiple = false 
}: PlaceholderPDFToolProps) {
  const handleFileSelect = () => {
    // Placeholder
  };

  return (
    <div className="space-y-6">
      <PDFUploader
        onFileSelect={handleFileSelect}
        accept={accept}
        multiple={multiple}
        label={`Select ${multiple ? 'files' : 'file'} for ${toolName}`}
      />

      <div className="flex items-start space-x-2 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">{toolName}</p>
          <p>{description}</p>
          <p className="mt-2 text-blue-700">
            This tool processes files entirely in your browser - your data never leaves your device.
          </p>
        </div>
      </div>
    </div>
  );
}
