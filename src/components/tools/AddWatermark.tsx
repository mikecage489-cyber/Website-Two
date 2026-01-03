import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function AddWatermark() {
  return (
    <PlaceholderPDFTool
      toolName="Add Watermark"
      description="Add text or image watermarks to protect your PDF documents from unauthorized use."
      accept=".pdf"
      multiple={false}
    />
  );
}
