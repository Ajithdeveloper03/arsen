
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, Save, ImageIcon, LayoutGrid, List, MapPin, Database, CheckCircle, Image, X } from 'lucide-react';
import api, { BASE_URL } from '../../services/api';
import Modal from '../components/Modal';
import Notification, { NotificationType } from '../components/Notification';


// Helper to build full image URL
const buildImgUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
    return `${BASE_URL}${url}`;
};

// ------------------------------------------------------------------
// TYPE
// ------------------------------------------------------------------
interface SlotState {
    preview: string | null;   // Data URL or server URL for preview
    file: File | null;        // New selected file
    remove: boolean;          // Mark for removal
}

const emptySlot = (): SlotState => ({ preview: null, file: null, remove: false });

// ------------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------------
const ProjectsManager = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    // 4-slot image state
    const [imageSlots, setImageSlots] = useState<SlotState[]>([emptySlot(), emptySlot(), emptySlot(), emptySlot()]);
    const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    // Notification
    const [notification, setNotification] = useState<{ isOpen: boolean; type: NotificationType; message: string; onConfirm?: () => void; }>({
        isOpen: false, type: 'info', message: ''
    });
    const showNotification = (type: NotificationType, message: string, onConfirm?: () => void) => {
        setNotification({ isOpen: true, type, message, onConfirm });
    };
    const closeNotification = () => setNotification(prev => ({ ...prev, isOpen: false }));

    // Form state
    const [formData, setFormData] = useState({
        title: '', location: '', progress: 0, type: 'Residential', description: '', status: 'ongoing', is_featured: false,
    });

    useEffect(() => { fetchProjects(); }, []);

    useEffect(() => {
        let result = [...projects];
        if (statusFilter !== 'all') result = result.filter(p => p.status === statusFilter);
        if (typeFilter !== 'all') result = result.filter(p => p.type === typeFilter);
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(p => p.title?.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q));
        }
        setFilteredProjects(result);
    }, [projects, search, statusFilter, typeFilter]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    // ------------------------------------------------------------------
    // IMAGE SLOT HANDLERS
    // ------------------------------------------------------------------
    const handleSlotFileChange = (slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSlots(prev => {
                const next = [...prev];
                next[slotIndex] = { preview: reader.result as string, file, remove: false };
                return next;
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSlotRemove = (slotIndex: number) => {
        setImageSlots(prev => {
            const next = [...prev];
            // If it was a server image (no new file selected), mark for removal
            next[slotIndex] = { preview: null, file: null, remove: slotIndex > 0 }; // slot 0 (main) can't be fully removed
            return next;
        });
    };

    // ------------------------------------------------------------------
    // OPEN MODAL
    // ------------------------------------------------------------------
    const openModal = (project?: any) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title || '',
                location: project.location || '',
                progress: project.progress ?? 0,
                type: project.type || 'Residential',
                description: project.description || '',
                status: project.status || 'ongoing',
                is_featured: !!project.is_featured,
            });

            // Populate slots from project
            const serverUrls = [
                project.image_url, project.image_url_2, project.image_url_3, project.image_url_4
            ];
            setImageSlots(serverUrls.map(url => ({
                preview: url ? buildImgUrl(url) : null,
                file: null,
                remove: false,
            })));
        } else {
            setEditingProject(null);
            setFormData({ title: '', location: '', progress: 0, type: 'Residential', description: '', status: 'ongoing', is_featured: false });
            setImageSlots([emptySlot(), emptySlot(), emptySlot(), emptySlot()]);
        }
        setModalOpen(true);
    };

    // ------------------------------------------------------------------
    // SAVE
    // ------------------------------------------------------------------
    const confirmSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            showNotification('error', 'Title is required.');
            return;
        }
        showNotification('confirm',
            editingProject ? `Update project "${formData.title}"?` : `Create new project "${formData.title}"?`,
            () => executeSubmit()
        );
    };

    const executeSubmit = async () => {
        setSubmitting(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('location', formData.location || '');
        data.append('progress', formData.progress.toString());
        data.append('type', formData.type);
        data.append('description', formData.description || '');
        data.append('status', formData.status);
        data.append('is_featured', formData.is_featured ? '1' : '0');

        // Image slots - handle both new files and removal
        const fieldNames = ['image', 'image2', 'image3', 'image4'];
        const removeFields = ['', 'remove_image2', 'remove_image3', 'remove_image4'];

        imageSlots.forEach((slot, i) => {
            if (slot.file) {
                // New file selected - upload it
                data.append(fieldNames[i], slot.file);
                console.log(`Appending file ${fieldNames[i]}:`, slot.file.name, slot.file.type);
            } else if (slot.remove && i > 0) {
                // Mark existing image for removal (only for slots 1-3)
                data.append(removeFields[i], '1');
                console.log(`Marking ${removeFields[i]} for removal`);
            }
            // If slot has existing preview and no new file/removal, keep existing image
        });

        try {
            if (editingProject) {
                await api.post(`/projects/${editingProject.id}`, data);
                showNotification('success', '✅ Project updated successfully!');
            } else {
                await api.post('/projects', data);
                showNotification('success', '✅ Project created successfully!');
            }
            fetchProjects();
            setModalOpen(false);
        } catch (err: any) {
            console.error('Save error:', err.response?.data);
            const errors = err.response?.data?.errors;
            if (errors) {
                const messages = Object.values(errors).flat().join(' | ');
                showNotification('error', `Validation Error: ${messages}`);
            } else {
                const message = err.response?.data?.message || 'Error saving project. Please try again.';
                showNotification('error', message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    // ------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------
    const confirmDelete = (project: any) => {
        showNotification('confirm', `Delete "${project.title}"? This cannot be undone.`, () => executeDelete(project.id));
    };

    const executeDelete = async (id: number) => {
        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
            showNotification('success', 'Project deleted successfully.');
        } catch {
            showNotification('error', 'Failed to delete project.');
        }
    };

    // ------------------------------------------------------------------
    // STATS
    // ------------------------------------------------------------------
    const stats = useMemo(() => ({
        total: projects.length,
        completed: projects.filter(p => p.status === 'completed').length,
        ongoing: projects.filter(p => p.status === 'ongoing').length,
    }), [projects]);

    // ------------------------------------------------------------------
    // IMAGE SLOT UI
    // ------------------------------------------------------------------
    const ImageSlot = ({ index, label }: { index: number; label: string }) => {
        const slot = imageSlots[index];
        return (
            <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                <div
                    className="relative rounded-xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#022C22]/50 hover:bg-slate-100 transition-all group"
                    style={{ minHeight: 110 }}
                    onClick={() => fileRefs[index].current?.click()}
                >
                    <input
                        ref={fileRefs[index]}
                        type="file"
                        accept="image/*,.jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.avif,.heic,.heif,.tiff,.ico"
                        className="hidden"
                        onChange={e => handleSlotFileChange(index, e)}
                    />

                    {slot.preview ? (
                        <>
                            <img src={slot.preview} className="absolute inset-0 w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white text-[10px] font-bold uppercase bg-black/50 px-2 py-1 rounded-md">Change</span>
                            </div>
                            {/* Remove button for slots 1–3 */}
                            {(index > 0) && (
                                <button
                                    type="button"
                                    onClick={e => { e.stopPropagation(); handleSlotRemove(index); }}
                                    className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                                    title="Remove image"
                                >
                                    <X size={10} />
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="text-center p-3">
                            <Image size={22} className="text-slate-300 mx-auto mb-1.5" />
                            <p className="text-[9px] text-slate-400 font-bold uppercase leading-tight">
                                {index === 0 ? 'Main image' : `Image ${index + 1}`}
                            </p>
                            <p className="text-[8px] text-slate-300 mt-0.5">Click to upload</p>
                        </div>
                    )}
                </div>
                {slot.file && (
                    <p className="text-[8px] text-emerald-600 font-bold truncate px-0.5" title={slot.file.name}>
                        ✓ {slot.file.name}
                    </p>
                )}
            </div>
        );
    };

    // ------------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------------
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-20">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Projects</span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2">{stats.total}</div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Completed</span>
                    <div className="text-2xl sm:text-3xl font-black text-[#F28C28] mt-1 sm:mt-2">{stats.completed}</div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Ongoing</span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 sm:mt-2">{stats.ongoing}</div>
                </div>
                <div className="bg-[#022C22] p-4 sm:p-6 rounded-2xl shadow-sm border border-[#022C22] text-white cursor-pointer hover:bg-[#033a2d] transition-colors" onClick={() => openModal()}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg shrink-0"><Plus size={18} /></div>
                        <div>
                            <div className="text-sm sm:text-lg font-bold">Add Project</div>
                            <div className="text-[9px] sm:text-xs text-white/60">Create entry</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm sticky top-4 z-10 transition-all">
                <div className="relative w-full md:w-80 lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search projects..." className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-9 pr-4 text-slate-700 placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-[#022C22]/10 focus:border-[#022C22] transition-all text-xs sm:text-sm font-medium"
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                    <div className="bg-slate-100 p-1 rounded-lg flex border border-slate-200 shrink-0">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 sm:p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#022C22]' : 'text-slate-400 hover:text-slate-600'}`} title="Grid View">
                            <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setViewMode('table')} className={`p-1.5 sm:p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-[#022C22]' : 'text-slate-400 hover:text-slate-600'}`} title="Table View">
                            <List size={16} />
                        </button>
                    </div>
                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 sm:px-4 py-2 bg-slate-100 rounded-lg text-[11px] sm:text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-[#022C22]/10">
                        <option value="all">All Types</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Luxe Detail">Luxe Detail</option>
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 sm:px-4 py-2 bg-slate-100 rounded-lg text-[11px] sm:text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-[#022C22]/10">
                        <option value="all">All Status</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* List/Grid */}
            {loading ? (
                <div className="bg-white p-12 sm:p-20 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-[#022C22]" size={32} />
                    <p className="text-slate-500 font-medium text-sm">Loading projects...</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="bg-white p-12 sm:p-20 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-400">
                    <Database size={32} className="mx-auto mb-4 opacity-30" />
                    <p className="font-bold uppercase tracking-widest text-xs">No projects found</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#022C22]/30 hover:shadow-lg transition-all shadow-sm group flex flex-col">
                            <div className="h-48 relative bg-slate-100 flex items-center justify-center overflow-hidden">
                                {project.image_url ? (
                                    <img src={buildImgUrl(project.image_url) || ''} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <ImageIcon className="text-slate-300" size={32} />
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md border ${project.status === 'ongoing' ? 'bg-orange-50/90 text-orange-600 border-orange-200' : 'bg-emerald-50/90 text-emerald-600 border-emerald-200'}`}>
                                        {project.status}
                                    </span>
                                </div>
                                {/* Image count badge */}
                                {[project.image_url_2, project.image_url_3, project.image_url_4].filter(Boolean).length > 0 && (
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                                        +{[project.image_url_2, project.image_url_3, project.image_url_4].filter(Boolean).length} more
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{project.type}</span>
                                <h3 className="text-slate-900 font-bold text-base leading-tight mt-1" title={project.title}>{project.title}</h3>
                                <p className="text-slate-500 text-xs mt-1 flex items-center gap-1"><MapPin size={10} /> {project.location}</p>
                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <button onClick={() => openModal(project)} className="text-xs font-bold text-slate-600 hover:text-[#022C22] flex items-center gap-1">
                                        <Edit2 size={12} /> Edit
                                    </button>
                                    <button onClick={() => confirmDelete(project)} className="text-xs font-bold text-red-300 hover:text-red-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                                    <th className="p-4 pl-6">Status</th>
                                    <th className="p-4">Project</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Progress</th>
                                    <th className="p-4">Images</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProjects.map(project => (
                                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${project.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
                                                {project.status === 'completed' ? 'Done' : 'WIP'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {project.image_url ? (
                                                    <img src={buildImgUrl(project.image_url) || ''} className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0" alt="" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                        <ImageIcon size={14} className="text-slate-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="font-bold text-slate-900 text-sm">{project.title}</span>
                                                    {project.is_featured && <span className="ml-2 text-[9px] text-[#c9a050] font-black uppercase">★ Featured</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">{project.location}</td>
                                        <td className="p-4 text-sm text-slate-500">{project.type}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${project.status === 'completed' ? 'bg-emerald-500' : 'bg-orange-400'}`} style={{ width: `${project.progress}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">{project.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs font-bold text-slate-400">
                                                {[project.image_url, project.image_url_2, project.image_url_3, project.image_url_4].filter(Boolean).length} / 4
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openModal(project)} className="p-2 rounded-lg bg-slate-100 hover:bg-[#022C22] hover:text-white text-slate-500 transition-all shadow-sm">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button onClick={() => confirmDelete(project)} className="p-2 rounded-lg bg-red-50 hover:bg-red-500 hover:text-white text-red-400 transition-all shadow-sm">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? `Edit: ${editingProject.title}` : 'New Project'}>
                <form onSubmit={confirmSave} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Project Title *</label>
                        <input
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:border-[#022C22] focus:ring-2 focus:ring-[#022C22]/10 font-medium transition-all"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="e.g. Sundaram Finance HQ"
                        />
                    </div>

                    {/* Location + Type - responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                            <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:border-[#022C22] transition-all" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Chennai" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:border-[#022C22] transition-all" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Hospitality</option>
                                <option>Industrial</option>
                                <option>Luxe Detail</option>
                            </select>
                        </div>
                    </div>

                    {/* Status + Progress - responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:border-[#022C22] transition-all" value={formData.status}
                                onChange={e => {
                                    const s = e.target.value;
                                    setFormData({ ...formData, status: s, progress: s === 'completed' ? 100 : formData.progress });
                                }}>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Progress (%)</label>
                            {formData.status === 'completed' ? (
                                <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5 text-emerald-700 font-bold flex items-center gap-2 text-sm">
                                    <CheckCircle size={16} /> 100% Completed
                                </div>
                            ) : (
                                <input type="number" min={0} max={100} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:border-[#022C22] transition-all" value={formData.progress}
                                    onChange={e => {
                                        const v = parseInt(e.target.value);
                                        setFormData({ ...formData, progress: v, status: v >= 100 ? 'completed' : 'ongoing' });
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                        <textarea rows={3} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 outline-none focus:border-[#022C22] transition-all resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of the project..." />
                    </div>

                    {/* 4 Image Slots */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Project Images (Up to 4)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <ImageSlot index={0} label="Main Image" />
                            <ImageSlot index={1} label="Image 2" />
                            <ImageSlot index={2} label="Image 3" />
                            <ImageSlot index={3} label="Image 4" />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">💡 All 4 images appear as a slider on the Ongoing Projects page. Accepted: jpg, png, webp, avif, heic, svg (max 15MB each)</p>
                    </div>

                    {/* Featured toggle */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <input type="checkbox" id="is_featured" checked={formData.is_featured} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} className="w-4 h-4 accent-[#022C22]" />
                        <label htmlFor="is_featured" className="text-sm font-bold text-slate-700 cursor-pointer">Mark as Featured Project <span className="text-[10px] text-slate-400 font-normal">(Shown prominently on home & completed pages)</span></label>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setModalOpen(false)} className="w-full sm:w-auto px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 text-center">Cancel</button>
                        <button disabled={submitting} className="w-full sm:w-auto px-6 py-2.5 bg-[#022C22] text-white font-bold rounded-lg hover:bg-[#033a2d] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
                            {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {editingProject ? 'Update Project' : 'Save Project'}
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
