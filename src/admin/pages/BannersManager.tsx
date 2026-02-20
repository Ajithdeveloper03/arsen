import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import api, { BASE_URL } from '../../services/api';
import Modal from '../components/Modal';
import Notification, { NotificationType } from '../components/Notification';

const BannersManager = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
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
        subtitle: '',
        badge: '',
        link_text: '',
        link_url: '',
        order_index: 0,
        is_active: true
    });

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await api.get('/banners');
            setBanners(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
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
            editingBanner ? 'Update this banner?' : 'Create new banner?',
            () => executeSubmit()
        );
    };

    const executeSubmit = async () => {
        setSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title || '');
        data.append('subtitle', formData.subtitle || '');
        data.append('badge', formData.badge || '');
        data.append('link_text', formData.link_text || '');
        data.append('link_url', formData.link_url || '');
        data.append('order_index', formData.order_index.toString());
        data.append('is_active', formData.is_active ? '1' : '0');

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            if (editingBanner) {
                await api.post(`/banners/${editingBanner.id}`, data);
            } else {
                await api.post('/banners', data);
            }
            fetchBanners();
            setModalOpen(false);
            showNotification('success', editingBanner ? 'Banner updated successfully!' : 'Banner created successfully!');
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || 'Error saving banner. Please check all fields and try again.';
            showNotification('error', message);
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = (id: number) => {
        showNotification(
            'confirm',
            'Delete this banner? This action cannot be undone.',
            () => executeDelete(id)
        );
    };

    const executeDelete = async (id: number) => {
        try {
            await api.delete(`/banners/${id}`);
            fetchBanners();
            showNotification('success', 'Banner deleted successfully.');
        } catch (err) {
            console.error(err);
            showNotification('error', 'Failed to delete banner.');
        }
    };

    const openModal = (banner?: any) => {
        if (banner) {
            setEditingBanner(banner);
            setFormData({
                title: banner.title || '',
                subtitle: banner.subtitle || '',
                badge: banner.badge || '',
                link_text: banner.link_text || '',
                link_url: banner.link_url || '',
                order_index: banner.order_index,
                is_active: !!banner.is_active
            });
            setImagePreview(banner.image_url);
        } else {
            setEditingBanner(null);
            setFormData({ title: '', subtitle: '', badge: 'FEATURED', link_text: '', link_url: '', order_index: banners.length + 1, is_active: true });
            setImagePreview(null);
        }
        setSelectedFile(null);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Homepage Banners</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage the slides shown on the main landing page.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-[#022C22] hover:bg-[#033a2d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus size={18} /> Add Banner
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <div className="text-slate-500 p-4">Loading banners...</div> : banners.map((banner) => (
                    <div key={banner.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col hover:border-[#022C22]/30 group">
                        <div className="relative h-48 bg-slate-100">
                            <img src={banner.image_url?.startsWith('http') ? banner.image_url : `${BASE_URL}${banner.image_url}`} alt={banner.title} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3 flex gap-2">
                                <span className="bg-white/90 text-slate-800 text-xs font-bold px-2 py-1 rounded border border-slate-200 shadow-sm">Seq: {banner.order_index}</span>
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                                    {banner.badge}
                                </span>
                                {banner.is_active ?
                                    <span className="flex items-center gap-1 text-xs font-bold text-green-600"><Eye size={14} /> Active</span> :
                                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><EyeOff size={14} /> Hidden</span>
                                }
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1" title={banner.title}>{banner.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{banner.subtitle}</p>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button onClick={() => openModal(banner)} className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-slate-200">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => confirmDelete(banner.id)} className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-red-100">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBanner ? 'Edit Banner' : 'New Banner'}>
                <form onSubmit={confirmSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                        <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required={!editingBanner} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Badge</label>
                            <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sequence</label>
                            <input type="number" className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.order_index} onChange={e => setFormData({ ...formData, order_index: parseInt(e.target.value) })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Banner Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 hover:border-[#022C22]/30 transition-all group overflow-hidden min-h-[160px] relative"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />

                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity group-hover:opacity-40" />
                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center">
                                        <Upload className="text-[#022C22]" size={32} />
                                        <p className="text-sm font-bold text-slate-800">Change Image</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="text-slate-400 group-hover:text-[#022C22] transition-colors" size={32} />
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-800">Click to upload image</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-black mt-1">PNG, JPG or WEBP (Max 2MB)</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtitle</label>
                        <textarea rows={3} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="active" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4 cursor-pointer accent-[#022C22]" />
                        <label htmlFor="active" className="text-sm font-bold text-slate-700 cursor-pointer">Active on Website</label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                        <button disabled={submitting} className="px-6 py-2 bg-[#022C22] text-white font-bold rounded-lg hover:bg-[#033a2d] transition-colors flex items-center gap-2 shadow-md">
                            {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
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

export default BannersManager;

