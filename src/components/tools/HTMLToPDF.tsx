import ComingSoonTool from './ComingSoonTool';

export default function HTMLToPDF() {
  return (
    <ComingSoonTool
      toolName="HTML to PDF"
      description="We're building an advanced HTML to PDF converter. Convert web pages, HTML files, or URLs directly to PDF format with full styling and layout preservation."
      features={[
        'Convert HTML files or URLs to PDF',
        'Preserve CSS styling and layouts',
        'Support for embedded images and fonts',
        'Custom page size and margins',
        'Responsive design support',
      ]}
      acceptFileTypes=".html, .htm, or URL"
      fileTypeLabel="HTML Files or Web URLs"
    />
  );
}

