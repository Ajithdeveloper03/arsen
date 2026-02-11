import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Phone, Mail, MapPin, Globe, Loader2 } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';

const ContactDetailsManager = () => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingDetail, setEditingDetail] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        type: 'phone',
        label: '',
        value: '',
        order_index: 0
    });

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const res = await api.get('/contact-details');
            setDetails(res.data);
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
            if (editingDetail) {
                await api.put(`/contact-details/${editingDetail.id}`, formData);
            } else {
                await api.post('/contact-details', formData);
            }
            fetchDetails();
            setModalOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'phone': return <Phone size={20} />;
            case 'email': return <Mail size={20} />;
            case 'address': return <MapPin size={20} />;
            default: return <Globe size={20} />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Contact Manager</h1>
                    <p className="text-gray-500">Manage phone numbers, emails, and office locations.</p>
                </div>
                <button onClick={() => { setEditingDetail(null); setModalOpen(true); }} className="bg-[#0F1F2A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#DFA45B] hover:text-black transition-all">
                    <Plus size={18} /> Add Detail
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Type</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Label</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">Value</th>
                            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {details.map((detail: any) => (
                            <tr key={detail.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        {getIcon(detail.type)}
                                        <span className="uppercase text-[10px] font-black tracking-widest">{detail.type}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-bold">{detail.label}</td>
                                <td className="px-8 py-6 text-gray-500">{detail.value}</td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => { setEditingDetail(detail); setFormData({ type: detail.type, label: detail.label, value: detail.value, order_index: detail.order_index }); setModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-500"><Edit2 size={18} /></button>
                                        <button onClick={async () => { if (window.confirm('Delete?')) { await api.delete(`/contact-details/${detail.id}`); fetchDetails(); } }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingDetail ? 'Edit Detail' : 'Add Detail'}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Type</label>
                        <select className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                            <option value="address">Address</option>
                            <option value="social">Social Media</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Label</label>
                        <input className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4" value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} placeholder="e.g. Sales Office" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Value</label>
                        <textarea className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} placeholder="e.g. +91 123 456 7890" />
                    </div>
                    <button disabled={submitting} className="w-full bg-[#0F1F2A] text-white py-6 rounded-full font-black uppercase tracking-widest text-xs">
                        {submitting ? 'Saving...' : 'Save Detail'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ContactDetailsManager;
