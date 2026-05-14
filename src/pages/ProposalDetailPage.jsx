import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ThumbsUp, MessageSquare, Share2, ChevronLeft, Sparkles, MapPin,
  Calendar, Target, Lightbulb, FileText, BarChart3, Scale, Send,
  CheckCircle, Flag, Bookmark, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import CategoryBadge from '../components/CategoryBadge';
import { MOCK_COMMENTS } from '../data/mockData';
import ProposalCard from '../components/ProposalCard';

const formatDate = (d) => new Date(d).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
const formatVotes = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

export default function ProposalDetailPage() {
  const { id } = useParams();
  const { proposals, voteProposal, votedProposals, isLoggedIn, showNotification, currentUser } = useApp();
  const navigate = useNavigate();

  const proposal = proposals.find(p => p.id === id);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS.filter(c => String(c.proposalId) === id));
  const [showShare, setShowShare] = useState(false);
  const [activeTab, setActiveTab] = useState('debate');

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Propuesta no encontrada</h2>
          <Link to="/propuestas" className="text-civic-blue hover:underline">Ver todas las propuestas</Link>
        </div>
      </div>
    );
  }

  const hasVoted = votedProposals.has(proposal.id);
  const related = proposals.filter(p => p.id !== proposal.id && p.category === proposal.category).slice(0, 3);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!isLoggedIn) { showNotification('Debes iniciar sesión para comentar.', 'warning'); return; }
    if (!comment.trim()) return;
    setComments(prev => [{
      id: Date.now(),
      proposalId: proposal.id,
      author: { name: 'Tú', avatar: 'TU', region: 'Lima' },
      content: comment,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      replies: [],
    }, ...prev]);
    setComment('');
    showNotification('¡Comentario publicado!');
  };

  const votePercent = Math.min(Math.round((proposal.votes / 5000) * 100), 100);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <CategoryBadge categoryId={proposal.category} size="lg" />
                {proposal.aiEnhanced && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-200">
                    <Sparkles size={11} /> Mejorada con IA
                  </span>
                )}
                {proposal.tags?.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug mb-4">
                {proposal.title}
              </h1>

              <p className="text-gray-600 leading-relaxed mb-5 text-base">
                {proposal.summary}
              </p>

              {/* Author & meta */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white font-bold">
                    {proposal.author.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 text-sm">{proposal.author.name}</span>
                      {proposal.author.verified && <CheckCircle size={14} className="text-civic-blue fill-civic-blue/10" />}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <MapPin size={10} /> {proposal.region}
                      <span>·</span>
                      <Calendar size={10} /> {formatDate(proposal.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 size={13} /> Compartir
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    <Bookmark size={13} /> Guardar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                    <Flag size={13} /> Reportar
                  </button>
                </div>
              </div>
            </div>

            {/* AI enhanced content */}
            {proposal.aiEnhanced && proposal.aiProposal && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-white" />
                  <h2 className="text-white font-bold">Propuesta estructurada con IA</h2>
                </div>
                <div className="p-6 space-y-5">
                  {[
                    { icon: Target, label: 'Problema identificado', key: 'problema', color: 'text-red-600 bg-red-50 border-red-100' },
                    { icon: Lightbulb, label: 'Propuesta de solución', key: 'propuesta', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                    { icon: FileText, label: 'Exposición de motivos', key: 'motivacion', color: 'text-purple-600 bg-purple-50 border-purple-100' },
                    { icon: Scale, label: 'Posibles artículos legales', key: 'articulosLegales', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                    { icon: BarChart3, label: 'Impacto esperado', key: 'impactoEsperado', color: 'text-orange-600 bg-orange-50 border-orange-100' },
                  ].map(({ icon: Icon, label, key, color }) => (
                    <div key={key} className={`rounded-xl border p-4 ${color.split(' ').slice(1).join(' ')}`}>
                      <div className={`flex items-center gap-2 mb-2 ${color.split(' ')[0]}`}>
                        <Icon size={15} />
                        <span className="font-bold text-sm uppercase tracking-wide">{label}</span>
                      </div>
                      {Array.isArray(proposal.aiProposal[key]) ? (
                        <ul className="space-y-1.5">
                          {proposal.aiProposal[key].map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-gray-400 mt-0.5">•</span>{item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">{proposal.aiProposal[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'debate', label: `💬 Debate (${comments.length})` },
                  { id: 'info', label: '📊 Estadísticas' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3.5 text-sm font-semibold transition-colors flex-1 ${
                      activeTab === tab.id
                        ? 'border-b-2 border-civic-blue text-civic-blue bg-blue-50/50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'debate' && (
                  <div className="space-y-5">
                    {/* Comment form */}
                    <form onSubmit={handleSubmitComment} className="flex gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-peru-red to-civic-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        TÚ
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          placeholder={isLoggedIn ? 'Escribe tu comentario...' : 'Inicia sesión para comentar'}
                          disabled={!isLoggedIn}
                          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue/40 disabled:bg-gray-50 disabled:text-gray-400"
                        />
                        <button
                          type="submit"
                          disabled={!isLoggedIn || !comment.trim()}
                          className="bg-civic-blue text-white px-4 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-civic-blue-dark transition-colors"
                        >
                          <Send size={15} />
                        </button>
                      </div>
                    </form>

                    {/* Comments */}
                    {comments.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <MessageSquare size={32} className="mx-auto mb-3 opacity-40" />
                        <p>Sé el primero en comentar esta propuesta.</p>
                      </div>
                    ) : (
                      comments.map(c => (
                        <div key={c.id} className="flex gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {c.author.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-xl px-4 py-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900">{c.author.name}</span>
                                <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{c.content}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 px-1">
                              <button className="text-xs text-gray-400 hover:text-civic-blue font-medium flex items-center gap-1">
                                <ThumbsUp size={11} /> {c.likes}
                              </button>
                              <button className="text-xs text-gray-400 hover:text-civic-blue font-medium">
                                Responder
                              </button>
                            </div>
                            {c.replies?.map(r => (
                              <div key={r.id} className="flex gap-2 mt-2 ml-4">
                                <div className="w-7 h-7 bg-gradient-to-br from-civic-teal to-civic-emerald rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {r.author.avatar}
                                </div>
                                <div className="bg-gray-50 rounded-xl px-3 py-2.5 flex-1">
                                  <span className="text-xs font-semibold text-gray-900 mr-2">{r.author.name}</span>
                                  <span className="text-xs text-gray-600">{r.content}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'info' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Apoyos', value: formatVotes(proposal.votes), color: 'text-civic-blue' },
                        { label: 'Comentarios', value: proposal.comments, color: 'text-civic-purple' },
                        { label: 'Compartidos', value: proposal.shares, color: 'text-civic-teal' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className={`text-2xl font-black ${color}`}>{value}</div>
                          <div className="text-xs text-gray-500 font-medium mt-1">{label}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">Progreso hacia meta (5,000 apoyos)</span>
                        <span className="font-bold text-civic-blue">{votePercent}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-civic-blue to-civic-purple rounded-full transition-all"
                          style={{ width: `${votePercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Vote card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-gray-500 text-sm mb-4">¿Apoyas esta propuesta?</p>
              <button
                onClick={() => voteProposal(proposal.id)}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                  hasVoted
                    ? 'bg-civic-blue text-white shadow-lg shadow-civic-blue/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-civic-blue hover:text-white hover:shadow-lg hover:shadow-civic-blue/20'
                }`}
              >
                <ThumbsUp size={22} className={hasVoted ? 'fill-white' : ''} />
                {hasVoted ? '¡Apoyado!' : 'Apoyar'}
              </button>
              <div className="mt-3">
                <span className="text-3xl font-black text-gray-900">{formatVotes(proposal.votes)}</span>
                <p className="text-xs text-gray-400 mt-0.5">ciudadanos apoyan esta propuesta</p>
              </div>

              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-peru-red to-civic-orange rounded-full"
                    style={{ width: `${votePercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">{votePercent}% de la meta para revisión congresista</p>
              </div>
            </div>

            {/* Author card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Autor de la propuesta</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white font-bold">
                  {proposal.author.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{proposal.author.name}</span>
                    {proposal.author.verified && <CheckCircle size={13} className="text-civic-blue" />}
                  </div>
                  <p className="text-xs text-gray-500">{proposal.region}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="font-black text-gray-900">{proposal.author.proposals}</div>
                  <div className="text-xs text-gray-500">Propuestas</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="font-black text-gray-900">{proposal.author.followers}</div>
                  <div className="text-xs text-gray-500">Seguidores</div>
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-700 mb-4">Propuestas relacionadas</h3>
                <div className="space-y-3">
                  {related.map(p => (
                    <Link
                      key={p.id}
                      to={`/propuesta/${p.id}`}
                      className="flex items-start gap-2 group hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors"
                    >
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-civic-blue mt-0.5 flex-shrink-0 transition-colors" />
                      <div>
                        <p className="text-xs font-semibold text-gray-800 group-hover:text-civic-blue transition-colors line-clamp-2">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">👍 {p.votes.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
