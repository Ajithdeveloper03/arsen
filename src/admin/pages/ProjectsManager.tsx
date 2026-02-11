import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Filter, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        type: 'residential',
        status: 'completed',
        description: '',
        is_featured: false,
        image: null as File | null
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await api.delete(`/projects/${id}`);
            setProjects(projects.filter((p: any) => p.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    const handleEdit = (project: any) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            location: project.location,
            type: project.type,
            status: project.status,
            description: project.description,
            is_featured: project.is_featured,
            image: null
        });
        setModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            location: '',
            type: 'residential',
            status: 'completed',
            description: '',
            is_featured: false,
            image: null
        });
        setEditingProject(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('location', formData.location);
        data.append('type', formData.type);
        data.append('status', formData.status);
        data.append('description', formData.description);
        data.append('is_featured', formData.is_featured ? '1' : '0');
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingProject) {
                // Laravel PUT with files needs _method or handle via POST
                await api.post(`/projects/${editingProject.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/projects', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchProjects();
            setModalOpen(false);
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Failed to save project');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Projects Manager</h1>
                    <p className="text-gray-500">Manage your cinematic portfolio for the Ongoing and Completed projects pages.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setModalOpen(true); }}
                    className="bg-[#0F1F2A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#DFA45B] hover:text-black transition-all shadow-xl shadow-[#0F1F2A]/10"
                >
                    <Plus size={18} /> Add New Project
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Project</th>
                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Type</th>
                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Featured</th>
                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center">
                                        <Loader2 className="animate-spin mx-auto text-gray-300" size={32} />
                                    </td>
                                </tr>
                            ) : projects.map((project: any) => (
                                <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 italic text-[10px] text-center flex items-center justify-center">
                                                {project.image_url ? (
                                                    <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon size={20} className="text-gray-300" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0F1F2A]">{project.title}</p>
                                                <p className="text-xs text-gray-400">{project.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                                            {project.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`w-10 h-6 rounded-full p-1 transition-all ${project.is_featured ? 'bg-green-500' : 'bg-gray-200'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full transition-all ${project.is_featured ? 'translate-x-4' : ''}`} />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleEdit(project)} className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-blue-500 transition-all">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-red-500 transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && projects.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-gray-400 uppercase tracking-widest text-xs font-bold">
                                        No projects found. Add your first masterpiece.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); resetForm(); }}
                title={editingProject ? 'Edit Project' : 'Add New Project'}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Project Title</label>
                            <input
                                required
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Location</label>
                            <input
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Type</label>
                            <select
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                                <option value="pmc">PMC</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Status</label>
                            <select
                                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="completed">Completed</option>
                                <option value="ongoing">Ongoing</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Description</label>
                        <textarea
                            rows={3}
                            className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Project Image</label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="project-image"
                                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                            />
                            <label
                                htmlFor="project-image"
                                className="w-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-[2rem] cursor-pointer hover:border-[#DFA45B] transition-all"
                            >
                                <ImageIcon size={32} className="text-gray-300 mb-2" />
                                <span className="text-sm text-gray-500">{formData.image ? formData.image.name : 'Click to upload or drag and drop'}</span>
                                <span className="text-[10px] uppercase text-gray-400 mt-1">High quality JPEG/PNG up to 5MB</span>
                            </label>
                        </div>
                    </div>



                    <button
                        disabled={submitting}
                        className="w-full bg-[#0F1F2A] text-white py-6 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#DFA45B] hover:text-black transition-all disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="animate-spin" size={20} /> : (editingProject ? 'Update Project' : 'Create Project')}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectsManager;
