import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, Save, X, ImageIcon, Filter } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';

const ProjectsManager = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    // Filters
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        progress: 0,
        image_url: '',
        type: 'Residential',
        description: '',
        status: 'ongoing',
        subtitle: '',
        badge: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        let result = projects;
        if (statusFilter !== 'all') {
            result = result.filter(p => p.status === statusFilter);
        }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
        }
        setFilteredProjects(result);
    }, [projects, search, statusFilter]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
            setFilteredProjects(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingProject) {
                await api.put(`/projects/${editingProject.id}`, formData);
            } else {
                await api.post('/projects', formData);
            }
            fetchProjects();
            setModalOpen(false);
        } catch (err) { console.error(err); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this project?')) return;
        try { await api.delete(`/projects/${id}`); fetchProjects(); } catch (e) { }
    };

    const openModal = (project?: any) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title, location: project.location, progress: project.progress,
                image_url: project.image_url, type: project.type, description: project.description,
                status: project.status || 'ongoing', subtitle: project.subtitle || '', badge: project.badge || '',
            });
        } else {
            setEditingProject(null);
            setFormData({ title: '', location: '', progress: 0, image_url: '', type: 'Residential', description: '', status: 'ongoing', subtitle: '', badge: '' });
        }
        setModalOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">All Projects</h1>
                    <p className="text-slate-500 text-sm mt-1">{projects.length} Total items in portfolio.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-[#022C22] hover:bg-[#033a2d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus size={18} /> New Project
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#022C22]/10 focus:border-[#022C22] transition-all text-sm font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                    {['all', 'ongoing', 'completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${statusFilter === status
                                    ? 'bg-white text-[#022C22] shadow-sm text-slate-900 border border-slate-200'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Simple Grid/List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? <div className="text-slate-500 p-4">Loading...</div> : filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#022C22]/30 hover:shadow-lg transition-all shadow-sm group flex flex-col h-full">
                        <div className="h-48 relative bg-slate-100">
                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md border ${project.status === 'ongoing'
                                        ? 'bg-orange-50/90 text-orange-600 border-orange-200'
                                        : 'bg-emerald-50/90 text-emerald-600 border-emerald-200'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                            <div className="mb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{project.type}</span>
                                <h3 className="text-slate-900 font-bold truncate text-lg mt-0.5" title={project.title}>{project.title}</h3>
                                <p className="text-slate-500 text-xs truncate mt-1">{project.location}</p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-slate-700 text-xs font-bold bg-slate-100 px-2 py-1 rounded">{project.progress}% Done</span>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal(project)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-100"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? 'Edit Project' : 'New Project'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                        <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22] font-medium" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                            <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Hospitality</option>
                                <option>Industrial</option>
                                <option>Luxe Detail</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Progress (%)</label>
                            <input type="number" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.progress} onChange={e => setFormData({ ...formData, progress: parseInt(e.target.value) })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                        <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm font-mono outline-none focus:border-[#022C22]" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} required />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                        <button disabled={submitting} className="px-6 py-2 bg-[#022C22] text-white font-bold rounded-lg hover:bg-[#033a2d] transition-colors flex items-center gap-2 shadow-md">
                            {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectsManager;
