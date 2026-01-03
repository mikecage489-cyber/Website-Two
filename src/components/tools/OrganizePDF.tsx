import { useState } from 'react';
import { Loader, AlertCircle, CheckCircle, RotateCw, Save } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import PDFPreview from '../pdf/PDFPreview';
import { organizePDF, downloadFile, getPDFInfo } from '../../utils/pdfUtils';

export default function OrganizePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>({});
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set());
  const [pageCount, setPageCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
      setPageRotations({});
      setDeletedPages(new Set());
      setError('');
      setSuccess(false);

      try {
        const info = await getPDFInfo(selectedFile);
        setPageCount(info.pageCount);
      } catch (err) {
        console.error('Error getting PDF info:', err);
        setError('Failed to load PDF information');
      }
    }
  };

  const handlePageRotate = (pageNumber: number, rotation: number) => {
    setPageRotations((prev) => ({
      ...prev,
      [pageNumber]: rotation,
    }));
  };

  const handlePageDelete = (pageNumber: number) => {
    setDeletedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageNumber)) {
        newSet.delete(pageNumber);
      } else {
        newSet.add(pageNumber);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      // Create page order excluding deleted pages
      const pageOrder = Array.from({ length: pageCount }, (_, i) => i)
        .filter((i) => !deletedPages.has(i + 1));

      if (pageOrder.length === 0) {
        setError('Cannot delete all pages from the PDF');
        setIsProcessing(false);
        return;
      }

      const resultBlob = await organizePDF(file, pageOrder, pageRotations);
      downloadFile(resultBlob, `organized-${file.name}`);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to organize PDF. Please ensure the file is a valid PDF document.'
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPageRotations({});
    setDeletedPages(new Set());
    setPageCount(0);
    setError('');
    setSuccess(false);
  };

  const hasChanges = Object.keys(pageRotations).length > 0 || deletedPages.size > 0;

  return (
    <div className="space-y-6">
      {!file ? (
        <PDFUploader
          onFileSelect={handleFileSelect}
          multiple={false}
          label="Select PDF file to organize"
        />
      ) : (
        <>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-gray-600">
                  {deletedPages.size > 0 && `${deletedPages.size} page${deletedPages.size !== 1 ? 's' : ''} marked for deletion • `}
                  {Object.keys(pageRotations).length > 0 && `${Object.keys(pageRotations).length} page${Object.keys(pageRotations).length !== 1 ? 's' : ''} rotated`}
                  {!hasChanges && 'No changes yet'}
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

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Instructions:</strong> Use the rotate button (
              <RotateCw className="inline w-4 h-4" />) to rotate pages 90° clockwise. 
              Use the delete button (×) to mark pages for removal. Click "Save Changes" when done.
            </p>
          </div>

          <PDFPreview
            file={file}
            onRotate={handlePageRotate}
            onDelete={handlePageDelete}
            pageRotations={pageRotations}
          />

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleSave}
              disabled={isProcessing || !hasChanges}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            {!hasChanges && (
              <p className="text-sm text-amber-600">
                Rotate or delete pages to make changes
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
            <p className="font-medium mb-1">PDF organized successfully!</p>
            <p>Your download should start automatically.</p>
          </div>
        </div>
      )}
    </div>
  );
}

