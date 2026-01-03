import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function ExcelToPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Excel to PDF"
      description="Convert Excel spreadsheets (XLS, XLSX) to PDF format with table formatting."
      accept=".xls,.xlsx"
      multiple={false}
    />
  );
}
