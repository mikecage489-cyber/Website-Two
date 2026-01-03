import ComingSoonTool from './ComingSoonTool';

export default function WordToPDF() {
  return (
    <ComingSoonTool
      toolName="Word to PDF"
      description="We're working on bringing you seamless Word to PDF conversion. This feature will allow you to convert DOC and DOCX files to PDF while preserving all formatting, images, and layout."
      features={[
        'Support for DOC and DOCX formats',
        'Preserve all formatting, fonts, and styles',
        'Maintain images and embedded objects',
        'Keep hyperlinks and table of contents',
        'Batch conversion support',
      ]}
      acceptFileTypes=".doc, .docx"
      fileTypeLabel="Microsoft Word Documents (DOC, DOCX)"
    />
  );
}

