import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, Save } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';

const BannersManager = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        badge: '',
        link: '',
        image: null as File | null,
        is_active: true,
        order_index: 0
    });

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
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
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle);
        data.append('badge', formData.badge);
        data.append('link', formData.link);
        data.append('is_active', formData.is_active ? '1' : '0');
        data.append('order_index', formData.order_index.toString());
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingBanner) {
                await api.post(`/banners/${editingBanner.id}`, data);
            } else {
                await api.post('/banners', data);
            }
            fetchBanners();
            setModalOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (banner: any) => {
        setEditingBanner(banner);
        setFormData({
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            badge: banner.badge || '',
            link: banner.link || '',
            image: null,
            is_active: banner.is_active,
            order_index: banner.order_index
        });
        setModalOpen(true);
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#DFA45B]" size={40} /></div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Banners Manager</h1>
                    <p className="text-gray-500">Manage the hero carousel with premium descriptions.</p>
                </div>
                <button onClick={() => { setEditingBanner(null); setFormData({ title: '', subtitle: '', badge: '', link: '', image: null, is_active: true, order_index: 0 }); setModalOpen(true); }} className="bg-[#0F1F2A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#DFA45B] hover:text-black transition-all">
                    <Plus size={18} /> Add Banner
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {banners.map((banner: any) => (
                    <div key={banner.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
                        <div className="aspect-[16/9] bg-gray-100 italic relative overflow-hidden">
                            <img src={banner.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button onClick={() => handleEdit(banner)} className="p-4 bg-white rounded-full text-blue-500 hover:scale-110 transition-transform shadow-2xl"><Edit2 size={20} /></button>
                                <button onClick={async () => { if (window.confirm('Delete this banner?')) { await api.delete(`/banners/${banner.id}`); fetchBanners(); } }} className="p-4 bg-white rounded-full text-red-500 hover:scale-110 transition-transform shadow-2xl"><Trash2 size={20} /></button>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-[#DFA45B] text-black text-[10px] font-black uppercase tracking-widest rounded-full">{banner.badge || 'PREMIUM'}</span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-bold text-xl mb-2 italic tracking-tight uppercase">{banner.title || 'Untitled'}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{banner.subtitle || 'No description provided.'}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${banner.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {banner.is_active ? 'Active' : 'Hidden'}
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order: {banner.order_index}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBanner ? 'Edit Luxury Banner' : 'Create New Banner'}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-1">Main Heading</label>
                            <input className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Technical Excellence" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-1">Category Badge</label>
                            <input className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} placeholder="PMC, COMMERCIAL, etc." />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-1">Description (Subtitle)</label>
                        <textarea className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all h-24 resize-none" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} placeholder="A cinematic description for the slider..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-1">Target Link (URL)</label>
                        <input className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#DFA45B] transition-all" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="/projects or custom link" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-1">Upload Cinematic Image</label>
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-[#DFA45B] transition-all group relative">
                            <ImageIcon className="text-gray-300 group-hover:text-[#DFA45B] transition-colors mb-2" size={32} />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                {formData.image ? formData.image.name : 'Select JPG or PNG'}
                            </span>
                            <input type="file" onChange={e => setFormData({ ...formData, image: e.target.files?.[0] || null })} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                    </div>

                    <button disabled={submitting} className="w-full bg-[#0F1F2A] hover:bg-[#DFA45B] text-white hover:text-black py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                        {submitting ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Update Slider Data</>}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default BannersManager;
