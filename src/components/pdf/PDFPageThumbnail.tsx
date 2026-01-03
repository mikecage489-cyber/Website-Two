import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFPageThumbnailProps {
  file: File;
  pageNumber: number;
  selected?: boolean;
  onSelect?: (pageNumber: number) => void;
  showCheckbox?: boolean;
  onRotate?: (pageNumber: number, rotation: number) => void;
  onDelete?: (pageNumber: number) => void;
  rotation?: number;
}

export default function PDFPageThumbnail({
  file,
  pageNumber,
  selected = false,
  onSelect,
  showCheckbox = false,
  onRotate,
  onDelete,
  rotation = 0,
}: PDFPageThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const renderPage = async () => {
      if (!canvasRef.current) return;

      try {
        setIsLoading(true);
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(pageNumber);

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Calculate scale to fit thumbnail
        const scale = 0.5;
        const viewport = page.getViewport({ scale, rotation });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // Type assertion required due to pdf.js type definition limitations
        // The context and viewport are correctly typed but the full RenderParameters
        // interface requires additional optional properties
        await page.render(renderContext as any).promise;
        setIsLoading(false);
      } catch (err) {
        console.error('Error rendering PDF page:', err);
        setError('Failed to render page');
        setIsLoading(false);
      }
    };

    renderPage();
  }, [file, pageNumber, rotation]);

  return (
    <div
      className={`relative border-2 rounded-lg overflow-hidden transition-all ${
        selected ? 'border-primary-500 shadow-lg' : 'border-gray-300 hover:border-primary-400'
      }`}
    >
      {showCheckbox && (
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect?.(pageNumber)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      )}

      <div className="bg-white p-2">
        {isLoading && (
          <div className="flex items-center justify-center h-48 bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-48 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}
        <canvas ref={canvasRef} className={`max-w-full ${isLoading || error ? 'hidden' : ''}`} />
      </div>

      <div className="p-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Page {pageNumber}</span>
          
          {(onRotate || onDelete) && (
            <div className="flex space-x-1">
              {onRotate && (
                <button
                  onClick={() => onRotate(pageNumber, (rotation + 90) % 360)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Rotate 90°"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(pageNumber)}
                  className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                  title="Delete page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
