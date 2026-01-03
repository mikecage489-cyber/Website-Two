import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { compressPDF, downloadFile, getPDFInfo } from '../../utils/pdfUtils';

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileSelect = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
      setSuccess(false);
      setCompressedSize(0);
      
      // Get original file size
      try {
        const info = await getPDFInfo(selectedFiles[0]);
        setOriginalSize(info.fileSize);
      } catch (err) {
        console.error('Error getting PDF info:', err);
      }
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      const compressedBlob = await compressPDF(file);
      setCompressedSize(compressedBlob.size);
      downloadFile(compressedBlob, `compressed-${file.name}`);
      setSuccess(true);
    } catch (err) {
      setError('Failed to compress PDF. Please ensure the file is a valid PDF document.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressionRatio = originalSize && compressedSize
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <PDFUploader
        onFileSelect={handleFileSelect}
        multiple={false}
        label="Select PDF file to compress"
      />

      {file && originalSize > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            Original file size: <strong>{formatFileSize(originalSize)}</strong>
          </p>
        </div>
      )}

      {file && (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleCompress}
            disabled={isProcessing}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Compressing PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Compress & Download</span>
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-start space-x-2 p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && compressedSize > 0 && (
        <div className="flex items-start space-x-2 p-4 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-600">
            <p className="font-medium mb-1">PDF compressed successfully!</p>
            <p>Compressed size: <strong>{formatFileSize(compressedSize)}</strong></p>
            <p>Space saved: <strong>{compressionRatio}%</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
