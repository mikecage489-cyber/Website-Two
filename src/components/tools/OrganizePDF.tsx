import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function OrganizePDF() {
  return (
    <PlaceholderPDFTool
      toolName="Organize PDF"
      description="Reorder, rotate, and organize PDF pages to customize your document layout."
      accept=".pdf"
      multiple={false}
    />
  );
}
