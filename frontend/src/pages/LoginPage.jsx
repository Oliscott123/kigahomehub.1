import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-10 shadow-sm shadow-slate-200">
      <h1 className="text-3xl font-semibold text-slate-900">Admin login</h1>
      <p className="mt-2 text-slate-600">Use your admin credentials to manage property listings.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 px-4 py-3"
            required
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 px-4 py-3"
            required
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
