'use client';

import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'next-auth/react';

const EMPTY_FORM = {
  name: '', description: '', techStack: '', githubUrl: '', liveUrl: '',
  displayOrder: 0, active: true,
};

export default function AdminProjectsPage() {
  const [projects, setProjects]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [editingId, setEditingId]     = useState(null);
  const [showForm, setShowForm]       = useState(false);
  const [saving, setSaving]           = useState(false);
  const [deleteId, setDeleteId]       = useState(null);
  const [msg, setMsg]                 = useState('');

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/projects?admin=true');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(p) {
    setForm({
      name: p.name, description: p.description,
      techStack: p.techStack.join(', '),
      githubUrl: p.githubUrl || '', liveUrl: p.liveUrl || '',
      displayOrder: p.displayOrder, active: p.active,
    });
    setEditingId(p._id);
    setShowForm(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      displayOrder: Number(form.displayOrder),
    };

    const url    = editingId ? `/api/projects/${editingId}` : '/api/projects';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      flash(editingId ? 'Project updated!' : 'Project created!');
      setShowForm(false);
      fetchProjects();
    } else {
      flash('Something went wrong — check the console.');
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) { flash('Project deleted.'); fetchProjects(); }
    setDeleteId(null);
  }

  const inputCls =
    'w-full glass rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 ' +
    'focus:outline-none focus:ring-1 focus:ring-cyan/40 border-transparent transition';

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Project Manager</h1>
          <p className="text-white/50 text-sm mt-1">Manage portfolio projects</p>
        </div>
        <div className="flex gap-3">
          <button onClick={openCreate} className="btn-primary text-sm">
            + New Project
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="btn-ghost text-sm"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Flash message */}
      {msg && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan text-sm">
          {msg}
        </div>
      )}

      {/* Project form (create / edit) */}
      {showForm && (
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-5 text-white">
            {editingId ? 'Edit Project' : 'New Project'}
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-white/60 text-xs mb-1">Project Name *</label>
              <input required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls} placeholder="My Awesome Project" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/60 text-xs mb-1">Description *</label>
              <textarea required rows={3} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputCls} placeholder="Brief project description…" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/60 text-xs mb-1">
                Tech Stack (comma separated)
              </label>
              <input value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                className={inputCls} placeholder="React, Node.js, MongoDB" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">GitHub URL</label>
              <input type="url" value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className={inputCls} placeholder="https://github.com/…" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Live Demo URL</label>
              <input type="url" value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className={inputCls} placeholder="https://myapp.vercel.app" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Display Order</label>
              <input type="number" value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                className={inputCls} />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="active" checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 accent-cyan" />
              <label htmlFor="active" className="text-white/70 text-sm">Active (visible on portfolio)</label>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-50">
                {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Project'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects table */}
      <div className="glass rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/50 text-sm">Loading projects…</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-white/50 text-sm">
            No projects yet.{' '}
            <button onClick={openCreate} className="text-cyan hover:underline">
              Create one
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['#', 'Name', 'Tech Stack', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-white/50 font-medium text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-5 py-4 text-white/40">{p.displayOrder}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-white">{p.name}</div>
                      <div className="text-white/40 text-xs mt-0.5 max-w-xs truncate">{p.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-cyan/10 text-cyan border border-cyan/20">
                            {t}
                          </span>
                        ))}
                        {p.techStack.length > 3 && (
                          <span className="px-2 py-0.5 rounded-full text-xs text-white/40">
                            +{p.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.active
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                          : 'bg-white/5 text-white/40 border border-white/10'
                      }`}>
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="px-3 py-1 rounded-lg text-xs border border-white/20 text-white/70 hover:border-cyan/50 hover:text-cyan transition"
                        >
                          Edit
                        </button>
                        {deleteId === p._id ? (
                          <span className="flex gap-1">
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="px-3 py-1 rounded-lg text-xs bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteId(null)}
                              className="px-3 py-1 rounded-lg text-xs border border-white/20 text-white/50 hover:text-white transition"
                            >
                              ✕
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteId(p._id)}
                            className="px-3 py-1 rounded-lg text-xs border border-red-500/30 text-red-400/70 hover:bg-red-500/10 hover:border-red-500/60 transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
