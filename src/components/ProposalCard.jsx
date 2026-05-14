import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Sparkles, TrendingUp, Flame, Star, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CategoryBadge from './CategoryBadge';

const StatusBadge = ({ status }) => {
  const config = {
    trending: { label: 'Tendencia', icon: TrendingUp, className: 'bg-purple-600 text-white' },
    hot:      { label: 'Popular',   icon: Flame,       className: 'bg-orange-500 text-white' },
    new:      { label: 'Nueva',     icon: Star,        className: 'bg-blue-600 text-white' },
  };
  const s = config[status] || config.new;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm ${s.className}`}>
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
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600 hover:border-civic-blue/70 transition-all hover:shadow-2xl hover:shadow-civic-blue/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-peru-red/30 to-transparent rounded-2xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge categoryId={proposal.category} />
                <StatusBadge status={proposal.status} />
                {proposal.aiEnhanced && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-200 border border-violet-400/50">
                    <Sparkles size={10} /> IA
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-civic-blue-light transition-colors line-clamp-2">
              {proposal.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-5">
              {proposal.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {proposal.author.avatar}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{proposal.author.name}</p>
                  <p className="text-gray-400 text-xs">{proposal.region}</p>
                </div>
              </div>
              <button
                onClick={handleVote}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  hasVoted
                    ? 'bg-civic-blue text-white shadow-lg shadow-civic-blue/40'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-civic-blue hover:border-civic-blue'
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
      <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-civic-blue/50 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge categoryId={proposal.category} />
            <StatusBadge status={proposal.status} />
          </div>
          {proposal.aiEnhanced && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-violet-600 text-white shadow-sm">
              <Sparkles size={10} /> IA
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-civic-blue transition-colors line-clamp-2">
          {proposal.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {proposal.summary}
        </p>

        {proposal.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proposal.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-full border border-gray-200">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {proposal.author.avatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{proposal.author.name}</p>
              <div className="flex items-center gap-1 text-gray-500">
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
                  : 'bg-gray-100 text-gray-700 hover:bg-civic-blue hover:text-white border border-gray-200 hover:border-civic-blue'
              }`}
            >
              <ThumbsUp size={12} className={hasVoted ? 'fill-white' : ''} />
              {formatVotes(proposal.votes)}
            </button>
            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <MessageSquare size={12} />
              {proposal.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
