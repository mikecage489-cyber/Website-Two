import { useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        'service_h5ti20o',      // Service ID
        'template_d2nurzs',     // Template ID
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_name: 'Website Admin',
        },
        'rRIWZO-yU_CO3B6TV'     // Public Key
      );

      console.log('EmailJS Success:', result);

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

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or email us directly.'
      });
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Helpful Tools"
        description="Get in touch with us. Send us your questions, feedback, or suggestions and we'll get back to you soon."
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Status Messages */}
              {status.type !== 'idle' && (
                <div
                  className={`flex items-start p-4 rounded-lg ${
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
                className={`w-full font-heading font-semibold px-6 py-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  status.type === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {status.type === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
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

          {/* Additional Contact Info */}
          <div className="mt-8 text-center">
            <p className="font-sans text-gray-600">
              Or reach out to us at:{' '}
              <a href="mailto:support@helpfultools.com" className="text-primary-600 hover:text-primary-700 font-medium">
                support@helpfultools.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
