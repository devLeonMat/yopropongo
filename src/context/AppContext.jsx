import { createContext, useContext, useState } from 'react';
import { MOCK_PROPOSALS, MOCK_USERS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [votedProposals, setVotedProposals] = useState(new Set());
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const login = (userData) => {
    setCurrentUser(userData || MOCK_USERS[0]);
    setIsLoggedIn(true);
    showNotification('¡Bienvenido de vuelta! 🎉');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showNotification('Sesión cerrada correctamente.', 'info');
  };

  const voteProposal = (proposalId) => {
    if (!isLoggedIn) {
      showNotification('Debes iniciar sesión para votar.', 'warning');
      return false;
    }
    setVotedProposals(prev => {
      const next = new Set(prev);
      if (next.has(proposalId)) {
        next.delete(proposalId);
        setProposals(ps => ps.map(p =>
          p.id === proposalId ? { ...p, votes: p.votes - 1 } : p
        ));
      } else {
        next.add(proposalId);
        setProposals(ps => ps.map(p =>
          p.id === proposalId ? { ...p, votes: p.votes + 1 } : p
        ));
        showNotification('¡Apoyo registrado! 👍');
      }
      return next;
    });
    return true;
  };

  const addProposal = (proposal) => {
    const newProposal = {
      ...proposal,
      id: proposals.length + 1,
      author: currentUser,
      votes: 0,
      comments: 0,
      shares: 0,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProposals(prev => [newProposal, ...prev]);
    showNotification('¡Propuesta publicada exitosamente! 🚀');
    return newProposal;
  };

  return (
    <AppContext.Provider value={{
      currentUser, isLoggedIn, proposals, votedProposals,
      notification, login, logout, voteProposal, addProposal, showNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
