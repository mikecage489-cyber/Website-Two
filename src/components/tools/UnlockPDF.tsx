import ComingSoonTool from './ComingSoonTool';

export default function UnlockPDF() {
  return (
    <ComingSoonTool
      toolName="Unlock PDF"
      description="We're developing a secure PDF unlocking tool. Remove password protection from your PDFs (you must know the password) to make them freely accessible."
      features={[
        'Remove user and owner passwords',
        'Decrypt protected PDFs securely',
        'Maintain original quality',
        'Process locally in your browser',
        'No file upload to servers',
      ]}
      acceptFileTypes=".pdf"
      fileTypeLabel="Password-Protected PDF Files"
    />
  );
}

