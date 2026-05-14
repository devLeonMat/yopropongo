import {
  doc, getDoc, setDoc, updateDoc,
  collection, addDoc, getDocs,
  query, orderBy, limit,
  arrayUnion, arrayRemove, increment,
} from 'firebase/firestore';
import { db } from './firebase';
import { MOCK_PROPOSALS } from '../data/mockData';

// ──────────────────────────────────────────────
// Users
// ──────────────────────────────────────────────

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function createUserProfile(uid, data) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function incrementUserProposals(uid) {
  await updateDoc(doc(db, 'users', uid), { proposals: increment(1) });
}

// ──────────────────────────────────────────────
// Proposals
// ──────────────────────────────────────────────

export async function addProposalToFirestore(proposal) {
  return addDoc(collection(db, 'proposals'), proposal);
}

export async function voteOnProposal(proposalId, uid, isRemoving) {
  const ref = doc(db, 'proposals', proposalId);
  await updateDoc(ref, {
    votedBy: isRemoving ? arrayRemove(uid) : arrayUnion(uid),
    votes: increment(isRemoving ? -1 : 1),
  });
}

// Seed Firestore with mock proposals on first run (only if collection is empty)
export async function seedProposalsIfEmpty() {
  const snap = await getDocs(query(collection(db, 'proposals'), limit(1)));
  if (!snap.empty) return;

  const writes = MOCK_PROPOSALS.map(p =>
    addDoc(collection(db, 'proposals'), { ...p, votedBy: [] })
  );
  await Promise.all(writes);
}
