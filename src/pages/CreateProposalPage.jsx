import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Plus, X, ChevronRight, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import AIImproveModal from '../components/AIImproveModal';

const REGIONS = [
  'Nacional', 'Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Piura',
  'Lambayeque', 'Junín', 'Ica', 'Loreto', 'Puno', 'Cajamarca',
  'Madre de Dios', 'Tacna', 'Moquegua', 'Tumbes', 'Ucayali', 'Amazonas',
  'San Martín', 'Huánuco', 'Pasco', 'Huancavelica', 'Ayacucho', 'Apurímac',
];

const steps = ['Información básica', 'Descripción', 'Revisión'];

export default function CreateProposalPage() {
  const { isLoggedIn, addProposal, showNotification } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    summary: '',
    category: '',
    region: 'Nacional',
    tags: [],
    aiEnhanced: false,
    aiProposal: null,
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (t && !form.tags.includes(t) && form.tags.length < 5) {
      update('tags', [...form.tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => update('tags', form.tags.filter(t => t !== tag));

  const handleAIApply = (aiResult) => {
    update('aiEnhanced', true);
    update('aiProposal', aiResult);
    showNotification('¡Propuesta mejorada con IA aplicada!');
  };

  const canProceed = () => {
    if (step === 0) return form.title.trim().length >= 10 && form.category;
    if (step === 1) return form.summary.trim().length >= 30;
    return true;
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      showNotification('Debes iniciar sesión para publicar.', 'warning');
      navigate('/login');
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    const newProposal = addProposal(form);
    setSubmitting(false);
    navigate(`/propuesta/${newProposal.id}`);
  };

  const selectedCat = CATEGORIES.find(c => c.id === form.category);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock size={28} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Inicia sesión para proponer</h2>
          <p className="text-gray-500 mb-6">Necesitas una cuenta para publicar propuestas ciudadanas.</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-civic-blue to-civic-purple text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Iniciar sesión
          </button>
          <p className="text-sm text-gray-400 mt-4">¿No tienes cuenta? <button onClick={() => navigate('/login')} className="text-civic-blue font-medium">Regístrate gratis</button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {showAI && (
        <AIImproveModal
          initialText={form.summary || form.title}
          onClose={() => setShowAI(false)}
          onApply={handleAIApply}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Nueva propuesta</h1>
          <p className="text-gray-500">Comparte tu idea para mejorar el Perú</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 flex-1 ${i > 0 ? 'justify-start' : ''}`}>
                {i > 0 && <div className={`flex-1 h-0.5 ${i <= step ? 'bg-civic-blue' : 'bg-gray-200'}`} />}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? 'bg-civic-blue text-white' :
                  i === step ? 'bg-civic-blue text-white ring-4 ring-civic-blue/20' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 -mt-5 mb-8 px-1">
          {steps.map((s, i) => (
            <span key={i} className={i === step ? 'text-civic-blue font-semibold' : ''}>{s}</span>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Step 0: Basic info */}
          {step === 0 && (
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título de la propuesta <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => update('title', e.target.value)}
                  placeholder="Ej: Ley para regular las llamadas spam en el Perú"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-civic-blue/40 placeholder:text-gray-400"
                  maxLength={150}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-gray-400">Mínimo 10 caracteres</span>
                  <span className="text-xs text-gray-400">{form.title.length}/150</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => update('category', cat.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                        form.category === cat.id
                          ? 'border-civic-blue bg-blue-50 text-civic-blue'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Región</label>
                <select
                  value={form.region}
                  onChange={e => update('region', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-civic-blue/40 bg-white"
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 1: Description */}
          {step === 1 && (
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Descripción de la propuesta <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={() => setShowAI(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-700 rounded-lg border border-violet-200 hover:shadow-sm transition-all"
                >
                  <Sparkles size={12} /> Mejorar con IA
                </button>
              </div>
              <textarea
                value={form.summary}
                onChange={e => update('summary', e.target.value)}
                rows={6}
                placeholder="Explica el problema que quieres resolver y tu propuesta de solución. Puedes escribirlo con tus propias palabras..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-civic-blue/40 resize-none placeholder:text-gray-400"
                maxLength={1000}
              />
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Mínimo 30 caracteres</span>
                <span className="text-xs text-gray-400">{form.summary.length}/1000</span>
              </div>

              {form.aiEnhanced && (
                <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl p-3 text-sm text-violet-700">
                  <Sparkles size={14} />
                  <span className="font-medium">Propuesta mejorada con IA</span>
                  <CheckCircle size={14} className="ml-auto" />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Etiquetas (máx. 5)</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                    placeholder="Añadir etiqueta..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue/40"
                    disabled={form.tags.length >= 5}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={form.tags.length >= 5 || !tagInput.trim()}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-xl text-sm font-medium disabled:opacity-40 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="p-6 space-y-5">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2 text-green-700 text-sm">
                <CheckCircle size={16} />
                <span className="font-medium">Tu propuesta está lista para publicar</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">Título</p>
                  <p className="text-gray-900 font-semibold text-sm">{form.title}</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Categoría</p>
                    <p className="text-sm font-medium">{selectedCat?.icon} {selectedCat?.label}</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Región</p>
                    <p className="text-sm font-medium">{form.region}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">Descripción</p>
                  <p className="text-gray-700 text-sm line-clamp-3">{form.summary}</p>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}
                {form.aiEnhanced && (
                  <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl p-3 text-xs text-violet-700 font-medium">
                    <Sparkles size={12} /> Esta propuesta fue mejorada con inteligencia artificial
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2">
                <AlertCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">
                  Al publicar aceptas los términos de uso y la política de contenido de YoPropongo.pe.
                  Tu propuesta estará sujeta a moderación.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-6 pb-6 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Atrás
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-civic-blue to-civic-purple text-white rounded-xl text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Siguiente <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-peru-red to-civic-orange text-white rounded-xl text-sm font-bold disabled:opacity-70 hover:shadow-lg transition-all"
              >
                {submitting ? 'Publicando...' : '🚀 Publicar propuesta'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
