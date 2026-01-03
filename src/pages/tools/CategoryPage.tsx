import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { BreadcrumbSchema } from '../../components/seo/SchemaMarkup';
import ToolCard from '../../components/common/ToolCard';
import CategoryIcon from '../../components/common/CategoryIcon';
import Ad from '../../components/ads/Ad';
import { getToolsByCategory, categoryInfo } from '../../config/tools';
import type { ToolCategory } from '../../types';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId || !(categoryId in categoryInfo)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Category Not Found</h1>
        <Link to="/tools" className="text-primary-600 font-sans hover:text-primary-700">
          View all tools
        </Link>
      </div>
    );
  }

  const category = categoryInfo[categoryId as keyof typeof categoryInfo];
  const categoryTools = getToolsByCategory(categoryId as ToolCategory);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${categoryId}` }
  ];

  return (
    <>
      <SEO
        title={`${category.name} - ToolStack Online`}
        description={`${category.description}. Browse our collection of ${categoryTools.length} ${category.name.toLowerCase()}.`}
        keywords={[category.name.toLowerCase(), 'online tools', 'free tools']}
        canonicalUrl={`https://toolstackonline.com/category/${categoryId}`}
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="text-primary-600 mb-4">
              <CategoryIcon iconName={category.icon} className="w-16 h-16" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-xl font-sans text-gray-600 mb-6">{category.description}</p>
            
            {/* Long Description */}
            {category.longDescription && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <p className="text-gray-700 font-sans leading-relaxed">{category.longDescription}</p>
              </div>
            )}
            
            {/* Benefits */}
            {category.benefits && category.benefits.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Why Use Our {category.name}?</h2>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">✓</span>
                      <span className="text-gray-700 font-sans">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Ad className="mb-8" />
          
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Available {category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {categoryTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No tools available in this category yet.</p>
            </div>
          )}

          <Ad className="mt-8" />
        </div>
      </div>
    </>
  );
}
