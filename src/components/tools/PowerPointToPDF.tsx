import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function PowerPointToPDF() {
  return (
    <PlaceholderPDFTool
      toolName="PowerPoint to PDF"
      description="Convert PowerPoint presentations (PPT, PPTX) to PDF format."
      accept=".ppt,.pptx"
      multiple={false}
    />
  );
}
