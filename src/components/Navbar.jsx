import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Plus, LogIn, LogOut, User, TrendingUp, FileText, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_LINKS = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/propuestas', label: 'Propuestas', icon: FileText },
  { to: '/ranking', label: 'Ranking', icon: TrendingUp },
];

export default function Navbar() {
  const { isLoggedIn, currentUser, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-gradient-to-br from-peru-red to-peru-red-dark rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-black text-sm">YP</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-gray-900 text-lg leading-none">YoPropongo</span>
                <span className="text-peru-red font-bold text-lg leading-none">.pe</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(to)
                    ? 'bg-peru-red text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/crear"
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-civic-blue to-civic-purple text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus size={16} />
              Proponer
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-civic-purple to-civic-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.avatar}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{currentUser.name.split(' ')[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    <Link to="/perfil" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>
                      <User size={15} /> Mi perfil
                    </Link>
                    <Link to="/mis-propuestas" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>
                      <FileText size={15} /> Mis propuestas
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut size={15} /> Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-gray-700 hover:text-peru-red px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <LogIn size={16} />
                <span className="hidden sm:block">Ingresar</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 space-y-1 animate-slide-up">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(to) ? 'bg-peru-red text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <Link
            to="/crear"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-civic-blue to-civic-purple text-white rounded-xl text-sm font-semibold"
          >
            <Plus size={18} />
            Nueva propuesta
          </Link>
        </div>
      )}
    </nav>
  );
}
