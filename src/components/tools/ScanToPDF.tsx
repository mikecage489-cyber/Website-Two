import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function ScanToPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Scan to PDF"
      description="Convert scanned images and documents to PDF format with high quality output."
      accept=".jpg,.jpeg,.png"
      multiple={true}
    />
  );
}
