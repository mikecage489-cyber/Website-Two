import ComingSoonTool from './ComingSoonTool';

export default function PDFToExcel() {
  return (
    <ComingSoonTool
      toolName="PDF to Excel"
      description="We're creating an advanced PDF to Excel converter with intelligent table detection. Extract tables and data from PDFs into editable Excel spreadsheets."
      features={[
        'Convert PDF tables to XLS/XLSX format',
        'Automatic table detection',
        'Preserve cell formatting and formulas',
        'Multi-table support',
        'Data accuracy optimization',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files with Tables"
    />
  );
}

