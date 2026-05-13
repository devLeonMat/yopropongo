import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, FileText, ThumbsUp, Users, Plus, LogIn, Star, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProposalCard from '../components/ProposalCard';

const StatItem = ({ icon: Icon, value, label, color }) => (
  <div className="text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
      <Icon size={18} className="text-white" />
    </div>
    <div className="text-2xl font-black text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 font-medium mt-0.5">{label}</div>
  </div>
);

export default function ProfilePage() {
  const { currentUser, isLoggedIn, proposals, logout } = useApp();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-5">👤</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Inicia sesión</h2>
          <p className="text-gray-500 mb-6">Necesitas una cuenta para ver tu perfil.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-civic-blue to-civic-purple text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            <LogIn size={16} /> Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  const userProposals = proposals.filter(p => p.author.id === currentUser.id);
  const totalVotes = userProposals.reduce((acc, p) => acc + p.votes, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Profile header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-civic-purple to-civic-blue rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl">
                {currentUser.avatar}
              </div>
              {currentUser.verified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-civic-blue rounded-full flex items-center justify-center border-2 border-gray-900">
                  <CheckCircle size={14} className="text-white fill-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-black text-white">{currentUser.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 text-sm mt-1">
                <MapPin size={13} />
                <span>{currentUser.region}</span>
                {currentUser.verified && (
                  <>
                    <span>·</span>
                    <span className="text-civic-blue-light flex items-center gap-1">
                      <CheckCircle size={12} /> Verificado
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-4 flex-wrap justify-center sm:justify-start">
                <Link
                  to="/crear"
                  className="flex items-center gap-1.5 bg-peru-red hover:bg-peru-red-dark text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                >
                  <Plus size={14} /> Nueva propuesta
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl text-sm font-medium transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem icon={FileText} value={currentUser.proposals} label="Propuestas" color="bg-peru-red" />
          <StatItem icon={ThumbsUp} value={totalVotes.toLocaleString()} label="Apoyos recibidos" color="bg-civic-blue" />
          <StatItem icon={Users} value={currentUser.followers} label="Seguidores" color="bg-civic-purple" />
          <StatItem icon={Star} value="2" label="Destacadas" color="bg-civic-orange" />
        </div>
      </div>

      {/* My proposals */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-civic-blue" />
            <h2 className="text-xl font-black text-gray-900">Mis propuestas</h2>
          </div>
          <Link to="/crear" className="text-sm text-civic-blue font-medium hover:text-civic-blue-dark flex items-center gap-1">
            <Plus size={14} /> Nueva
          </Link>
        </div>

        {userProposals.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no has publicado propuestas</h3>
            <p className="text-gray-500 mb-6">¡Tu primera propuesta puede cambiar el Perú!</p>
            <Link
              to="/crear"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-civic-blue to-civic-purple text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              <Plus size={16} /> Crear mi primera propuesta
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {userProposals.map(p => (
              <ProposalCard key={p.id} proposal={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
