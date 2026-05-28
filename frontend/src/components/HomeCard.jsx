import { Link } from 'react-router-dom';

export default function HomeCard({ home }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={home.images?.[0] || 'https://via.placeholder.com/640x420?text=Home'}
          alt={home.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
          <span>{home.bedrooms} bd</span>
          <span>{home.bathrooms} ba</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{home.title}</h3>
        <p className="mt-2 text-slate-600 line-clamp-2">{home.description}</p>
        <div className="mt-4 flex items-center justify-between text-base font-semibold text-slate-900">
          <span>RWF {home.price?.toLocaleString()}</span>
          <Link
            to={`/property/${home.id}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
