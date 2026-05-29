import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import PropertyPage from './pages/PropertyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import logo from './assets/logo.svg';
import logoIcon from './assets/logo-icon.svg';

function Navigation() {
  return (
    <nav className="flex flex-wrap items-center gap-4 text-slate-600" aria-label="Main navigation">
      <Link to="/" className="flex items-center gap-3">
        <img src={logoIcon} alt="Kigali Home Hub" className="h-8 w-8 sm:hidden" />
        <img src={logo} alt="Kigali Home Hub" className="hidden sm:block h-10 w-10" />
        <span className="hidden sm:inline-block text-lg font-semibold text-slate-900">Kigali Home Hub</span>
      </Link>
      <Link to="/listings">Listings</Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact</Link>
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
            </div>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-6xl p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
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

        <footer className="border-t border-slate-200 bg-white/95 text-slate-700">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:justify-between">
            <div className="max-w-xl space-y-3">
              <Link to="/" className="text-2xl font-semibold text-slate-900">
                Kigali Home Hub
              </Link>
              <p className="text-sm text-slate-600">
                Find premium homes and trusted rentals in Kigali with local support, modern listings, and easy contact options.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick links</p>
                <div className="mt-4 flex flex-col gap-3 text-slate-600">
                  <Link to="/" className="hover:text-cyan-600">Home</Link>
                  <Link to="/listings" className="hover:text-cyan-600">Listings</Link>
                  <Link to="/about" className="hover:text-cyan-600">About Us</Link>
                  <Link to="/contact" className="hover:text-cyan-600">Contact</Link>
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contact</p>
                <div className="mt-4 space-y-3 text-slate-600">
                  <p>
                    Email: <a href="mailto:info@kigalihomehub.rw" className="text-cyan-600">info@kigalihomehub.rw</a>
                  </p>
                  <p>
                    Phone: <a href="tel:+250784764923" className="text-cyan-600">+250 784 764 923</a>
                  </p>
                  <p>Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200/80 py-4 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Kigali Home Hub. All rights reserved.
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
