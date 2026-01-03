import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function ExtractPDFPages() {
  return (
    <PlaceholderPDFTool
      toolName="Extract PDF Pages"
      description="Select a PDF and choose specific pages to extract into a new PDF document."
      accept=".pdf"
      multiple={false}
    />
  );
}
