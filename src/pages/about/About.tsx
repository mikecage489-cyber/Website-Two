import SEO from '../../components/seo/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About Us - ToolStack Online"
        description="Learn about ToolStack Online, your trusted source for free online tools and utilities."
        canonicalUrl="https://toolstackonline.com/about"
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-6">About ToolStack Online</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 font-sans leading-relaxed">
                At ToolStack Online, our mission is simple: provide fast, free, and useful online tools
                that make everyday tasks easier. We believe that essential web tools should be
                accessible to everyone, without registration requirements, paywalls, or complicated
                interfaces.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-gray-700 font-sans leading-relaxed mb-4">
                We provide a growing collection of online tools across multiple categories:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-sans space-y-2 ml-4">
                <li>Text Tools for writers, students, and content creators</li>
                <li>Calculator Tools for everyday math and measurements</li>
                <li>Converter Tools for unit conversions and transformations</li>
                <li>Developer Tools for programmers and web developers</li>
                <li>SEO Tools for digital marketers and content creators</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Why Choose Us?</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">100% Free</h3>
                  <p className="text-gray-700 font-sans">
                    All our tools are completely free to use. No hidden fees, no premium tiers,
                    no limitations. We believe essential tools should be accessible to everyone.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-700 font-sans">
                    Your data stays on your device. All our tools run entirely in your browser,
                    meaning your information never leaves your computer. We don't store, collect,
                    or transmit your data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
                  <p className="text-gray-700 font-sans">
                    Built with modern web technologies, our tools are lightning-fast and work
                    instantly. No waiting, no loading screens, just immediate results.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">No Registration Required</h3>
                  <p className="text-gray-700 font-sans">
                    Start using any tool immediately. No signup forms, no email verification,
                    no passwords to remember. Just click and use.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Our Technology</h2>
              <p className="text-gray-700 font-sans leading-relaxed">
                We use cutting-edge web technologies to deliver the best possible experience.
                Built with React, TypeScript, and Tailwind CSS, our tools are fast, responsive,
                and work seamlessly across all devices - desktop, tablet, and mobile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Continuous Improvement</h2>
              <p className="text-gray-700 font-sans leading-relaxed">
                We're constantly working to improve our existing tools and add new ones based on
                user feedback and needs. Have a suggestion? We'd love to hear from you on our
                contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
