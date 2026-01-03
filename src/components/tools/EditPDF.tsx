import ComingSoonTool from './ComingSoonTool';

export default function EditPDF() {
  return (
    <ComingSoonTool
      toolName="Edit PDF"
      description="We're building a comprehensive PDF editor. Edit PDF content directly in your browser - add text, images, shapes, highlights, and more."
      features={[
        'Add and edit text with font customization',
        'Insert images and shapes',
        'Highlight and annotate content',
        'Draw freehand on pages',
        'Layer management and ordering',
        'Undo/redo support',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

