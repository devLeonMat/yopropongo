import { CATEGORIES } from '../data/mockData';

export default function CategoryBadge({ categoryId, size = 'md' }) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return null;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${cat.color} ${sizes[size]}`}>
      <span>{cat.icon}</span>
      {cat.label}
    </span>
  );
}
