import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Phone, Mail, MapPin, Globe, Loader2, Link as LinkIcon, Instagram, Facebook, Twitter, Linkedin, Save } from 'lucide-react';
import api from '../../services/api';
import Modal from '../components/Modal';
import Notification, { NotificationType } from '../components/Notification';

const ContactDetailsManager = () => {
    const [details, setDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingDetail, setEditingDetail] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

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
        type: 'phone',
        label: '',
        value: '',
        icon: 'Phone',
        order_index: 0
    });

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const res = await api.get('/contact-details');
            setDetails(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const confirmSave = (e: React.FormEvent) => {
        e.preventDefault();
        showNotification(
            'confirm',
            editingDetail ? 'Update this contact detail?' : 'Add new contact detail?',
            () => executeSubmit()
        );
    };

    const executeSubmit = async () => {
        setSubmitting(true);
        try {
            if (editingDetail) {
                await api.put(`/contact-details/${editingDetail.id}`, formData);
            } else {
                await api.post('/contact-details', formData);
            }
            fetchDetails();
            setModalOpen(false);
            showNotification('success', editingDetail ? 'Contact info updated!' : 'Contact info added!');
        } catch (err) {
            console.error(err);
            showNotification('error', 'Failed to save contact info.');
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = (id: number) => {
        showNotification(
            'confirm',
            'Delete this contact info?',
            () => executeDelete(id)
        );
    };

    const executeDelete = async (id: number) => {
        try {
            await api.delete(`/contact-details/${id}`);
            fetchDetails();
            showNotification('success', 'Contact info deleted.');
        } catch (e) {
            showNotification('error', 'Failed to delete contact info.');
        }
    };

    const getIcon = (iconName: string) => {
        const props = { size: 18 };
        switch (iconName) {
            case 'Phone': return <Phone {...props} />;
            case 'Mail': return <Mail {...props} />;
            case 'MapPin': return <MapPin {...props} />;
            case 'Globe': return <Globe {...props} />;
            case 'Instagram': return <Instagram {...props} />;
            case 'Facebook': return <Facebook {...props} />;
            case 'Twitter': return <Twitter {...props} />;
            case 'Linkedin': return <Linkedin {...props} />;
            default: return <LinkIcon {...props} />;
        }
    };

    const openModal = (detail?: any) => {
        if (detail) {
            setEditingDetail(detail);
            setFormData({ type: detail.type, label: detail.label, value: detail.value, icon: detail.icon || 'Phone', order_index: detail.order_index });
        } else {
            setEditingDetail(null);
            setFormData({ type: 'phone', label: '', value: '', icon: 'Phone', order_index: details.length + 1 });
        }
        setModalOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contact Info</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage addresses, phones, and social links.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-[#022C22] hover:bg-[#033a2d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus size={18} /> Add Contact
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Type / Icon</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Label</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Value</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr> : details.map((detail) => (
                            <tr key={detail.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <div className="p-2 bg-slate-100 rounded-lg text-[#022C22] border border-slate-200">
                                            {getIcon(detail.icon)}
                                        </div>
                                        <span className="text-sm font-medium capitalize text-slate-500">{detail.type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">{detail.label}</td>
                                <td className="px-6 py-4 text-sm text-slate-500 font-mono truncate max-w-xs">{detail.value}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => openModal(detail)} className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"><Edit2 size={16} /></button>
                                        <button onClick={() => confirmDelete(detail.id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingDetail ? 'Edit Info' : 'New Contact Info'}>
                <form onSubmit={confirmSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                                <option value="address">Address</option>
                                <option value="social">Social Media</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Display Label</label>
                            <input className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Value / URL</label>
                        <textarea rows={2} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none focus:border-[#022C22]" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} required />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Display Icon</label>
                        <div className="flex flex-wrap gap-2">
                            {['Phone', 'Mail', 'MapPin', 'Globe', 'Facebook', 'Instagram', 'Twitter', 'Linkedin'].map(icon => (
                                <button
                                    type="button"
                                    key={icon}
                                    onClick={() => setFormData({ ...formData, icon })}
                                    className={`p-2 rounded-lg border flex items-center gap-2 text-xs font-medium transition-all ${formData.icon === icon ? 'bg-[#022C22] text-white border-[#022C22]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                                >
                                    {getIcon(icon)} {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
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

export default ContactDetailsManager;
