import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function ProtectPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Protect PDF"
      description="Add password protection and encryption to secure your PDF documents."
      accept=".pdf"
      multiple={false}
    />
  );
}
