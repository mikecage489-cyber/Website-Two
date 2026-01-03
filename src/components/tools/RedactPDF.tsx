import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function RedactPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Redact PDF"
      description="Permanently remove sensitive information from PDF documents for privacy and security."
      accept=".pdf"
      multiple={false}
    />
  );
}
