import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function RepairPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Repair PDF"
      description="Attempt to fix corrupted or damaged PDF files and recover your content."
      accept=".pdf"
      multiple={false}
    />
  );
}
