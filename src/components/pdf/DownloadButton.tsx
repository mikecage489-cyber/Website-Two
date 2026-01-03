import { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';

interface DownloadButtonProps {
  file: Blob;
  filename: string;
  onDownload: (blob: Blob, filename: string) => void;
  label?: string;
  allowRename?: boolean;
}

export default function DownloadButton({
  file,
  filename,
  onDownload,
  label = 'Download',
  allowRename = false,
}: DownloadButtonProps) {
  const [customFilename, setCustomFilename] = useState(filename);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    onDownload(file, customFilename);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3">
      {allowRename && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File Name
          </label>
          <input
            type="text"
            value={customFilename}
            onChange={(e) => setCustomFilename(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      <div className="flex items-center justify-center">
        <button
          onClick={handleDownload}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
            downloaded
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {downloaded ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>{label}</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-600">
        File size: <strong>{formatFileSize(file.size)}</strong>
      </div>
    </div>
  );
}
