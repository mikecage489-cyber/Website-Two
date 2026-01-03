import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function OCRPDF() {
  return (
    <PlaceholderPDFTool
      toolName="OCR PDF"
      description="Convert scanned PDFs to searchable and editable text using optical character recognition."
      accept=".pdf"
      multiple={false}
    />
  );
}
