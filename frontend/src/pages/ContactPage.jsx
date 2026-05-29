import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `mailto:info@kigalihomehub.rw?subject=${encodeURIComponent('Contact request from ' + formState.name)}&body=${encodeURIComponent(formState.message + '\n\nEmail: ' + formState.email)}`;
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Contact Kigali Home Hub</p>
          <h1 className="text-4xl font-semibold">We’re here to help</h1>
          <p className="max-w-3xl text-slate-600">
            Have a question about a listing, need help booking a viewing, or want a personalized recommendation? Send us a message and we’ll reply quickly.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr,0.9fr]">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 px-4 py-3"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 px-4 py-3"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-3 w-full rounded-3xl border border-slate-200 px-4 py-3"
                placeholder="Tell us about your property needs"
              />
            </label>
            <button className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-white" type="submit">
              Send message
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl shadow-slate-900/25">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact details</p>
          <div className="mt-6 space-y-5 text-slate-200">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Email</p>
              <p>info@kigalihomehub.rw</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Phone</p>
              <p>+250 784 764 923</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Address</p>
              <p>Kigali, Rwanda</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
