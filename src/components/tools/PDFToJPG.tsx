import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function PDFToJPG() {
  return (
    <PlaceholderPDFTool
      toolName="PDF to JPG"
      description="Convert PDF pages to JPG, PNG, or other image formats with high quality."
      accept=".pdf"
      multiple={false}
    />
  );
}
