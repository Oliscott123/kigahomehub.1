import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import PropertyPage from './pages/PropertyPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import logo from './assets/logo.svg';
import logoIcon from './assets/logo-icon.svg';
import { sendTestEvent } from './utils/analytics';

function Navigation() {
  return (
    <nav className="flex gap-4 items-center text-slate-600" aria-label="Main navigation">
      <Link to="/" className="flex items-center gap-3">
        <img src={logoIcon} alt="Kigali Home Hub" className="h-8 w-8 sm:hidden" />
        <img src={logo} alt="Kigali Home Hub" className="hidden sm:block h-10 w-10" />
        <span className="hidden sm:inline-block text-lg font-semibold text-slate-900">Kigali Home Hub</span>
      </Link>
      <Link to="/listings">Listings</Link>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
            <Link to="/" className="text-2xl font-semibold text-slate-900">
              Kigali Home Hub
            </Link>
            <div className="flex items-center gap-4">
              <Navigation />
              {import.meta.env.DEV && (
                <button
                  onClick={() => {
                    const res = sendTestEvent();
                    alert(`Test event sent. GA: ${res.ga}, Plausible: ${res.plausible}`);
                  }}
                  className="text-sm rounded px-3 py-2 border border-slate-200 bg-white/80"
                  aria-label="Send analytics test event"
                >
                  Send analytics test
                </button>
              )}
            </div>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-6xl p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
