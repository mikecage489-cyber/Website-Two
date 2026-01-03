import ComingSoonTool from './ComingSoonTool';

export default function PDFToPowerPoint() {
  return (
    <ComingSoonTool
      toolName="PDF to PowerPoint"
      description="We're building a PDF to PowerPoint converter. Transform your PDF files into editable PowerPoint presentations with preserved layouts and graphics."
      features={[
        'Convert PDF to PPT/PPTX format',
        'Maintain slide layouts and designs',
        'Extract images and graphics',
        'Preserve text formatting',
        'Support for multi-page PDFs',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

