import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import {
  getUserProfile, createUserProfile,
  addProposalToFirestore, voteOnProposal, seedProposalsIfEmpty,
  incrementUserProposals,
} from '../lib/firebaseService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser]     = useState(null);
  const [isLoggedIn, setIsLoggedIn]       = useState(false);
  const [proposals, setProposals]         = useState([]);
  const [votedProposals, setVotedProposals] = useState(new Set());
  const [notification, setNotification]  = useState(null);
  const [authLoading, setAuthLoading]    = useState(true);

  // Keep uid in a ref so the Firestore snapshot callback can read it without
  // re-subscribing every time currentUser changes.
  const uidRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // ── Auth listener ──────────────────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let profile = await getUserProfile(firebaseUser.uid);

        if (!profile) {
          // First-ever login — build profile from Firebase auth data
          profile = {
            name:      firebaseUser.displayName || 'Usuario',
            avatar:    (firebaseUser.displayName || 'US').slice(0, 2).toUpperCase(),
            region:    'Lima',
            verified:  false,
            proposals: 0,
            followers: 0,
          };
          await createUserProfile(firebaseUser.uid, profile);
        }

        uidRef.current = firebaseUser.uid;
        setCurrentUser({ uid: firebaseUser.uid, ...profile });
        setIsLoggedIn(true);
      } else {
        uidRef.current = null;
        setCurrentUser(null);
        setIsLoggedIn(false);
        setVotedProposals(new Set());
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // ── Proposals real-time listener ───────────────────────────────────────────
  useEffect(() => {
    seedProposalsIfEmpty();

    const q = query(collection(db, 'proposals'), orderBy('votes', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setProposals(data);

      // Derive which proposals the current user has voted on
      const uid = uidRef.current;
      if (uid) {
        setVotedProposals(
          new Set(data.filter(p => p.votedBy?.includes(uid)).map(p => p.id))
        );
      }
    });
    return unsub;
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────

  const logout = async () => {
    await signOut(auth);
    showNotification('Sesión cerrada correctamente.', 'info');
  };

  const voteProposal = async (proposalId) => {
    if (!currentUser) {
      showNotification('Debes iniciar sesión para votar.', 'warning');
      return false;
    }
    const isRemoving = votedProposals.has(proposalId);
    await voteOnProposal(proposalId, currentUser.uid, isRemoving);
    if (!isRemoving) showNotification('¡Apoyo registrado! 👍');
    return true;
  };

  const addProposal = async (proposal) => {
    if (!currentUser) return null;

    const newProposal = {
      ...proposal,
      author: {
        id:       currentUser.uid,
        name:     currentUser.name,
        avatar:   currentUser.avatar,
        region:   currentUser.region,
        verified: currentUser.verified ?? false,
      },
      votes:      0,
      comments:   0,
      shares:     0,
      status:     'new',
      votedBy:    [],
      aiEnhanced: proposal.aiEnhanced ?? false,
      aiProposal: proposal.aiProposal ?? null,
      createdAt:  new Date().toISOString().split('T')[0],
    };

    const docRef = await addProposalToFirestore(newProposal);
    await incrementUserProposals(currentUser.uid);
    showNotification('¡Propuesta publicada exitosamente! 🚀');
    return { id: docRef.id, ...newProposal };
  };

  return (
    <AppContext.Provider value={{
      currentUser, isLoggedIn, proposals, votedProposals,
      notification, authLoading,
      logout, voteProposal, addProposal, showNotification,
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
