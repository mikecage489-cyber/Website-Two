import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function RemovePDFPages() {
  return (
    <PlaceholderPDFTool
      toolName="Remove PDF Pages"
      description="Select a PDF and specify which pages to remove. The tool will create a new PDF without the selected pages."
      accept=".pdf"
      multiple={false}
    />
  );
}
