import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function PDFToExcel() {
  return (
    <PlaceholderPDFTool
      toolName="PDF to Excel"
      description="Convert PDF tables to Excel spreadsheets (XLS, XLSX) for easy data editing."
      accept=".pdf"
      multiple={false}
    />
  );
}
