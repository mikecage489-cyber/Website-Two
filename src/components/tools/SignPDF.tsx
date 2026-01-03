import ComingSoonTool from './ComingSoonTool';

export default function SignPDF() {
  return (
    <ComingSoonTool
      toolName="Sign PDF"
      description="We're creating an intuitive PDF signing tool. Add digital or drawn signatures to your documents for authentication and verification."
      features={[
        'Draw your signature with mouse or touch',
        'Upload signature image',
        'Type and style your signature',
        'Position signature anywhere on the page',
        'Add date and timestamp',
        'Multi-page signing support',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

