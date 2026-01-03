import { useState, useEffect } from 'react';
import PDFPageThumbnail from './PDFPageThumbnail';
import { getPDFInfo } from '../../utils/pdfUtils';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface PDFPreviewProps {
  file: File;
  selectedPages?: number[];
  onPageSelect?: (pageNumber: number) => void;
  showCheckboxes?: boolean;
  onRotate?: (pageNumber: number, rotation: number) => void;
  onDelete?: (pageNumber: number) => void;
  pageRotations?: Record<number, number>;
}

export default function PDFPreview({
  file,
  selectedPages = [],
  onPageSelect,
  showCheckboxes = false,
  onRotate,
  onDelete,
  pageRotations = {},
}: PDFPreviewProps) {
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPDFInfo = async () => {
      try {
        setIsLoading(true);
        const info = await getPDFInfo(file);
        setPageCount(info.pageCount);
        setError('');
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF. Please ensure the file is valid.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPDFInfo();
  }, [file]);

  const handleSelectAll = () => {
    if (!onPageSelect) return;
    for (let i = 1; i <= pageCount; i++) {
      if (!selectedPages.includes(i)) {
        onPageSelect(i);
      }
    }
  };

  const handleDeselectAll = () => {
    if (!onPageSelect) return;
    selectedPages.forEach(page => onPageSelect(page));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <strong>{pageCount}</strong> page{pageCount !== 1 ? 's' : ''}
          {selectedPages.length > 0 && (
            <span className="ml-2">
              • <strong>{selectedPages.length}</strong> selected
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {showCheckboxes && onPageSelect && (
            <div className="flex space-x-2">
              <button
                onClick={handleSelectAll}
                disabled={selectedPages.length === pageCount}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                disabled={selectedPages.length === 0}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deselect All
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 py-1">
            <button
              onClick={() => setScale(Math.max(0.5, scale - 0.25))}
              disabled={scale <= 0.5}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(Math.min(2, scale + 0.25))}
              disabled={scale >= 2}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${150 * scale}px, 1fr))`,
        }}
      >
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
          <PDFPageThumbnail
            key={pageNum}
            file={file}
            pageNumber={pageNum}
            selected={selectedPages.includes(pageNum)}
            onSelect={onPageSelect}
            showCheckbox={showCheckboxes}
            onRotate={onRotate}
            onDelete={onDelete}
            rotation={pageRotations[pageNum] || 0}
          />
        ))}
      </div>
    </div>
  );
}
