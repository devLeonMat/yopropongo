import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Star, TrendingUp, ThumbsUp, MessageSquare, Sparkles, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import CategoryBadge from '../components/CategoryBadge';

const formatVotes = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

const RankIcon = ({ position }) => {
  if (position === 1) return <Crown size={20} className="text-yellow-500 fill-yellow-500" />;
  if (position === 2) return <Medal size={18} className="text-gray-400 fill-gray-300" />;
  if (position === 3) return <Medal size={18} className="text-amber-600 fill-amber-500" />;
  return <span className="text-sm font-bold text-gray-400">#{position}</span>;
};

const podiumColors = [
  'from-yellow-400 to-amber-500',
  'from-gray-300 to-gray-400',
  'from-amber-600 to-orange-600',
];

export default function RankingPage() {
  const { proposals, voteProposal, votedProposals } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('');

  const filtered = [...proposals]
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .sort((a, b) => b.votes - a.votes);

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/30">
              <Trophy size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Ranking ciudadano</h1>
          <p className="text-gray-300 text-lg">Las propuestas más apoyadas por los peruanos</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!selectedCategory ? 'bg-gray-900 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            Todas las categorías
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.id ? 'bg-gray-900 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Podium (top 3) */}
        {top3.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {/* 2nd */}
            <div className="flex flex-col items-center pt-8">
              <Link to={`/propuesta/${top3[1].id}`} className="group w-full">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-all">
                  <div className={`w-10 h-10 bg-gradient-to-br ${podiumColors[1]} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white font-black text-sm">2</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-civic-blue transition-colors">{top3[1].title}</p>
                  <div className="flex items-center justify-center gap-1 text-gray-600 text-xs font-bold">
                    <ThumbsUp size={11} /> {formatVotes(top3[1].votes)}
                  </div>
                </div>
              </Link>
            </div>

            {/* 1st */}
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-2">
                <Crown size={28} className="text-yellow-500 fill-yellow-400" />
              </div>
              <Link to={`/propuesta/${top3[0].id}`} className="group w-full">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-300 p-4 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${podiumColors[0]} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-yellow-500/30`}>
                    <span className="text-white font-black">1</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 line-clamp-3 leading-snug mb-2 group-hover:text-civic-blue transition-colors">{top3[0].title}</p>
                  <div className="flex items-center justify-center gap-1 text-yellow-600 text-xs font-black">
                    <ThumbsUp size={12} /> {formatVotes(top3[0].votes)}
                  </div>
                </div>
              </Link>
            </div>

            {/* 3rd */}
            <div className="flex flex-col items-center pt-12">
              <Link to={`/propuesta/${top3[2].id}`} className="group w-full">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-all">
                  <div className={`w-10 h-10 bg-gradient-to-br ${podiumColors[2]} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white font-black text-sm">3</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-civic-blue transition-colors">{top3[2].title}</p>
                  <div className="flex items-center justify-center gap-1 text-gray-600 text-xs font-bold">
                    <ThumbsUp size={11} /> {formatVotes(top3[2].votes)}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Full list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <TrendingUp size={18} className="text-civic-blue" />
            <h2 className="font-bold text-gray-900">Clasificación completa</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((proposal, idx) => {
              const hasVoted = votedProposals.has(proposal.id);
              return (
                <div key={proposal.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors group">
                  {/* Rank */}
                  <div className="w-8 flex items-center justify-center flex-shrink-0">
                    <RankIcon position={idx + 1} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/propuesta/${proposal.id}`} className="group/link">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CategoryBadge categoryId={proposal.category} size="sm" />
                        {proposal.aiEnhanced && (
                          <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-600">
                            <Sparkles size={9} /> IA
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover/link:text-civic-blue transition-colors line-clamp-1">
                        {proposal.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{proposal.summary}</p>
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                      <MessageSquare size={11} /> {proposal.comments}
                    </span>
                    <button
                      onClick={() => voteProposal(proposal.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        hasVoted
                          ? 'bg-civic-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-civic-blue hover:text-white'
                      }`}
                    >
                      <ThumbsUp size={11} className={hasVoted ? 'fill-white' : ''} />
                      {formatVotes(proposal.votes)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
