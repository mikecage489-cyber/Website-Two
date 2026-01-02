import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { OrganizationSchema } from '../../components/seo/SchemaMarkup';
import ToolCard from '../../components/common/ToolCard';
import CategoryIcon from '../../components/common/CategoryIcon';
import Ad from '../../components/ads/Ad';
import { getFeaturedTools, categoryInfo } from '../../config/tools';

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <>
      <SEO
        title="Helpful Tools - Free Online Tools for Everyone"
        description="Access 38+ free online tools including word counter, calculators, converters, and developer tools. Fast, secure, and always available."
        keywords={['online tools', 'free tools', 'web tools', 'calculator', 'converter', 'text tools']}
        canonicalUrl={window.location.origin}
      />
      
      <OrganizationSchema
        name="Helpful Tools"
        url={window.location.origin}
        description="Free online tools to make your work easier. Fast, secure, and always available."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🛠️ Helpful Tools
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Free, Fast, and Useful Online Tools for Everyone
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Access powerful online tools that work entirely in your browser. No registration required, completely free, and always available.
          </p>
          <Link
            to="/tools"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
          >
            Browse All Tools
          </Link>
        </div>
      </section>

      <Ad className="my-8" />

      {/* Featured Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <Ad className="my-8" />

      {/* Tool Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(categoryInfo).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 hover:border-primary-400"
              >
                <div className="text-primary-600 mb-4">
                  <CategoryIcon iconName={category.icon} className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Our Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-gray-600">Lightning-fast tools that work instantly in your browser</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">All processing happens locally - your data never leaves your device</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">100% Free</h3>
              <p className="text-gray-600">No hidden fees, no registration required, always free</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
          </div>
        </div>
      </section>

      <Ad className="my-8" />
    </>
  );
}
