import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe, Eye, EyeOff, Save, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';

const BannersManager = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        badge: '',
        image_url: '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingBanner) {
                await api.put(`/banners/${editingBanner.id}`, formData);
            } else {
                await api.post('/banners', formData);
            }
            fetchBanners();
            setModalOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this banner?')) return;
        try {
            await api.delete(`/banners/${id}`);
            fetchBanners();
        } catch (err) { console.error(err); }
    };

    const openModal = (banner?: any) => {
        if (banner) {
            setEditingBanner(banner);
            setFormData({
                title: banner.title,
                subtitle: banner.subtitle,
                badge: banner.badge || '',
                image_url: banner.image_url,
                order_index: banner.order_index,
                is_active: !!banner.is_active
            });
        } else {
            setEditingBanner(null);
            setFormData({ title: '', subtitle: '', badge: 'FEATURED', image_url: '', order_index: banners.length + 1, is_active: true });
        }
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
                            <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
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
                                <button onClick={() => handleDelete(banner.id)} className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-red-100">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBanner ? 'Edit Banner' : 'New Banner'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                        <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
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
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                        <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm font-mono outline-none focus:border-[#022C22]" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} required />
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
        </div>
    );
};

export default BannersManager;
