import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function HTMLToPDF() {
  return (
    <PlaceholderPDFTool
      toolName="HTML to PDF"
      description="Convert HTML web pages and files to PDF documents."
      accept=".html,.htm"
      multiple={false}
    />
  );
}
