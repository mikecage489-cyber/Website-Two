import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function PDFToWord() {
  return (
    <PlaceholderPDFTool
      toolName="PDF to Word"
      description="Convert PDF files to editable Word documents (DOC, DOCX) while preserving formatting."
      accept=".pdf"
      multiple={false}
    />
  );
}
