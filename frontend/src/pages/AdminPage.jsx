import { useEffect, useState } from 'react';
import api from '../api';

const emptyForm = {
  title: '',
  description: '',
  location: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  images: [],
};

export default function AdminPage() {
  const [homes, setHomes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedHome, setSelectedHome] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [status, setStatus] = useState('');

  const loadHomes = async () => {
    try {
      const response = await api.get('/homes');
      if (!Array.isArray(response.data)) {
        throw new Error('Backend returned an unexpected response.');
      }
      setHomes(response.data);
    } catch (err) {
      setHomes([]);
      setStatus(err?.response?.data?.error || err.message || 'Unable to load listings.');
    }
  };

  useEffect(() => {
    loadHomes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      images: selectedHome?.images || [],
    };

    try {
      let homeId = selectedHome?.id || null;

      if (selectedHome) {
        await api.put(`/homes/${selectedHome.id}`, payload);
        homeId = selectedHome.id;
      } else {
        const res = await api.post('/homes', payload);
        homeId = res.data.id;
      }

      // upload any selected images after creating/updating
      if (imageFiles.length && homeId) {
        for (const file of imageFiles) {
          const fd = new FormData();
          fd.append('image', file);
          await api.post(`/homes/${homeId}/images`, fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
      }

      setForm(emptyForm);
      setSelectedHome(null);
      setImageFiles([]);
      await loadHomes();

      setStatus('Listing saved successfully');
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setStatus(err?.response?.data?.error || err.message || 'Save failed');
      setTimeout(() => setStatus(''), 6000);
    }
  };

  const handleEdit = (home) => {
    setSelectedHome(home);
    setForm({
      title: home.title,
      description: home.description,
      location: home.location,
      price: home.price,
      bedrooms: home.bedrooms,
      bathrooms: home.bathrooms,
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/homes/${id}`);
    await loadHomes();
  };

  const handleDeleteImage = async (index) => {
    if (!selectedHome) return;
    await api.delete(`/homes/${selectedHome.id}/images`, {
      data: { index },
    });
    const response = await api.get(`/homes/${selectedHome.id}`);
    setSelectedHome(response.data);
    await loadHomes();
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm shadow-slate-200">
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-slate-600">Manage listings, edit descriptions, update prices, and upload new images.</p>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm shadow-slate-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Property title"
                className="rounded-3xl border border-slate-200 px-4 py-3"
              />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="rounded-3xl border border-slate-200 px-4 py-3"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                className="rounded-3xl border border-slate-200 px-4 py-3"
              />
              <input
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms"
                type="number"
                className="rounded-3xl border border-slate-200 px-4 py-3"
              />
              <input
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms"
                type="number"
                className="rounded-3xl border border-slate-200 px-4 py-3"
              />
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              placeholder="Full description"
              className="w-full rounded-3xl border border-slate-200 px-4 py-3"
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Photos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                className="w-full"
              />

              {imageFiles.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {imageFiles.map((f, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg border bg-slate-50 p-1">
                      <img src={URL.createObjectURL(f)} alt={f.name} className="h-20 w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-white">
                {selectedHome ? 'Update listing' : 'Create listing'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedHome(null);
                  setForm(emptyForm);
                }}
                className="rounded-full border border-slate-300 px-6 py-3 text-slate-700"
              >
                Clear form
              </button>
            </div>
          </form>

          {selectedHome && selectedHome.images?.length > 0 && (
            <div className="mt-8 rounded-3xl bg-slate-50 p-6">
              <h2 className="text-xl font-semibold">Existing photos</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {selectedHome.images.map((url, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-3xl border bg-white/90">
                    <img src={url} alt={`Photo ${idx + 1}`} className="h-44 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-4 py-2 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {homes.map((home) => (
            <div key={home.id} className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{home.title}</h3>
                  <p className="text-sm text-slate-500">{home.location}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(home)}
                    className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(home.id)}
                    className="rounded-full border border-rose-500 px-4 py-2 text-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 line-clamp-3">{home.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
