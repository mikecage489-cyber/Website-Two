import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { imageToPDF, downloadFile } from '../../utils/pdfUtils';

export default function JPGToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError('');
    setSuccess(false);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please upload at least one image file');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      if (files.length === 1) {
        // Single image conversion
        const pdfBlob = await imageToPDF(files[0]);
        const filename = files[0].name.replace(/\.(jpg|jpeg|png)$/i, '.pdf');
        downloadFile(pdfBlob, filename);
      } else {
        // Multiple images - convert each with proper queuing
        for (let i = 0; i < files.length; i++) {
          const pdfBlob = await imageToPDF(files[i]);
          const filename = files[i].name.replace(/\.(jpg|jpeg|png)$/i, '.pdf');
          // Use Promise-based delay for better control
          await new Promise(resolve => setTimeout(resolve, i * 200));
          downloadFile(pdfBlob, filename);
        }
      }
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to convert images to PDF. Please ensure all files are valid JPG or PNG images.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <PDFUploader
        onFileSelect={handleFilesSelect}
        accept=".jpg,.jpeg,.png"
        multiple={true}
        label="Select images to convert"
      />

      {files.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            {files.length} image{files.length !== 1 ? 's' : ''} selected. 
            Each image will be converted to a separate PDF.
          </p>
        </div>
      )}

      {files.length > 0 && (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Converting to PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Convert & Download</span>
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
            Images converted to PDF successfully! Your downloads should start automatically.
          </p>
        </div>
      )}
    </div>
  );
}
