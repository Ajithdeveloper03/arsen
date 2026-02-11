import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';

const CareersManager = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        salary: '',
        is_active: true,
        specifications: [] as string[]
    });

    const [newSpec, setNewSpec] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/careers');
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this listing?')) return;
        try {
            await api.delete(`/careers/${id}`);
            setJobs(jobs.filter((j: any) => j.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (job: any) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            department: job.department,
            location: job.location,
            salary: job.salary || '',
            is_active: job.is_active,
            specifications: job.specifications || []
        });
        setModalOpen(true);
    };

    const addSpec = () => {
        if (!newSpec) return;
        setFormData({ ...formData, specifications: [...formData.specifications, newSpec] });
        setNewSpec('');
    };

    const removeSpec = (index: number) => {
        const specs = [...formData.specifications];
        specs.splice(index, 1);
        setFormData({ ...formData, specifications: specs });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingJob) {
                await api.put(`/careers/${editingJob.id}`, formData);
            } else {
                await api.post('/careers', formData);
            }
            fetchJobs();
            setModalOpen(false);
            setEditingJob(null);
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Careers Manager</h1>
                    <p className="text-gray-500">Post and manage job opportunities at Arsen.</p>
                </div>
                <button onClick={() => { setModalOpen(true); setEditingJob(null); }} className="bg-[#0F1F2A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#DFA45B] hover:text-black transition-all">
                    <Plus size={18} /> Post Job
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Position</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Dept / Location</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {jobs.map((job: any) => (
                            <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6 font-bold">{job.title}</td>
                                <td className="px-8 py-6 text-sm text-gray-500">{job.department} • {job.location}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${job.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {job.is_active ? 'Active' : 'Archived'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(job)} className="p-2 text-gray-400 hover:text-blue-500 transition-all"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(job.id)} className="p-2 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingJob ? 'Edit Job' : 'Post New Job'}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Job Title</label>
                        <input required className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Interior Designer" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Department</label>
                            <input required className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="e.g. Design" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Location</label>
                            <input required className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Dubai" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Specifications (Add one by one)</label>
                        <div className="flex gap-2 mb-2">
                            <input value={newSpec} onChange={(e) => setNewSpec(e.target.value)} className="flex-1 bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" placeholder="e.g. 5+ years experience" />
                            <button type="button" onClick={addSpec} className="px-6 bg-[#0F1F2A] text-white rounded-2xl font-bold">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.specifications.map((spec, i) => (
                                <div key={i} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium">
                                    {spec} <button type="button" onClick={() => removeSpec(i)} className="text-red-500 font-bold">×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem]">
                        <p className="font-bold uppercase tracking-tight">Active Listing</p>
                        <div onClick={() => setFormData({ ...formData, is_active: !formData.is_active })} className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer ${formData.is_active ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`w-6 h-6 bg-white rounded-full transition-all shadow-sm ${formData.is_active ? 'translate-x-6' : ''}`} />
                        </div>
                    </div>

                    <button disabled={submitting} className="w-full bg-[#0F1F2A] text-white py-6 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#DFA45B] hover:text-black transition-all">
                        {submitting ? <Loader2 className="animate-spin" size={20} /> : (editingJob ? 'Update Listing' : 'Post Listing')}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default CareersManager;
