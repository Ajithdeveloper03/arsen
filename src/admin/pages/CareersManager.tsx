import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, Briefcase, Save, Loader2, X, Upload, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';
import Notification, { NotificationType } from '../components/Notification';

const CareersManager = () => {
    const [careers, setCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [specInput, setSpecInput] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [respInput, setRespInput] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        salary: '',
        contact_email: '',
        description: '',
        specifications: [] as string[],
        skills: [] as string[],
        responsibilities: [] as string[],
        is_active: true
    });

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/careers');
            setCareers(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
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
            editingCareer ? 'Update this job listing?' : 'Post new job listing?',
            () => executeSubmit()
        );
    };

    const executeSubmit = async () => {
        setSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('department', formData.department);
        data.append('location', formData.location);
        data.append('salary', formData.salary || '');
        data.append('contact_email', formData.contact_email || '');
        data.append('description', formData.description || '');
        data.append('is_active', formData.is_active ? '1' : '0');

        formData.specifications.forEach((s, i) => data.append(`specifications[${i}]`, s));
        formData.skills.forEach((s, i) => data.append(`skills[${i}]`, s));
        formData.responsibilities.forEach((s, i) => data.append(`responsibilities[${i}]`, s));

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            if (editingCareer) {
                await api.post(`/careers/${editingCareer.id}`, data);
            } else {
                await api.post('/careers', data);
            }
            fetchCareers();
            setModalOpen(false);
            showNotification('success', editingCareer ? 'Job updated successfully!' : 'Job posted successfully!');
        } catch (err) {
            console.error(err);
            showNotification('error', 'Error saving job listing.');
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = (id: number) => {
        showNotification(
            'confirm',
            'Delete this job listing? This action cannot be undone.',
            () => executeDelete(id)
        );
    };

    const executeDelete = async (id: number) => {
        try {
            await api.delete(`/careers/${id}`);
            fetchCareers();
            showNotification('success', 'Job listing deleted successfully.');
        } catch (err) {
            console.error(err);
            showNotification('error', 'Failed to delete job listing.');
        }
    };

    const addSpec = () => {
        if (specInput.trim()) {
            setFormData({ ...formData, specifications: [...formData.specifications, specInput.trim()] });
            setSpecInput('');
        }
    };
    const removeSpec = (idx: number) => {
        setFormData({ ...formData, specifications: formData.specifications.filter((_, i) => i !== idx) });
    };

    const addSkill = () => {
        if (skillInput.trim()) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };
    const removeSkill = (idx: number) => {
        setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== idx) });
    };

    const addResp = () => {
        if (respInput.trim()) {
            setFormData({ ...formData, responsibilities: [...formData.responsibilities, respInput.trim()] });
            setRespInput('');
        }
    };
    const removeResp = (idx: number) => {
        setFormData({ ...formData, responsibilities: formData.responsibilities.filter((_, i) => i !== idx) });
    };

    const openModal = (career?: any) => {
        setSelectedFile(null);
        setImagePreview(career?.image_url || null);
        if (career) {
            setEditingCareer(career);
            let parsedSpecs = [];
            let parsedSkills = [];
            let parsedResps = [];
            try { parsedSpecs = typeof career.specifications === 'string' ? JSON.parse(career.specifications) : (career.specifications || []); } catch (e) { }
            try { parsedSkills = typeof career.skills === 'string' ? JSON.parse(career.skills) : (career.skills || []); } catch (e) { }
            try { parsedResps = typeof career.responsibilities === 'string' ? JSON.parse(career.responsibilities) : (career.responsibilities || []); } catch (e) { }

            setFormData({
                title: career.title,
                department: career.department,
                location: career.location,
                salary: career.salary || '',
                contact_email: career.contact_email || '',
                description: career.description || '',
                specifications: Array.isArray(parsedSpecs) ? parsedSpecs : [],
                skills: Array.isArray(parsedSkills) ? parsedSkills : [],
                responsibilities: Array.isArray(parsedResps) ? parsedResps : [],
                is_active: !!career.is_active
            });
        } else {
            setEditingCareer(null);
            setFormData({
                title: '',
                department: '',
                location: '',
                salary: '',
                contact_email: '',
                description: '',
                specifications: [],
                skills: [],
                responsibilities: [],
                is_active: true
            });
        }
        setModalOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Career Opportunities</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage job openings and specifications.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-[#022C22] hover:bg-[#033a2d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus size={18} /> Post Job
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <div className="text-slate-500 p-4">Loading jobs...</div> : careers.map((job) => (
                    <div key={job.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg flex flex-col hover:border-[#022C22]/30 transition-all group">
                        {/* Image Preview if available */}
                        {job.image_url && (
                            <div className="h-40 w-full relative">
                                <img src={job.image_url} alt={job.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        )}

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[#022C22] text-xs font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">{job.department}</span>
                                {job.is_active ?
                                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase border border-green-200">Open</span> :
                                    <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase border border-slate-200">Closed</span>
                                }
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
                            <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                <span className="flex items-center gap-1"><Briefcase size={14} /> {job.salary}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {(() => {
                                    try {
                                        const specs = typeof job.specifications === 'string' ? JSON.parse(job.specifications) : job.specifications;
                                        return Array.isArray(specs) ? specs.slice(0, 3).map((s: string, i: number) => (
                                            <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">{s}</span>
                                        )) : null;
                                    } catch (e) { return null; }
                                })()}
                            </div>

                            <div className="mt-auto flex gap-3 pt-4 border-t border-slate-100">
                                <button onClick={() => openModal(job)} className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => confirmDelete(job.id)} className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-red-100">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCareer ? 'Edit Job Posting' : 'New Job Posting'}>
                <form onSubmit={confirmSave} className="space-y-4">
                    <div className="max-h-[60vh] overflow-y-auto px-1 space-y-4 custom-scrollbar">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title</label>
                                <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                                <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Salary Range</label>
                                <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} placeholder="e.g. Competitive" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.is_active ? '1' : '0'} onChange={e => setFormData({ ...formData, is_active: e.target.value === '1' })}>
                                    <option value="1">Active (Open)</option>
                                    <option value="0">Inactive (Closed)</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact Email (Optional)</label>
                                <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.contact_email} onChange={e => setFormData({ ...formData, contact_email: e.target.value })} placeholder="e.g. careers@arsen.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Description</label>
                            <textarea
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22] min-h-[100px]"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Write a detailed job description..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Featured Image</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative h-32 w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl overflow-hidden cursor-pointer hover:border-[#022C22] transition-colors flex flex-col items-center justify-center gap-2"
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                                        <div className="relative z-10 flex flex-col items-center gap-1">
                                            <Upload className="text-slate-700" size={20} />
                                            <span className="text-xs font-bold text-slate-800 bg-white/80 px-2 py-1 rounded">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="text-slate-400" size={24} />
                                        <span className="text-xs font-bold text-slate-500">Click to upload image</span>
                                    </>
                                )}
                                <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </div>
                        </div>

                        {/* Specifications Builder */}
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Qualifications / Specifications</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    className="flex-1 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#022C22]"
                                    placeholder="Add a requirement..."
                                    value={specInput}
                                    onChange={e => setSpecInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSpec())}
                                />
                                <button type="button" onClick={addSpec} className="px-3 bg-[#022C22] text-white rounded font-bold text-sm hover:bg-[#033a2d]">+</button>
                            </div>
                            <div className="flex flex-wrap gap-2 text-slate-700">
                                {formData.specifications.map((spec, i) => (
                                    <span key={i} className="bg-white border border-slate-200 px-2 py-1 rounded text-xs flex items-center gap-1 shadow-sm font-medium">
                                        {spec} <button type="button" onClick={() => removeSpec(i)} className="text-slate-400 hover:text-red-500"><X size={12} /></button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Skills Builder */}
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Required Skills</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    className="flex-1 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#022C22]"
                                    placeholder="Add a skill..."
                                    value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                />
                                <button type="button" onClick={addSkill} className="px-3 bg-[#022C22] text-white rounded font-bold text-sm hover:bg-[#033a2d]">+</button>
                            </div>
                            <div className="flex flex-wrap gap-2 text-slate-700">
                                {formData.skills.map((skill, i) => (
                                    <span key={i} className="bg-white border border-slate-200 px-2 py-1 rounded text-xs flex items-center gap-1 shadow-sm font-medium">
                                        {skill} <button type="button" onClick={() => removeSkill(i)} className="text-slate-400 hover:text-red-500"><X size={12} /></button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Responsibilities Builder */}
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Responsibilities</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    className="flex-1 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#022C22]"
                                    placeholder="Add a responsibility..."
                                    value={respInput}
                                    onChange={e => setRespInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addResp())}
                                />
                                <button type="button" onClick={addResp} className="px-3 bg-[#022C22] text-white rounded font-bold text-sm hover:bg-[#033a2d]">+</button>
                            </div>
                            <div className="flex flex-wrap gap-2 text-slate-700">
                                {formData.responsibilities.map((resp, i) => (
                                    <span key={i} className="bg-white border border-slate-200 px-2 py-1 rounded text-xs flex items-center gap-1 shadow-sm font-medium">
                                        {resp} <button type="button" onClick={() => removeResp(i)} className="text-slate-400 hover:text-red-500"><X size={12} /></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                        <button disabled={submitting} className="px-6 py-2 bg-[#022C22] text-white font-bold rounded-lg hover:bg-[#033a2d] transition-colors flex items-center gap-2 shadow-md">
                            {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Job
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

export default CareersManager;
