import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function PDFToPowerPoint() {
  return (
    <PlaceholderPDFTool
      toolName="PDF to PowerPoint"
      description="Convert PDF files to editable PowerPoint presentations (PPT, PPTX)."
      accept=".pdf"
      multiple={false}
    />
  );
}
