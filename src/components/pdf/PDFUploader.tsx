import { useCallback, useState } from 'react';
import { Upload, X, File } from 'lucide-react';

interface PDFUploaderProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  label?: string;
}

export default function PDFUploader({ 
  onFileSelect, 
  accept = '.pdf',
  multiple = false,
  maxSize = 50,
  label = 'Upload PDF'
}: PDFUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const validateFiles = useCallback((fileList: FileList): File[] => {
    const validFiles: File[] = [];
    const maxBytes = maxSize * 1024 * 1024;

    Array.from(fileList).forEach(file => {
      if (file.size > maxBytes) {
        setError(`File ${file.name} exceeds ${maxSize}MB limit`);
        return;
      }
      validFiles.push(file);
    });

    return validFiles;
  }, [maxSize]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const validFiles = validateFiles(e.dataTransfer.files);
    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];
      setFiles(newFiles);
      onFileSelect(newFiles);
    }
  }, [files, multiple, onFileSelect, maxSize, validateFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];
        setFiles(newFiles);
        onFileSelect(newFiles);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect(newFiles);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
            >
              {label}
            </label>
            <p className="text-sm text-gray-500 mt-1">
              or drag and drop {multiple ? 'files' : 'a file'} here
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {accept} • Max {maxSize}MB {multiple ? 'per file' : ''}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-gray-500" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
