
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, Save, ImageIcon, Upload, LayoutGrid, List, MapPin, Database, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';
import Notification, { NotificationType } from '../components/Notification';
import { FEATURED_PROJECTS, RAW_COMPLETED_PROJECTS_LIST } from '../../data/completedProjects';
import { HARDCODED_ONGOING_PROJECTS } from '../../data/ongoingProjects';
import { mergeProjectsWithApi } from '../../utils/projectMerge';

// Helpers
const getCategory = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("residencial") || lower.includes("residence") || lower.includes("house") || lower.includes("villa")) return "Residential";
    if (lower.includes("green trends") || lower.includes("hotel") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("limelite")) return "Hospitality";
    if (lower.includes("dr agarwal") || lower.includes("hospital") || lower.includes("clinic") || lower.includes("lab")) return "Luxe Detail";
    return "Commercial";
};

const getLocation = (title: string) => {
    if (title.includes("(")) {
        const parts = title.split("(");
        return parts[parts.length - 1].replace(")", "").trim();
    }
    return "India";
}

// Generate the Master List (Ongoing + Featured + Raw)
const LOCAL_MASTER_LIST = [
    ...HARDCODED_ONGOING_PROJECTS, // The 5 Ongoing
    // Featured Completed
    ...FEATURED_PROJECTS.map((p, i) => ({
        id: -100 - i,
        title: p.title,
        type: p.category,
        location: p.location,
        status: 'completed',
        progress: 100,
        image_url: p.image,
        description: p.description,
        is_hardcoded: true
    })),
    // Remaining Completed (Raw)
    ...RAW_COMPLETED_PROJECTS_LIST.map((rawTitle, i) => {
        const cleanTitle = rawTitle.replace(/^\d+\s+/, "").trim();
        const isFeatured = FEATURED_PROJECTS.some(fp => fp.title.toLowerCase().includes(cleanTitle.toLowerCase()));
        if (isFeatured) return null;

        return {
            id: -2000 - i,
            title: cleanTitle,
            type: getCategory(cleanTitle),
            location: getLocation(rawTitle),
            status: 'completed',
            progress: 100,
            image_url: null, // No image for raw list unless added via admin
            description: "Archive Project",
            is_hardcoded: true
        };
    }).filter(Boolean) as any[]
];

