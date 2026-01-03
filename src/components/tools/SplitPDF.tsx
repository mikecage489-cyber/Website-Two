import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { splitPDF, downloadFile } from '../../utils/pdfUtils';

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleFileSelect = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
      setSuccess(false);
      
      // Get page count
      try {
        const { getPDFInfo } = await import('../../utils/pdfUtils');
        const info = await getPDFInfo(selectedFiles[0]);
        setPageCount(info.pageCount);
      } catch (err) {
        console.error('Error getting PDF info:', err);
      }
    }
  };

  const handleSplit = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      const pages = await splitPDF(file);
      
      // Download each page
      pages.forEach((pageBlob: Blob, index: number) => {
        setTimeout(() => {
          downloadFile(pageBlob, `page-${index + 1}.pdf`);
        }, index * 100); // Stagger downloads slightly
      });
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to split PDF. Please ensure the file is a valid PDF document.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PDFUploader
        onFileSelect={handleFileSelect}
        multiple={false}
        label="Select PDF file to split"
      />

      {file && pageCount > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            This PDF has <strong>{pageCount}</strong> page{pageCount !== 1 ? 's' : ''}. 
            Each page will be saved as a separate PDF file.
          </p>
        </div>
      )}

      {file && (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleSplit}
            disabled={isProcessing}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Splitting PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Split & Download Pages</span>
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

      {success && (
        <div className="flex items-start space-x-2 p-4 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-600">
            PDF split successfully! Your pages are downloading now.
          </p>
        </div>
      )}
    </div>
  );
}
