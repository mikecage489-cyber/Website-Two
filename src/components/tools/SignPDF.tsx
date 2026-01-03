import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function SignPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Sign PDF"
      description="Add digital signatures to PDF documents for authentication and verification."
      accept=".pdf"
      multiple={false}
    />
  );
}
