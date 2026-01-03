import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function UnlockPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Unlock PDF"
      description="Remove password protection from PDF files (you must know the password)."
      accept=".pdf"
      multiple={false}
    />
  );
}
