import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, MapPin, LogIn, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../data/mockData';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', region: 'Lima' });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(isRegister ? { ...MOCK_USERS[0], name: form.name || 'Nuevo Usuario', avatar: (form.name || 'NU').slice(0, 2).toUpperCase() } : MOCK_USERS[0]);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 flex items-center justify-center px-4 pt-20">
      {/* Decorative blobs */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-peru-red/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-civic-blue/15 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-peru-red to-peru-red-dark rounded-xl flex items-center justify-center">
              <span className="text-white font-black">YP</span>
            </div>
            <span className="font-black text-white text-2xl">YoPropongo<span className="text-peru-red">.pe</span></span>
          </Link>
          <h1 className="text-2xl font-black text-white">
            {isRegister ? 'Crear cuenta' : 'Bienvenido de vuelta'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {isRegister ? 'Únete a miles de ciudadanos peruanos' : 'Inicia sesión para proponer y votar'}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
          {/* Google / social placeholder */}
          <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors mb-5 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.2c3.2 7.1 10.3 12 17.8 12z"/><path fill="#1565C0" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2c3.7-3.4 5.3-8.4 5.3-13.2 0-1.3-.1-2.7-.4-4z"/></svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">o con tu correo</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nombre completo</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="Ej: María Quispe"
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-civic-blue/50"
                    required={isRegister}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-civic-blue/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-10 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-civic-blue/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-civic-blue-light hover:text-white transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-peru-red to-civic-orange text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-peru-red/30 hover:scale-[1.01] transition-all disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isRegister ? (
                <><UserPlus size={16} /> Crear cuenta</>
              ) : (
                <><LogIn size={16} /> Iniciar sesión</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            {isRegister ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-civic-blue-light font-semibold hover:text-white transition-colors"
            >
              {isRegister ? 'Iniciar sesión' : 'Regístrate gratis'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-600 mt-5">
          Al continuar, aceptas los <a href="#" className="text-gray-400 hover:text-white">Términos de uso</a> y la{' '}
          <a href="#" className="text-gray-400 hover:text-white">Política de privacidad</a>
        </p>
      </div>
    </div>
  );
}
