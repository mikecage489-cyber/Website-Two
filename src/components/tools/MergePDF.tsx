import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { mergePDFs, downloadFile } from '../../utils/pdfUtils';

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError('');
    setSuccess(false);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please upload at least 2 PDF files to merge');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      const mergedBlob = await mergePDFs(files);
      downloadFile(mergedBlob, 'merged-document.pdf');
      setSuccess(true);
    } catch (err) {
      setError('Failed to merge PDFs. Please ensure all files are valid PDF documents.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PDFUploader
        onFileSelect={handleFilesSelect}
        multiple={true}
        label="Select PDF files to merge"
      />

      {files.length > 0 && (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleMerge}
            disabled={isProcessing || files.length < 2}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Merging PDFs...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Merge & Download</span>
              </>
            )}
          </button>

          {files.length === 1 && (
            <p className="text-sm text-amber-600">
              Please add at least one more PDF file to merge
            </p>
          )}
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
            PDFs merged successfully! Your download should start automatically.
          </p>
        </div>
      )}
    </div>
  );
}
