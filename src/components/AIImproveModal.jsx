import { useState } from 'react';
import { X, Sparkles, ChevronRight, Loader, CheckCircle, FileText, Target, Scale, BarChart3, Lightbulb } from 'lucide-react';

const mockEnhance = async (text) => {
  await new Promise(r => setTimeout(r, 2200));
  return {
    problema: `La ciudadanía enfrenta el problema de: "${text}". Esto afecta directamente a millones de peruanos que ven vulnerados sus derechos fundamentales sin encontrar respuesta institucional efectiva.`,
    propuesta: `Se propone promulgar una ley que establezca mecanismos claros y vinculantes para abordar la problemática identificada, con plazos definidos, responsables institucionales y presupuesto asignado dentro del marco legal peruano.`,
    motivacion: `La ausencia de regulación en este ámbito genera costos sociales y económicos que el Estado debe asumir con mayor ineficiencia. La presente propuesta se sustenta en estándares internacionales y experiencias exitosas en países de la región latinoamericana.`,
    articulosLegales: [
      'Art. 1 — Objeto y finalidad de la ley',
      'Art. 2 — Definiciones y alcance de la norma',
      'Art. 3 — Derechos y obligaciones de los ciudadanos',
      'Art. 4 — Responsabilidades del Estado y entidades públicas',
      'Art. 5 — Régimen de infracciones y sanciones',
    ],
    impactoEsperado: `Implementación exitosa beneficiará directamente a más de 2 millones de ciudadanos en el primer año. Se estima una reducción del 40% en el problema identificado dentro de los primeros 18 meses de vigencia de la norma.`,
  };
};

export default function AIImproveModal({ initialText = '', onClose, onApply }) {
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleEnhance = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const enhanced = await mockEnhance(text);
      setResult(enhanced);
    } finally {
      setLoading(false);
    }
  };

  const sections = result ? [
    { icon: Target, label: 'Problema identificado', key: 'problema', color: 'text-red-600 bg-red-50' },
    { icon: Lightbulb, label: 'Propuesta de solución', key: 'propuesta', color: 'text-blue-600 bg-blue-50' },
    { icon: FileText, label: 'Exposición de motivos', key: 'motivacion', color: 'text-purple-600 bg-purple-50' },
    { icon: Scale, label: 'Posibles artículos legales', key: 'articulosLegales', color: 'text-emerald-600 bg-emerald-50' },
    { icon: BarChart3, label: 'Impacto esperado', key: 'impactoEsperado', color: 'text-orange-600 bg-orange-50' },
  ] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-cyan-600 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Mejorar con IA</h2>
              <p className="text-white/80 text-xs">Convierte tu idea en una propuesta estructurada</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {!result ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu idea en palabras simples
                </label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={4}
                  placeholder="Ej: Deberían controlar mejor las llamadas spam, es un problema enorme..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none placeholder:text-gray-400"
                />
              </div>
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
                <p className="text-xs text-violet-700 font-medium mb-2">✨ La IA transformará tu idea en:</p>
                <ul className="text-xs text-violet-600 space-y-1">
                  {['Problema identificado', 'Propuesta de solución', 'Exposición de motivos', 'Posibles artículos legales', 'Impacto esperado'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight size={10} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-xl p-3">
                <CheckCircle size={16} />
                <span className="text-sm font-semibold">¡Propuesta mejorada exitosamente!</span>
              </div>
              {sections.map(({ icon: Icon, label, key, color }) => (
                <div key={key} className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className={`flex items-center gap-2 px-4 py-2.5 ${color}`}>
                    <Icon size={14} />
                    <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
                  </div>
                  <div className="p-4">
                    {Array.isArray(result[key]) ? (
                      <ul className="space-y-1.5">
                        {result[key].map((item, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed">{result[key]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          {!result ? (
            <>
              <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button
                onClick={handleEnhance}
                disabled={!text.trim() || loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Mejorar con IA
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={() => { onApply && onApply(result); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all"
              >
                <CheckCircle size={16} />
                Usar esta propuesta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
