import ComingSoonTool from './ComingSoonTool';

export default function ComparePDF() {
  return (
    <ComingSoonTool
      toolName="Compare PDF"
      description="We're building an intelligent PDF comparison tool. Compare two PDF documents side-by-side and highlight differences for easy review."
      features={[
        'Visual side-by-side comparison',
        'Text difference detection',
        'Highlight added, removed, and modified content',
        'Page-by-page comparison',
        'Generate comparison report',
        'Export differences as annotations',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="Two PDF Files"
    />
  );
}

