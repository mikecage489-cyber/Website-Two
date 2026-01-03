import ComingSoonTool from './ComingSoonTool';

export default function PDFToPDFA() {
  return (
    <ComingSoonTool
      toolName="PDF to PDF/A"
      description="We're working on PDF/A conversion for long-term archival. Convert your PDFs to ISO-standardized PDF/A format for compliance and preservation."
      features={[
        'Convert to PDF/A-1b, PDF/A-2b, or PDF/A-3b',
        'ISO 19005 compliance validation',
        'Embed all fonts and resources',
        'Remove non-compliant elements',
        'Archival-quality output',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

