import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import HomeCard from '../components/HomeCard';
import HeroCarousel from '../components/HeroCarousel';

export default function HomePage() {
  const [homes, setHomes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHomes = async () => {
      try {
        setError('');
        const response = await api.get('/homes');
        setHomes(response.data.slice(0, 6));
      } catch (err) {
        setError(err?.response?.data?.error || err.message || 'Unable to load featured homes.');
      }
    };
    loadHomes();
  }, []);

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
            alt="Kigali real estate"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/40 to-cyan-900/60" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-8 px-8 py-20 lg:grid-cols-[2fr,1fr] lg:items-center">
          <div className="max-w-xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Kigali luxury properties</p>
            <h1 className="text-5xl font-bold leading-tight">Discover epic homes with stunning city views.</h1>
            <p className="text-lg text-slate-200/90">Search curated listings, explore premium apartments, and book your next dream home in Kigali with confidence.</p>
            <div className="flex flex-wrap gap-4">
              <Link className="rounded-full bg-white px-6 py-3 text-slate-950 shadow-lg shadow-slate-950/10" to="/listings">
                Browse listings
              </Link>
              <a className="rounded-full border border-white/25 px-6 py-3 text-white hover:bg-white/10" href="#featured">
                Featured homes
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">120+</p>
                <p className="mt-2 text-xl font-semibold">Exclusive homes</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">24/7</p>
                <p className="mt-2 text-xl font-semibold">Personal support</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">9.8/10</p>
                <p className="mt-2 text-xl font-semibold">Client trust</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Search by location</p>
              <div className="mt-5 space-y-4">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-3xl border border-white/20 bg-slate-950/30 px-5 py-4 text-white outline-none placeholder:text-slate-300"
                  placeholder="Enter city, neighborhood or landmark"
                />
                <Link
                  to={`/listings?location=${encodeURIComponent(search)}`}
                  className="inline-flex w-full justify-center rounded-3xl bg-cyan-400 px-5 py-4 font-semibold text-slate-950"
                >
                  Search homes
                </Link>
              </div>
            </div>
            <div>
              {/* Lightweight carousel component for hero images */}
              <HeroCarousel
                images={[
                  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90', alt: 'Modern kitchen' },
                  { src: 'https://images.unsplash.com/photo-1560184897-e9b8f6b095d6?auto=format&fit=crop&w=1600&q=90', alt: 'Bedroom' },
                  { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=90', alt: 'Living area' },
                ]}
                interval={4500}
              />
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow-sm shadow-rose-100">
          <p className="font-semibold">Unable to load featured properties</p>
          <p>{error}</p>
        </div>
      )}

      <section id="featured" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Featured homes</p>
            <h2 className="text-3xl font-bold">Popular listings</h2>
          </div>
          <Link className="text-cyan-600 hover:text-cyan-700" to="/listings">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {homes.map((home) => (
            <HomeCard key={home.id} home={home} />
          ))}
        </div>
      </section>
    </div>
  );
}
