import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function EditPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Edit PDF"
      description="Edit PDF text, images, and content directly in your browser."
      accept=".pdf"
      multiple={false}
    />
  );
}
