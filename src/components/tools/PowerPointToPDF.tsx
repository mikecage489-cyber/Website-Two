import ComingSoonTool from './ComingSoonTool';

export default function PowerPointToPDF() {
  return (
    <ComingSoonTool
      toolName="PowerPoint to PDF"
      description="We're developing a powerful PowerPoint to PDF converter. Convert your presentations to PDF format while maintaining animations, transitions, and speaker notes."
      features={[
        'Support for PPT and PPTX formats',
        'Preserve slide layouts and designs',
        'Maintain embedded media and animations',
        'Include speaker notes (optional)',
        'Batch conversion support',
      ]}
      acceptFileTypes=".ppt, .pptx"
      fileTypeLabel="Microsoft PowerPoint Presentations (PPT, PPTX)"
    />
  );
}

