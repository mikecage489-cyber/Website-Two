import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function AddPageNumbers() {
  return (
    <PlaceholderPDFTool
      toolName="Add Page Numbers"
      description="Add customizable page numbers to your PDF documents with flexible positioning options."
      accept=".pdf"
      multiple={false}
    />
  );
}
