import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Share2, Sparkles, TrendingUp, Flame, Star, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CategoryBadge from './CategoryBadge';

const StatusBadge = ({ status }) => {
  const config = {
    trending: { label: 'Tendencia', icon: TrendingUp, className: 'bg-purple-100 text-purple-700' },
    hot: { label: 'Popular', icon: Flame, className: 'bg-orange-100 text-orange-700' },
    new: { label: 'Nueva', icon: Star, className: 'bg-blue-100 text-blue-700' },
  };
  const s = config[status] || config.new;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${s.className}`}>
      <Icon size={10} />
      {s.label}
    </span>
  );
};

const formatVotes = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

export default function ProposalCard({ proposal, featured = false }) {
  const { voteProposal, votedProposals } = useApp();
  const hasVoted = votedProposals.has(proposal.id);

  const handleVote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    voteProposal(proposal.id);
  };

  if (featured) {
    return (
      <Link to={`/propuesta/${proposal.id}`} className="block group">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-civic-blue/50 transition-all hover:shadow-2xl hover:shadow-civic-blue/10 overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-peru-red/20 to-transparent rounded-2xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge categoryId={proposal.category} />
                <StatusBadge status={proposal.status} />
                {proposal.aiEnhanced && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 border border-violet-500/30">
                    <Sparkles size={10} /> IA
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-civic-blue-light transition-colors line-clamp-2">
              {proposal.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-5">
              {proposal.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {proposal.author.avatar}
                </div>
                <div>
                  <p className="text-white text-xs font-medium">{proposal.author.name}</p>
                  <p className="text-gray-500 text-xs">{proposal.region}</p>
                </div>
              </div>
              <button
                onClick={handleVote}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  hasVoted
                    ? 'bg-civic-blue text-white shadow-lg shadow-civic-blue/30'
                    : 'bg-gray-700 text-gray-200 hover:bg-civic-blue hover:text-white'
                }`}
              >
                <ThumbsUp size={14} className={hasVoted ? 'fill-white' : ''} />
                {formatVotes(proposal.votes)}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/propuesta/${proposal.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-civic-blue/40 hover:shadow-lg hover:shadow-civic-blue/5 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge categoryId={proposal.category} />
            <StatusBadge status={proposal.status} />
          </div>
          {proposal.aiEnhanced && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-200">
              <Sparkles size={10} /> IA
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-civic-blue transition-colors line-clamp-2">
          {proposal.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {proposal.summary}
        </p>

        {/* Tags */}
        {proposal.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proposal.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {proposal.author.avatar}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">{proposal.author.name}</p>
              <div className="flex items-center gap-1 text-gray-400">
                <MapPin size={9} />
                <p className="text-xs">{proposal.region}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleVote}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                hasVoted
                  ? 'bg-civic-blue text-white shadow-sm shadow-civic-blue/30 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-civic-blue hover:text-white'
              }`}
            >
              <ThumbsUp size={12} className={hasVoted ? 'fill-white' : ''} />
              {formatVotes(proposal.votes)}
            </button>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <MessageSquare size={12} />
              {proposal.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
