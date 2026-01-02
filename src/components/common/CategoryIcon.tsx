import { Type, Calculator, RefreshCw, Code, Search } from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Type': Type,
  'Calculator': Calculator,
  'RefreshCw': RefreshCw,
  'Code': Code,
  'Search': Search,
};

/**
 * CategoryIcon component that renders Lucide React icons based on icon name
 */
export default function CategoryIcon({ iconName, className = "w-8 h-8" }: CategoryIconProps) {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    return <span className={className}>?</span>;
  }
  
  return <IconComponent className={className} />;
}
