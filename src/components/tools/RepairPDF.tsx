import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle, Wrench } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { downloadFile } from '../../utils/pdfUtils';
import { PDFDocument } from 'pdf-lib';

export default function RepairPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [repairDetails, setRepairDetails] = useState('');

  const handleFileSelect = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
      setSuccess(false);
      setRepairDetails('');
    }
  };

  const handleRepair = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);
    setRepairDetails('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Attempt to load and re-save the PDF (basic repair)
      // This will fix minor corruption issues
      const pdf = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true,
        updateMetadata: false 
      });
      
      const pageCount = pdf.getPageCount();
      setRepairDetails(`PDF has ${pageCount} page${pageCount !== 1 ? 's' : ''}`);
      
      // Re-save the PDF with clean structure
      const pdfBytes = await pdf.save();
      const repairedBlob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      
      downloadFile(repairedBlob, `repaired-${file.name}`);
      setSuccess(true);
    } catch (err) {
      console.error('Repair error:', err);
      setError(
        'Failed to repair PDF. The file may be too corrupted or protected. ' +
        'Try removing password protection first if the PDF is encrypted.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError('');
    setSuccess(false);
    setRepairDetails('');
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <PDFUploader
          onFileSelect={handleFileSelect}
          multiple={false}
          label="Select PDF file to repair"
        />
      ) : (
        <>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Wrench className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-gray-600">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
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
              <strong>Note:</strong> This tool attempts to fix basic PDF corruption issues by 
              reloading and resaving the file. It may help with minor structural problems but 
              cannot recover severely damaged files.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleRepair}
              disabled={isProcessing}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Repairing PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Repair & Download</span>
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
            <p className="font-medium mb-1">PDF repaired successfully!</p>
            {repairDetails && <p>{repairDetails}</p>}
            <p>Your download should start automatically.</p>
          </div>
        </div>
      )}
    </div>
  );
}

