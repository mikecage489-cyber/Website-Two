import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function ComparePDF() {
  return (
    <PlaceholderPDFTool
      toolName="Compare PDF"
      description="Compare two PDF documents and highlight differences between them."
      accept=".pdf"
      multiple={true}
    />
  );
}
