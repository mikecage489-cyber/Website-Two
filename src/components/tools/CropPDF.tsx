import ComingSoonTool from './ComingSoonTool';

export default function CropPDF() {
  return (
    <ComingSoonTool
      toolName="Crop PDF"
      description="We're developing an advanced PDF cropping tool with visual selection. Precisely crop and trim PDF pages to remove unwanted margins or content."
      features={[
        'Visual crop selection interface',
        'Preset aspect ratios and dimensions',
        'Manual crop box adjustment',
        'Apply to all pages or specific pages',
        'Preview before saving',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

