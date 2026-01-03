import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function CropPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Crop PDF"
      description="Crop and trim PDF pages to remove unwanted margins or content."
      accept=".pdf"
      multiple={false}
    />
  );
}
