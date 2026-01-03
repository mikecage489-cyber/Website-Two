import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import PDFPreview from '../pdf/PDFPreview';
import { getPDFInfo } from '../../utils/pdfUtils';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFToJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');
  const [quality, setQuality] = useState(0.92);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleFileSelect = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
      setSelectedPages([]);
      setError('');
      setSuccess(false);

      try {
        const info = await getPDFInfo(selectedFile);
        setPageCount(info.pageCount);
        // Select all pages by default
        setSelectedPages(Array.from({ length: info.pageCount }, (_, i) => i + 1));
      } catch (err) {
        console.error('Error getting PDF info:', err);
        setError('Failed to load PDF information');
      }
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((p) => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (selectedPages.length === 0) {
      setError('Please select at least one page to convert');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // Sort selected pages
      const sortedPages = [...selectedPages].sort((a, b) => a - b);

      for (const pageNum of sortedPages) {
        const page = await pdf.getPage(pageNum);
        const scale = 2.0; // Higher scale for better quality
        const viewport = page.getViewport({ scale });

        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render page to canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
        } as any).promise;

        // Convert to image
        const imageBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
            },
            format === 'jpeg' ? 'image/jpeg' : 'image/png',
            quality
          );
        });

        // Download image
        const link = document.createElement('a');
        link.href = URL.createObjectURL(imageBlob);
        const extension = format === 'jpeg' ? 'jpg' : 'png';
        link.download = `page-${pageNum}.${extension}`;
        link.click();

        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      setSuccess(true);
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Failed to convert PDF to images. Please ensure the file is a valid PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSelectedPages([]);
    setError('');
    setSuccess(false);
    setPageCount(0);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <PDFUploader
          onFileSelect={handleFileSelect}
          multiple={false}
          label="Select PDF file to convert to images"
        />
      ) : (
        <>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-gray-600">
                  {selectedPages.length} of {pageCount} page{pageCount !== 1 ? 's' : ''} selected
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'jpeg' | 'png')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="jpeg">JPEG (smaller file size)</option>
                <option value="png">PNG (higher quality)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <PDFPreview
            file={file}
            selectedPages={selectedPages}
            onPageSelect={handlePageSelect}
            showCheckboxes={true}
          />

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleConvert}
              disabled={isProcessing || selectedPages.length === 0}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Converting to Images...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Convert & Download Images</span>
                </>
              )}
            </button>

            {selectedPages.length === 0 && (
              <p className="text-sm text-amber-600">
                Select pages to convert by clicking the checkboxes
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
            <p className="font-medium mb-1">PDF converted to images successfully!</p>
            <p>Your downloads should start automatically.</p>
          </div>
        </div>
      )}
    </div>
  );
}

