import React, { useState } from 'react';

interface Application {
  id: number;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Follow Up';
  date: string;
  notes?: string;
}

const initialApplications: Application[] = [];

const DashboardApplicationTracking = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [form, setForm] = useState<Omit<Application, 'id'>>({ company: '', position: '', status: 'Applied', date: '', notes: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.position || !form.date) return;
    if (editingId !== null) {
      setApplications(applications.map(app => app.id === editingId ? { ...app, ...form } : app));
      setEditingId(null);
    } else {
      setApplications([
        ...applications,
        { ...form, id: Date.now() },
      ]);
    }
    setForm({ company: '', position: '', status: 'Applied', date: '', notes: '' });
  };

  const handleEdit = (id: number) => {
    const app = applications.find(a => a.id === id);
    if (app) {
      const { id: _id, ...rest } = app;
      setForm(rest);
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ company: '', position: '', status: 'Applied', date: '', notes: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl glass-box rounded-lg shadow-lg p-8 border border-cyan-400">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Application Tracking Dashboard</h1>
        <p className="mb-6 text-gray-300">Track all your job applications, interviews, and follow-ups in one personalized dashboard.</p>
        <form onSubmit={handleAddOrUpdate} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="p-2 rounded bg-gray-800 border border-cyan-700 text-white" required />
          <input name="position" value={form.position} onChange={handleChange} placeholder="Position" className="p-2 rounded bg-gray-800 border border-cyan-700 text-white" required />
          <select name="status" value={form.status} onChange={handleChange} className="p-2 rounded bg-gray-800 border border-cyan-700 text-white">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Follow Up</option>
          </select>
          <input name="date" value={form.date} onChange={handleChange} type="date" className="p-2 rounded bg-gray-800 border border-cyan-700 text-white" required />
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className="p-2 rounded bg-gray-800 border border-cyan-700 text-white md:col-span-2" />
          <button type="submit" className="glassy-button px-4 py-2 rounded text-white font-semibold md:col-span-2 mt-2">
            {editingId !== null ? 'Update Application' : 'Add Application'}
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cyan-900 bg-opacity-40">
                <th className="p-2">Company</th>
                <th className="p-2">Position</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-gray-400 py-4">No applications yet.</td></tr>
              ) : (
                applications.map(app => (
                  <tr key={app.id} className="border-b border-cyan-800 hover:bg-cyan-900 hover:bg-opacity-20">
                    <td className="p-2">{app.company}</td>
                    <td className="p-2">{app.position}</td>
                    <td className="p-2">{app.status}</td>
                    <td className="p-2">{app.date}</td>
                    <td className="p-2">{app.notes}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(app.id)} className="text-cyan-300 hover:text-cyan-100 underline">Edit</button>
                      <button onClick={() => handleDelete(app.id)} className="text-red-400 hover:text-red-200 underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardApplicationTracking; 