import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import api from '../services/api';
import Notification, { NotificationType } from './components/Notification';
import logo from '../assets/arsen-logo.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(''); // Removed inline error
    const navigate = useNavigate();

    // Notification State
    const [notification, setNotification] = useState<{
        isOpen: boolean;
        type: NotificationType;
        message: string;
    }>({
        isOpen: false,
        type: 'info',
        message: ''
    });

    const showNotification = (type: NotificationType, message: string) => {
        setNotification({ isOpen: true, type, message });
    };

    const closeNotification = () => {
        setNotification(prev => ({ ...prev, isOpen: false }));
    };

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('reason') === 'timeout') {
            showNotification('info', 'Your session has expired due to inactivity. Please sign in again.');
            // Clean up the URL
            window.history.replaceState({}, '', '/admin/login');
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('admin_token', res.data.token);
            showNotification('success', 'Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1000);
        } catch (err: any) {
            // setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            showNotification('error', err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1F2A] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a2f4a] to-[#0F1F2A]">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-48 mx-auto mb-6">
                        <img src={logo} alt="Arsen Interior" className="w-full h-auto object-contain filter drop-shadow-md" />
                    </div>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Secure access to Arsen Interior CMS</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )} */}

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-widest pl-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white outline-none focus:border-[#DFA45B] focus:ring-1 ring-[#DFA45B]/20 transition-all"
                                    placeholder="admin@inymart.in"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500 tracking-widest pl-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white outline-none focus:border-[#DFA45B] focus:ring-1 ring-[#DFA45B]/20 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-[#DFA45B] hover:bg-[#c98e4a] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all group disabled:opacity-50 mt-4 uppercase tracking-widest text-xs"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <Notification
                type={notification.type}
                message={notification.message}
                isOpen={notification.isOpen}
                onClose={closeNotification}
            />
        </div>
    );
};

export default LoginPage;
