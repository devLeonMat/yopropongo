import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Plus, X, TrendingUp, Clock, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProposalCard from '../components/ProposalCard';
import { CATEGORIES } from '../data/mockData';

const SORT_OPTIONS = [
  { value: 'votes', label: 'Más votados', icon: TrendingUp },
  { value: 'recent', label: 'Más recientes', icon: Clock },
  { value: 'comments', label: 'Más debatidos', icon: Flame },
];

export default function ProposalsPage() {
  const { proposals } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('votes');
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get('categoria') || '';

  const setCategory = (cat) => {
    if (cat) setSearchParams({ categoria: cat });
    else setSearchParams({});
  };

  const filtered = useMemo(() => {
    let result = [...proposals];
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags?.some(t => t.includes(q))
      );
    }
    if (sort === 'votes') result.sort((a, b) => b.votes - a.votes);
    if (sort === 'recent') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'comments') result.sort((a, b) => b.comments - a.comments);
    return result;
  }, [proposals, selectedCategory, search, sort]);

  const activeCat = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900">
                {activeCat ? `${activeCat.icon} ${activeCat.label}` : 'Todas las propuestas'}
              </h1>
              <p className="text-gray-500 mt-1">{filtered.length} propuestas encontradas</p>
            </div>
            <Link
              to="/crear"
              className="flex items-center gap-2 bg-gradient-to-r from-civic-blue to-civic-purple text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all self-start"
            >
              <Plus size={16} /> Nueva propuesta
            </Link>
          </div>

          {/* Search & filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar propuestas..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-civic-blue/40 bg-gray-50"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showFilters ? 'bg-civic-blue border-civic-blue text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-100 bg-white'}`}
            >
              <SlidersHorizontal size={15} />
              Filtros
            </button>
          </div>

          {/* Sort & category filters */}
          {(showFilters || true) && (
            <div className="mt-4 space-y-3">
              {/* Sort */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 font-medium">Ordenar:</span>
                {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSort(value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      sort === value ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={11} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 font-medium">Categoría:</span>
                <button
                  onClick={() => setCategory('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !selectedCategory ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Todas
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron propuestas</h3>
            <p className="text-gray-500 mb-6">Intenta con otros términos o sé el primero en proponer.</p>
            <Link to="/crear" className="inline-flex items-center gap-2 bg-civic-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-civic-blue-dark transition-colors">
              <Plus size={16} /> Crear la primera propuesta
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => (
              <ProposalCard key={p.id} proposal={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
