import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-peru-red to-peru-red-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">YP</span>
              </div>
              <span className="font-black text-white text-xl">YoPropongo<span className="text-peru-red">.pe</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              La plataforma ciudadana donde tus ideas se convierten en propuestas reales para mejorar el Perú.
              Tu voz importa.
            </p>
            <p className="mt-4 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-peru-red to-civic-orange">
              "Propón. Debate. Cambia."
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-civic-blue rounded-lg flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Plataforma</h4>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Inicio'], ['/propuestas', 'Explorar propuestas'], ['/ranking', 'Ranking'], ['/crear', 'Crear propuesta'], ['/perfil', 'Mi perfil']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              {[['#', 'Términos de uso'], ['#', 'Política de privacidad'], ['#', 'Política de contenido'], ['#', 'Sobre nosotros'], ['#', 'Contacto']].map(([to, label], i) => (
                <li key={i}>
                  <a href={to} className="text-gray-400 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© 2025 YoPropongo.pe — Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Hecho con <Heart size={14} className="text-peru-red fill-peru-red" /> para el Perú
          </p>
        </div>
      </div>
    </footer>
  );
}
