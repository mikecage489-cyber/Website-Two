import { useState, useEffect } from 'react';
import { Download, Loader, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { imagesToPDF, downloadFile } from '../../utils/pdfUtils';

export default function ScanToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Cleanup object URLs when files change or component unmounts
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

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
      const pdfBlob = await imagesToPDF(files);
      downloadFile(pdfBlob, 'scanned-document.pdf');
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to convert images to PDF. Please ensure all files are valid JPG or PNG images.'
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setError('');
    setSuccess(false);
  };

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <PDFUploader
          onFileSelect={handleFilesSelect}
          accept="image/jpeg,image/jpg,image/png"
          multiple={true}
          label="Select images to convert to PDF"
          maxSize={50}
        />
      ) : (
        <>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {files.length} image{files.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-gray-600">
                  Total size: {(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Upload Different Images
            </button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Images will be converted to PDF in the order they were uploaded. 
              Each image will become a separate page in the PDF.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrls[index]}
                    alt={file.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-2 bg-white border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">Page {index + 1}</p>
                </div>
              </div>
            ))}
          </div>

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
                  <span>Convert to PDF</span>
                </>
              )}
            </button>
          </div>
        </>
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
          <div className="text-sm text-green-600">
            <p className="font-medium mb-1">PDF created successfully!</p>
            <p>Your download should start automatically.</p>
          </div>
        </div>
      )}
    </div>
  );
}

