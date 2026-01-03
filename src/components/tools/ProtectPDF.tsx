import ComingSoonTool from './ComingSoonTool';

export default function ProtectPDF() {
  return (
    <ComingSoonTool
      toolName="Protect PDF"
      description="We're building a comprehensive PDF protection tool. Add password protection and encryption to secure your sensitive documents from unauthorized access."
      features={[
        'Add user password (open password)',
        'Add owner password (permissions password)',
        'Set document permissions (printing, copying, editing)',
        'AES-256 encryption',
        'Process securely in your browser',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="PDF Files"
    />
  );
}

