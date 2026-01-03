import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import SEO from '../../components/seo/SEO';

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init('rRIWZO-yU_CO3B6TV');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.from_name.trim()) {
      setStatus({
        type: 'error',
        message: 'Please enter your name'
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return false;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({
        type: 'error',
        message: 'Please enter a message (at least 10 characters)'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending your message...'
    });

    try {
      const result = await emailjs.send(
        'service_h5ti20o',
        'template_zvbe36p',
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_name: 'Support Team',
          reply_to: formData.from_email,
        },
        'rRIWZO-yU_CO3B6TV'
      );

      console.log('✅ EmailJS Success:', result);

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!'
      });

      // Reset form
      setFormData({
        from_name: '',
        from_email: '',
        message: ''
      });

      // Clear success message after 8 seconds
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 8000);

    } catch (error: unknown) {
      console.error('❌ EmailJS Error:', error);
      const errorMessage = error && typeof error === 'object' && 'text' in error 
        ? (error as { text: string }).text 
        : 'Please try again or email us directly.';
      setStatus({
        type: 'error',
        message: `Failed to send message: ${errorMessage}`
      });
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - ToolStack Online"
        description="Get in touch with ToolStack Online. Send us your questions, feedback, or suggestions."
        canonicalUrl="https://toolstackonline.com/contact"
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="font-sans text-lg text-gray-600">
              Have a question or feedback? We'd love to hear from you!
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="from_name" className="flex items-center font-sans font-medium text-gray-700 mb-2">
                  <User className="w-5 h-5 mr-2 text-primary-600" />
                  Your Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="from_email" className="flex items-center font-sans font-medium text-gray-700 mb-2">
                  <Mail className="w-5 h-5 mr-2 text-primary-600" />
                  Your Email
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="flex items-center font-sans font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Status Messages */}
              {status.type !== 'idle' && (
                <div
                  className={`flex items-start p-4 rounded-lg animate-fadeIn ${
                    status.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : status.type === 'error'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  {status.type === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  )}
                  {status.type === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  )}
                  {status.type === 'loading' && (
                    <Loader className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5 animate-spin" />
                  )}
                  <p
                    className={`font-sans text-sm ${
                      status.type === 'success'
                        ? 'text-green-800'
                        : status.type === 'error'
                        ? 'text-red-800'
                        : 'text-blue-800'
                    }`}
                  >
                    {status.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className={`w-full font-heading font-semibold px-6 py-4 rounded-lg transition-all duration-200 flex items-center justify-center text-lg ${
                  status.type === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {status.type === 'loading' ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
