import SEO from '../../components/seo/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy - ToolStack Online"
        description="Read our privacy policy to understand how we handle your data and protect your privacy while using our free online tools."
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <p className="text-sm text-gray-500">Last updated: December 27, 2025</p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At ToolStack Online, we take your privacy seriously. This Privacy Policy explains how
                we collect, use, and protect your information when you use our website and tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tool Usage Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All our tools run entirely in your browser. The data you input into our tools
                (text, numbers, etc.) is processed locally on your device and is never sent to
                our servers or stored anywhere. We do not collect, store, or have access to any
                data you enter into our tools.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use analytics services (such as Google Analytics) to collect anonymous
                information about how visitors use our website, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Pages visited</li>
                <li>Time spent on pages</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Geographic location (country/city level)</li>
                <li>Referral source</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies for analytics and advertising purposes. Cookies are small text
                files stored on your device that help us understand how you use our website and
                improve your experience. You can control or disable cookies through your browser
                settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Google AdSense</h2>
              <p className="text-gray-700 leading-relaxed">
                We use Google AdSense to display advertisements on our website. Google may use
                cookies to serve ads based on your prior visits to our website or other websites.
                You can opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Google Ads Settings
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for
                the privacy practices or content of these external sites. We encourage you to read
                the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                Since all tool processing happens in your browser and we don't store any of your
                input data, your information remains secure on your device. We implement industry-
                standard security measures to protect our website infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to children under 13 years of age. We do not
                knowingly collect personal information from children under 13. If you are a parent
                or guardian and believe your child has provided us with personal information,
                please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted
                on this page with an updated revision date. We encourage you to review this policy
                periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our
                contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
