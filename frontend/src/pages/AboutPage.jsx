import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">About Kigali Home Hub</p>
          <h1 className="text-4xl font-semibold">Welcome to Kigali's trusted property platform</h1>
          <p className="max-w-3xl text-slate-600">
            Kigali Home Hub combines local expertise with modern listings to help renters and buyers find their ideal home in Rwanda's capital.
            We focus on quality properties, transparent support, and personalized service for both short-term stays and long-term residences.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl shadow-slate-900/10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Our mission</p>
          <h2 className="mt-4 text-2xl font-semibold">Make Kigali feel like home.</h2>
          <p className="mt-4 text-slate-300">
            We help clients discover beautiful properties with ease, backed by local knowledge and a commitment to exceptional service.
          </p>
        </div>
        <div className="rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">What we offer</p>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>Curated rental and sale listings across Kigali.</li>
            <li>Guided property search with filters, location support, and expert advice.</li>
            <li>Easy contact channels for booking visits and asking questions.</li>
          </ul>
        </div>
        <div className="rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Why choose us</p>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>Trusted local team in Kigali.</li>
            <li>Handpicked properties with accurate descriptions.</li>
            <li>Fast responses and dependable customer support.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Get started</p>
            <h2 className="text-3xl font-semibold">Ready to discover your next home?</h2>
            <p className="mt-4 text-slate-600">
              Browse our listings or reach out to our team for personalized support. We're here to make your Kigali property search simple and enjoyable.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link className="inline-flex w-full justify-center rounded-full bg-cyan-500 px-6 py-4 text-white shadow-lg shadow-cyan-500/15" to="/listings">
              Browse listings
            </Link>
            <Link className="inline-flex w-full justify-center rounded-full border border-slate-300 px-6 py-4 text-slate-700" to="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
