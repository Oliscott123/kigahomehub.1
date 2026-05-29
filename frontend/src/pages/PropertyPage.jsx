import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import PhotoGallery from '../components/PhotoGallery';
import { ADMIN_PHONE, DEFAULT_WA_MESSAGE } from '../config';

export default function PropertyPage() {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHome = async () => {
      try {
        setError('');
        const response = await api.get(`/homes/${id}`);
        if (!response.data || typeof response.data !== 'object') {
          throw new Error('Backend returned an unexpected response.');
        }
        setHome(response.data);
      } catch (err) {
        setHome(null);
        setError(err?.response?.data?.error || err.message || 'Unable to load property details.');
      }
    };

    loadHome();
  }, [id]);

  if (error) {
    return (
      <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow-sm shadow-rose-100">
        <p className="font-semibold">Unable to load property details</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!home) {
    return <div className="text-center text-slate-500">Loading property details...</div>;
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm shadow-slate-200">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Property details</p>
            <h1 className="text-3xl font-semibold">{home.title}</h1>
            <p className="mt-2 text-slate-600">{home.location}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-900">RWF {home.price.toLocaleString()}</p>
            <p className="text-sm text-slate-500">{home.bedrooms} beds • {home.bathrooms} baths</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <PhotoGallery images={home.images || []} />
          </div>
        </div>

        <div className="mt-8 space-y-6 text-slate-700">
          <p>{home.description}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Location</p>
              <p className="mt-2 text-lg font-semibold">{home.location}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Details</p>
              <p className="mt-2">{home.bedrooms} bedrooms · {home.bathrooms} bathrooms</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="rounded-full bg-cyan-500 px-7 py-3 text-white" to="/listings">
            Back to listings
          </Link>

          <button
            onClick={() => {
              // prepare phone digits only
              const digits = (ADMIN_PHONE || '').replace(/\D+/g, '');
              const message = DEFAULT_WA_MESSAGE(home.title, id);
              const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
            }}
            className="rounded-full border border-slate-300 px-7 py-3 text-slate-700"
          >
            Contact via WhatsApp
          </button>

          <a className="rounded-full border border-slate-300 px-7 py-3 text-slate-700" href="mailto:info@kigalihomehub.rw">
            Contact by email
          </a>
        </div>
      </div>
    </div>
  );
}
