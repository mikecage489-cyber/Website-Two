import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function PDFToPDFA() {
  return (
    <PlaceholderPDFTool
      toolName="PDF to PDF/A"
      description="Convert PDF to PDF/A archival format for long-term storage and preservation."
      accept=".pdf"
      multiple={false}
    />
  );
}