const ProjectsManager = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

    // Import Logic
    const [importing, setImporting] = useState(false);
    const [importProgress, setImportProgress] = useState(0);

    // Notification State
    const [notification, setNotification] = useState<{
        isOpen: boolean;
        type: NotificationType;
        message: string;
        onConfirm?: () => void;
    }>({
        isOpen: false,
        type: 'info',
        message: ''
    });

    const showNotification = (type: NotificationType, message: string, onConfirm?: () => void) => {
        setNotification({ isOpen: true, type, message, onConfirm });
    };

    const closeNotification = () => {
        setNotification(prev => ({ ...prev, isOpen: false }));
    };

    // Filters
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        progress: 0,
        type: 'Residential',
        description: '',
        status: 'ongoing',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    // MERGE LOGIC: Use shared helper to overlay API data onto Local Master List
    const MERGED_PROJECTS = useMemo(() => {
        return mergeProjectsWithApi(LOCAL_MASTER_LIST, projects);
    }, [projects]);

    useEffect(() => {
        let result = MERGED_PROJECTS;

        if (statusFilter !== 'all') {
            result = result.filter((p: any) => p.status === statusFilter);
        }
        if (typeFilter !== 'all') {
            result = result.filter((p: any) => p.type === typeFilter);
        }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((p: any) =>
                p.title.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q)
            );
        }
        setFilteredProjects(result);
    }, [MERGED_PROJECTS, search, statusFilter, typeFilter]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleImportAll = async () => {
        setImporting(true);
        setImportProgress(0);

        // Only import items that are still marked as 'is_hardcoded' (meaning NOT in DB yet)
        const toImport = MERGED_PROJECTS.filter((p: any) => p.is_hardcoded);

        if (toImport.length === 0) {
            setImporting(false);
            showNotification('info', 'All projects are already synced to the database.');
            return;
        }

        let completed = 0;
        const total = toImport.length;

        const CHUNK_SIZE = 5;
        for (let i = 0; i < total; i += CHUNK_SIZE) {
            const chunk = toImport.slice(i, i + CHUNK_SIZE);
            await Promise.all(chunk.map(async (p: any) => {
                try {
                    const data = new FormData();
                    data.append('title', p.title);
                    data.append('location', p.location);
                    data.append('progress', p.progress.toString());
                    data.append('type', p.type);
                    data.append('description', p.description || '');
                    data.append('status', p.status);

                    await api.post('/projects', data);
                } catch (e) {
                    console.error("Import failed for", p.title, e);
                }
            }));
            completed += chunk.length;
            setImportProgress(Math.round((completed / total) * 100));
        }

        setImporting(false);
        showNotification('success', `Successfully imported ${completed} projects to database.`);
        fetchProjects();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const confirmSave = (e: React.FormEvent) => {
        e.preventDefault();
        showNotification(
            'confirm',
            editingProject ? (editingProject.is_hardcoded ? 'This will add this default project to the database. Continue?' : 'Update this project?') : 'Create new project? Note: Non-standard titles will be hidden from this view.',
            () => executeSubmit()
        );
    };

    const executeSubmit = async () => {
        setSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('location', formData.location);
        data.append('progress', formData.progress.toString());
        data.append('type', formData.type);
        data.append('description', formData.description || '');
        data.append('status', formData.status);

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            if (editingProject && !editingProject.is_hardcoded) {
                await api.post(`/projects/${editingProject.id}`, data);
                showNotification('success', 'Project updated successfully!');
            } else {
                await api.post('/projects', data);
                showNotification('success', 'Project saved to database!');
            }
            fetchProjects();
            setModalOpen(false);
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || 'Error saving project.';
            showNotification('error', message);
        }
        finally { setSubmitting(false); }
    };

    const confirmDelete = (project: any) => {
        if (project.is_hardcoded) {
            showNotification('info', 'To "delete" a default project, first Edit & Save it to the database, then delete it. or Import All to make everything editable.');
            return;
        }
        showNotification(
            'confirm',
            'Are you sure you want to delete this project?',
            () => executeDelete(project.id)
        );
    };

    const executeDelete = async (id: number) => {
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
            showNotification('success', 'Project deleted successfully.');
        } catch (e) {
            showNotification('error', 'Failed to delete project.');
        }
    };

    const openModal = (project?: any) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                location: project.location,
                progress: project.progress,
                type: project.type,
                description: project.description || '',
                status: project.status || 'ongoing',
            });
            let img = project.image_url;
            if (typeof img === 'object' && img !== null) img = img.default || img;
            setImagePreview(img);
        } else {
            setEditingProject(null);
            setFormData({ title: '', location: '', progress: 0, type: 'Residential', description: '', status: 'ongoing' });
            setImagePreview(null);
        }
        setSelectedFile(null);
        setModalOpen(true);
    };

    const stats = useMemo(() => {
        return {
            total: MERGED_PROJECTS.length,
            completed: MERGED_PROJECTS.filter((p: any) => p.status === 'completed').length,
            ongoing: MERGED_PROJECTS.filter((p: any) => p.status === 'ongoing').length,
            db: projects.length,
        };
    }, [MERGED_PROJECTS, projects]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-20">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Projects</span>
                    <div className="text-3xl font-black text-slate-900 mt-2">{stats.total}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completed</span>
                    <div className="text-3xl font-black text-[#F28C28] mt-2">{stats.completed}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ongoing</span>
                    <div className="text-3xl font-black text-emerald-600 mt-2">{stats.ongoing}</div>
                </div>
                <div className="bg-[#022C22] p-6 rounded-2xl shadow-sm border border-[#022C22] text-white cursor-pointer hover:bg-[#033a2d] transition-colors" onClick={() => openModal()}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg"><Plus size={20} /></div>
                        <div>
                            <div className="text-lg font-bold">Add Project</div>
                            <div className="text-xs text-white/60">Create new entry</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sync Alert */}
            {stats.db < 20 && !importing && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Database size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 text-lg">Sync Portfolio to Database?</h3>
                            <p className="text-blue-700 text-sm">You have {MERGED_PROJECTS.length} projects in the official list, but only {stats.db} in the editable database. Import them to enable full editing.</p>
                        </div>
                    </div>
                    <button onClick={handleImportAll} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2">
                        <Upload size={18} /> Import All items
                    </button>
                </div>
            )}

            {importing && (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={32} />
                    <h3 className="font-bold text-xl">Importing Projects... {importProgress}%</h3>
                    <div className="w-full max-w-md mx-auto h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${importProgress}%` }} />
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm sticky top-4 z-10">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#022C22]/10 focus:border-[#022C22] transition-all text-sm font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                    <div className="bg-slate-100 p-1 rounded-lg flex border border-slate-200 shrink-0">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#022C22]' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Grid View"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-[#022C22]' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Table View"
                        >
                            <List size={18} />
                        </button>
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-[#022C22]/10"
                    >
                        <option value="all">All Types</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Luxe Detail">Luxe Detail</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-[#022C22]/10"
                    >
                        <option value="all">All Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* List/Grid View */}
            {loading ? (
                <div className="bg-white p-20 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-[#022C22]" size={40} />
                    <p className="text-slate-500 font-medium">Loading projects archive...</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProjects.map((project: any) => (
                        <div key={project.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#F28C28]/50 hover:shadow-lg transition-all shadow-sm group flex flex-col h-full">
                            <div className="h-48 relative bg-slate-100 flex items-center justify-center overflow-hidden">
                                {project.image_url ? (
                                    <img
                                        src={typeof project.image_url === 'string' && (project.image_url.startsWith('http') || project.image_url.startsWith('data:') || project.image_url.startsWith('/')) ? project.image_url : project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <ImageIcon className="text-slate-300" size={32} />
                                )}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md border ${project.status === 'ongoing'
                                            ? 'bg-orange-50/90 text-orange-600 border-orange-200'
                                            : 'bg-emerald-50/90 text-emerald-600 border-emerald-200'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{project.type}</span>
                                </div>
                                <h3 className="text-slate-900 font-bold truncate text-lg leading-tight" title={project.title}>{project.title}</h3>
                                <p className="text-slate-500 text-xs truncate mt-1 flex items-center gap-1"><MapPin size={10} /> {project.location}</p>

                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <button onClick={() => openModal(project)} className="text-xs font-bold text-slate-600 hover:text-[#022C22] flex items-center gap-1">
                                        <Edit2 size={12} /> Edit
                                    </button>
                                    {!project.is_hardcoded && (
                                        <button onClick={() => confirmDelete(project)} className="text-xs font-bold text-red-300 hover:text-red-500">
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                                    <th className="p-4 pl-6">Status</th>
                                    <th className="p-4">Project Details</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Source</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProjects.map((project: any) => (
                                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${project.status === 'completed'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    : 'bg-orange-50 text-orange-600 border-orange-200'
                                                }`}>
                                                {project.status === 'completed' ? 'Done' : 'WIP'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 text-sm">{project.title}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{project.type}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">
                                            {project.location}
                                        </td>
                                        <td className="p-4">
                                            {project.is_hardcoded ? (
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">DEFAULT</span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">DATABASE</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openModal(project)} className="p-2 rounded-lg bg-slate-100 hover:bg-[#022C22] hover:text-white text-slate-500 transition-all shadow-sm">
                                                    <Edit2 size={14} />
                                                </button>
                                                {!project.is_hardcoded && (
                                                    <button onClick={() => confirmDelete(project)} className="p-2 rounded-lg bg-red-50 hover:bg-red-500 hover:text-white text-red-400 transition-all shadow-sm">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? 'Edit Project' : 'New Project'}>
                <form onSubmit={confirmSave} className="space-y-4">
                    {editingProject?.is_hardcoded && (
                        <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg border border-yellow-200 flex gap-2 items-start">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <div>
                                <strong>Note:</strong> This is a default project. Saving changes will create a new copy in the database.
                            </div>
                        </div>
                    )}
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
                            <select
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]"
                                value={formData.status}
                                onChange={e => {
                                    const newStatus = e.target.value;
                                    setFormData({
                                        ...formData,
                                        status: newStatus,
                                        progress: newStatus === 'completed' ? 100 : formData.progress
                                    });
                                }}
                            >
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Progress (%)</label>
                            {formData.status === 'completed' ? (
                                <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-emerald-700 font-bold flex items-center gap-2">
                                    <CheckCircle size={16} /> 100% Completed
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]"
                                    value={formData.progress}
                                    onChange={e => {
                                        const newProgress = parseInt(e.target.value);
                                        setFormData({
                                            ...formData,
                                            progress: newProgress,
                                            status: newProgress >= 100 ? 'completed' : 'ongoing'
                                        });
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Upload Image (Optional)</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 hover:border-[#022C22]/30 transition-all group overflow-hidden min-h-[100px] relative"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />

                            {imagePreview ? (
                                <div className="relative w-full h-32">
                                    <img src={typeof imagePreview === 'string' && (imagePreview.startsWith('http') || imagePreview.startsWith('data:') || imagePreview.startsWith('/')) ? imagePreview : imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="text-slate-400 mx-auto mb-1" size={24} />
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Click to browse</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                        <textarea rows={3} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                        <button disabled={submitting} className="px-6 py-2 bg-[#022C22] text-white font-bold rounded-lg hover:bg-[#033a2d] transition-colors flex items-center gap-2 shadow-md">
                            {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Project
                        </button>
                    </div>
                </form>
            </Modal>

            <Notification
                type={notification.type}
                message={notification.message}
                isOpen={notification.isOpen}
                onClose={closeNotification}
                onConfirm={notification.onConfirm}
            />
        </div>
    );
};

export default ProjectsManager;
