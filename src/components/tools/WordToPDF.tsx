import PlaceholderPDFTool from './PlaceholderPDFTool';

export default function WordToPDF() {
  return (
    <PlaceholderPDFTool
      toolName="Word to PDF"
      description="Convert Word documents (DOC, DOCX) to PDF format while preserving formatting."
      accept=".doc,.docx"
      multiple={false}
    />
  );
}
