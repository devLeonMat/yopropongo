import { Link } from 'react-router-dom';
import { ArrowRight, Plus, TrendingUp, Users, FileText, Star, Sparkles, ChevronRight, Shield, Zap, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProposalCard from '../components/ProposalCard';
import { CATEGORIES, STATS } from '../data/mockData';

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="text-center group">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
      <Icon size={22} className="text-white" />
    </div>
    <div className="text-3xl font-black text-white">{value}</div>
    <div className="text-sm text-gray-200 font-medium mt-0.5">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl p-7 ${gradient} text-white shadow-xl`}>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="font-black text-xl mb-3">{title}</h3>
    <p className="text-white/95 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function HomePage() {
  const { proposals } = useApp();
  const trending = proposals.filter(p => p.status === 'trending').slice(0, 2);
  const recent = proposals.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 pt-24 pb-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-peru-red/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-civic-blue/25 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-violet-600/25 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Plataforma ciudadana del Perú
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6">
              Tu voz puede
              <span className="block bg-gradient-to-r from-peru-red via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                cambiar el Perú
              </span>
            </h1>

            <p className="text-gray-100 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Propón ideas, debate con otros ciudadanos y apoya las mejores iniciativas.
              Usa la inteligencia artificial para transformar tus ideas en propuestas reales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/crear"
                className="flex items-center justify-center gap-2 bg-peru-red hover:bg-peru-red-dark text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-peru-red/40 hover:shadow-peru-red/60 hover:scale-105 transition-all"
              >
                <Plus size={20} />
                Crear propuesta
              </Link>
              <Link
                to="/propuestas"
                className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all"
              >
                Explorar propuestas
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
              <StatCard icon={FileText} value={`${(STATS.totalProposals / 1000).toFixed(1)}k`} label="Propuestas" color="bg-peru-red" />
              <StatCard icon={Users} value={`${(STATS.totalUsers / 1000).toFixed(0)}k+`} label="Ciudadanos" color="bg-civic-blue" />
              <StatCard icon={TrendingUp} value={`${(STATS.totalVotes / 1000).toFixed(0)}k`} label="Votos" color="bg-civic-purple" />
              <StatCard icon={Star} value={STATS.approvedProposals} label="Aprobadas" color="bg-civic-emerald" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto font-medium">
              En tres pasos conviertes tu idea en una propuesta ciudadana con impacto real.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon="✍️" title="1. Escribe tu idea" description="Describe el problema que ves en tu comunidad o el país. Puede ser en palabras simples, la plataforma te ayuda a estructurarla." gradient="bg-gradient-to-br from-peru-red to-red-800" />
            <FeatureCard icon="🤖" title="2. Mejórala con IA" description="Nuestra inteligencia artificial transforma tu idea en una propuesta con sustento legal, exposición de motivos e impacto esperado." gradient="bg-gradient-to-br from-violet-600 to-violet-900" />
            <FeatureCard icon="🗾️" title="3. Consigue apoyo" description="Comparte tu propuesta, recibe votos y comentarios. Las más apoyadas llegan a congresistas y autoridades." gradient="bg-gradient-to-br from-civic-blue to-blue-900" />
          </div>
        </div>
      </section>

      {/* AI Highlight */}
      <section className="py-16 bg-gradient-to-r from-violet-50 to-cyan-50 border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-violet-600 text-white px-3 py-1.5 rounded-full text-sm font-bold mb-5 shadow-sm">
                <Sparkles size={14} />
                Potenciado por IA
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-5">
                De idea simple a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600"> propuesta de ley</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                Nuestra IA analiza tu propuesta y la convierte en un documento estructurado con:
              </p>
              <ul className="space-y-3">
                {[
                  'Problema identificado claramente',
                  'Propuesta de solución concreta',
                  'Exposición de motivos con datos',
                  'Posibles artículos legales',
                  'Impacto esperado en la sociedad',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-800 font-medium">
                    <div className="w-5 h-5 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <ChevronRight size={10} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-xl border border-violet-100 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600 to-cyan-600 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles size={16} />
                    <span className="font-bold text-sm">Transformación con IA</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="bg-gray-100 rounded-xl p-3 border border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">💬 Tu idea:</p>
                    <p className="text-sm text-gray-900 font-medium italic">"¿Deberían controlar mejor las llamadas spam?"</p>
                  </div>
                  <div className="flex justify-center py-1">
                    <div className="flex items-center gap-1 text-xs text-violet-700 font-bold">
                      <Sparkles size={12} /> IA procesando <Sparkles size={12} />
                    </div>
                  </div>
                  {[
                    { label: '🎯 Problema', text: 'El spam telefónico afecta 32M de usuarios...', bg: 'bg-red-50 border-red-200 text-red-800' },
                    { label: '💡 Solución', text: 'Registro Nacional de Exclusión con multas...', bg: 'bg-blue-50 border-blue-200 text-blue-800' },
                    { label: '⚖️ Artículos', text: 'Art. 1 — Creación del Registro Nacional...', bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
                    { label: '📊 Impacto', text: 'Reducción del 80% en llamadas no deseadas...', bg: 'bg-violet-50 border-violet-200 text-violet-800' },
                  ].map(({ label, text, bg }) => (
                    <div key={label} className={`border rounded-xl p-3 ${bg}`}>
                      <p className="text-xs font-bold mb-1">{label}</p>
                      <p className="text-xs font-medium opacity-90">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-white mb-1">🔥 En tendencia</h2>
                <p className="text-gray-300 font-medium">Las propuestas más apoyadas esta semana</p>
              </div>
              <Link to="/ranking" className="flex items-center gap-1.5 text-cyan-400 hover:text-white text-sm font-semibold transition-colors">
                Ver ranking completo <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {trending.map(p => <ProposalCard key={p.id} proposal={p} featured />)}
            </div>
          </div>
        </section>
      )}

      {/* Recent proposals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">Últimas propuestas</h2>
              <p className="text-gray-600 font-medium">Explora las ideas más recientes de la ciudadanía</p>
            </div>
            <Link to="/propuestas" className="flex items-center gap-1.5 text-civic-blue hover:text-civic-blue-dark text-sm font-semibold transition-colors">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recent.map(p => <ProposalCard key={p.id} proposal={p} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Explora por categoría</h2>
            <p className="text-gray-600 font-medium">Encuentra propuestas relacionadas con los temas que más te interesan</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/propuestas?categoria=${cat.id}`}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-gray-100 hover:border-civic-blue hover:bg-blue-50 transition-all group text-center"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-bold text-gray-800 group-hover:text-civic-blue transition-colors">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-peru-red via-red-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Globe className="text-white/90" size={48} />
            <Shield className="text-white" size={48} />
            <Zap className="text-white/90" size={48} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            ¿Listo para proponer?
          </h2>
          <p className="text-white text-xl mb-10 font-medium">
            Únete a miles de ciudadanos peruanos que ya están construyendo el Perú que quieren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/crear"
              className="flex items-center justify-center gap-2 bg-white text-peru-red px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
            >
              <Plus size={20} />
              Crear mi propuesta
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-white/20 border-2 border-white/60 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
            >
              Registrarse gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
