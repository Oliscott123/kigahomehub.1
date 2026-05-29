import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import api from '../api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ListingPage() {
  const [homes, setHomes] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [error, setError] = useState('');
  const query = useQuery();

  useEffect(() => {
    const location = query.get('location') || '';
    setLocationFilter(location);
    fetchHomes(location, '', '');
  }, []);

  const fetchHomes = async (location, min, max) => {
    const params = {};
    if (location) params.location = location;
    if (min) params.priceMin = min;
    if (max) params.priceMax = max;

    try {
      setError('');
      const response = await api.get('/homes', { params });
      if (!Array.isArray(response.data)) {
        throw new Error('Backend returned an unexpected response.');
      }
      setHomes(response.data);
    } catch (err) {
      setHomes([]);
      setError(err?.response?.data?.error || err.message || 'Unable to load listings.');
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchHomes(locationFilter, priceMin, priceMax);
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm shadow-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Search</p>
            <h1 className="text-3xl font-semibold">Find the perfect property</h1>
          </div>
          <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={handleSearch}>
            <input
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-3xl border border-slate-200 px-4 py-3"
              placeholder="Location"
            />
            <input
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              type="number"
              className="rounded-3xl border border-slate-200 px-4 py-3"
              placeholder="Min price"
            />
            <input
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              type="number"
              className="rounded-3xl border border-slate-200 px-4 py-3"
              placeholder="Max price"
            />
            <button className="rounded-3xl bg-slate-900 px-6 py-3 text-white">Apply filters</button>
          </form>
        </div>
      </section>

      {error && (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow-sm shadow-rose-100">
          <p className="font-semibold">Unable to load properties</p>
          <p>{error}</p>
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {homes.length ? (
          homes.map((home) => <HomeCard key={home.id} home={home} />)
        ) : (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm shadow-slate-200">
            <p className="text-slate-500">No properties match your search.</p>
            <Link to="/" className="mt-4 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-white">
              Back to home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
