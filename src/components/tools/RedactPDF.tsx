import ComingSoonTool from './ComingSoonTool';

export default function RedactPDF() {
  return (
    <ComingSoonTool
      toolName="Redact PDF"
      description="We're developing an advanced redaction tool. Permanently remove sensitive information from your PDFs to protect privacy and ensure compliance."
      features={[
        'Select areas to redact visually',
        'Search and auto-redact text',
        'Permanently remove content (non-reversible)',
        'Redact images and text',
        'Multiple redaction patterns',
        'GDPR and compliance ready',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

