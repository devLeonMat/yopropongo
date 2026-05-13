import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import HomePage from './pages/HomePage';
import ProposalsPage from './pages/ProposalsPage';
import ProposalDetailPage from './pages/ProposalDetailPage';
import CreateProposalPage from './pages/CreateProposalPage';
import RankingPage from './pages/RankingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/propuestas" element={<ProposalsPage />} />
          <Route path="/propuesta/:id" element={<ProposalDetailPage />} />
          <Route path="/crear" element={<CreateProposalPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/mis-propuestas" element={<ProfilePage />} />
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-center">
                <div className="text-7xl mb-4">🇵🇪</div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Página no encontrada</h2>
                <a href="/" className="text-civic-blue hover:underline font-medium">Volver al inicio</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <Notification />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
