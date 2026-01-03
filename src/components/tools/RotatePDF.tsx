import { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle, RotateCw } from 'lucide-react';
import PDFUploader from '../pdf/PDFUploader';
import { rotatePDF, downloadFile } from '../../utils/pdfUtils';

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);

  const handleFileSelect = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
      setSuccess(false);
    }
  };

  const handleRotate = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      const rotatedBlob = await rotatePDF(file, rotation);
      downloadFile(rotatedBlob, `rotated-${rotation}-${file.name}`);
      setSuccess(true);
    } catch (err) {
      setError('Failed to rotate PDF. Please ensure the file is a valid PDF document.');
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
        label="Select PDF file to rotate"
      />

      {file && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Rotation Angle
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[90, 180, 270].map((angle) => (
                <button
                  key={angle}
                  onClick={() => setRotation(angle as 90 | 180 | 270)}
                  className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                    rotation === angle
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-400'
                  }`}
                >
                  <RotateCw className="w-6 h-6" />
                  <span className="font-medium">{angle}°</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={handleRotate}
              disabled={isProcessing}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Rotating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Rotate & Download</span>
                </>
              )}
            </button>
          </div>
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
            PDF rotated successfully! Your download should start automatically.
          </p>
        </div>
      )}
    </div>
  );
}
