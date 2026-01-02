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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <Link to="/tools" className="text-primary-600 hover:text-primary-700">
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
        title={`${category.name} - Helpful Tools`}
        description={`${category.description}. Browse our collection of ${categoryTools.length} ${category.name.toLowerCase()}.`}
        keywords={[category.name.toLowerCase(), 'online tools', 'free tools']}
        canonicalUrl={`${window.location.origin}/category/${categoryId}`}
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="text-primary-600 mb-4">
              <CategoryIcon iconName={category.icon} className="w-16 h-16" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-xl text-gray-600">{category.description}</p>
          </div>

          <Ad className="mb-8" />

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
