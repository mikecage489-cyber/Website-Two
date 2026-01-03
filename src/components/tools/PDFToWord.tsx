import ComingSoonTool from './ComingSoonTool';

export default function PDFToWord() {
  return (
    <ComingSoonTool
      toolName="PDF to Word"
      description="We're developing an intelligent PDF to Word converter. Extract text and formatting from your PDFs and convert them to fully editable Word documents."
      features={[
        'Convert PDF to DOC/DOCX format',
        'Preserve text formatting and styles',
        'Extract and maintain images',
        'Recreate tables and layouts',
        'Support for multi-column layouts',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

