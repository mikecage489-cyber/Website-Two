import { useState } from 'react';
import { Mail, Info } from 'lucide-react';

interface ComingSoonToolProps {
  toolName: string;
  description: string;
  features: string[];
  acceptFileTypes?: string;
  fileTypeLabel?: string;
}

export default function ComingSoonTool({
  toolName,
  description,
  features,
  acceptFileTypes,
  fileTypeLabel,
}: ComingSoonToolProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real implementation, this would send to a backend
      console.log('Email submitted for', toolName, ':', email);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Info className="w-8 h-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {toolName} - Coming Soon! 🚀
            </h3>
            <p className="text-gray-700 mb-4">{description}</p>
            {features.length > 0 && (
              <div className="space-y-2 text-sm text-gray-600">
                <p>✨ <strong>Planned features:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {acceptFileTypes && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Supported file types:</strong> {fileTypeLabel || acceptFileTypes}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This feature is currently under development and will be available soon.
          </p>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Get notified when {toolName} is ready
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Enter your email and we'll let you know as soon as this feature is available.
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Notify Me</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Thank you! We'll notify you at <strong>{email}</strong> when {toolName} is ready.
            </p>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Want to help prioritize this feature? Email us at{' '}
          <a href="mailto:support@toolstack.online" className="text-primary-600 hover:text-primary-700">
            support@toolstack.online
          </a>
        </p>
      </div>
    </div>
  );
}
