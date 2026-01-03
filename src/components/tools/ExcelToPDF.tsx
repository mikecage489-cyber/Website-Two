import ComingSoonTool from './ComingSoonTool';

export default function ExcelToPDF() {
  return (
    <ComingSoonTool
      toolName="Excel to PDF"
      description="We're working on Excel to PDF conversion that preserves your spreadsheet formatting. Convert your Excel workbooks to professional PDF documents."
      features={[
        'Support for XLS and XLSX formats',
        'Preserve cell formatting and formulas',
        'Maintain charts and graphs',
        'Multi-sheet support',
        'Custom page size and orientation',
      ]}
      acceptFileTypes=".xls, .xlsx"
      fileTypeLabel="Microsoft Excel Spreadsheets (XLS, XLSX)"
    />
  );
}

