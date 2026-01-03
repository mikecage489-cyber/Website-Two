import { useState } from 'react';
import { Loader, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import PDFPreview from '../pdf/PDFPreview';
import { extractPages, downloadFile } from '../../utils/pdfUtils';

export default function ExtractPDFPages() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setSelectedPages([]);
      setError('');
      setSuccess(false);
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((p) => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (selectedPages.length === 0) {
      setError('Please select at least one page to extract');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      // Convert page numbers to 0-based indices and sort them
      const pageIndices = selectedPages.map((p) => p - 1).sort((a, b) => a - b);
      const resultBlob = await extractPages(file, pageIndices);
      downloadFile(resultBlob, `extracted-pages-${file.name}`);
      setSuccess(true);
      setSelectedPages([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to extract pages. Please ensure the file is a valid PDF document.'
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSelectedPages([]);
    setError('');
    setSuccess(false);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <PDFUploader
          onFileSelect={handleFileSelect}
          multiple={false}
          label="Select PDF file to extract pages from"
        />
      ) : (
        <>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-gray-600">
                  {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected for extraction
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Upload Different File
            </button>
          </div>

          <PDFPreview
            file={file}
            selectedPages={selectedPages}
            onPageSelect={handlePageSelect}
            showCheckboxes={true}
          />

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleExtract}
              disabled={isProcessing || selectedPages.length === 0}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Extracting Pages...</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  <span>Extract Selected Pages</span>
                </>
              )}
            </button>

            {selectedPages.length === 0 && (
              <p className="text-sm text-amber-600">
                Select pages to extract by clicking the checkboxes
              </p>
            )}
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
            <p className="font-medium mb-1">Pages extracted successfully!</p>
            <p>Your download should start automatically.</p>
          </div>
        </div>
      )}
    </div>
  );
}

