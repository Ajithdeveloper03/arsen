import React, { useState } from 'react';
import {
    ShieldCheck, KeyRound, Mail, User, Eye, EyeOff, Lock,
    Loader2, CheckCircle2, AlertTriangle, Info
} from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Notification, { NotificationType } from '../components/Notification';

// ── Password strength checker ──────────────────────────────────────────────
const getPasswordStrength = (pw: string) => {
    if (!pw) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 10) score++;
    if (pw.length >= 14) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 5) return { score, label: 'Strong', color: 'bg-emerald-500' };
    return { score, label: 'Very Strong', color: 'bg-emerald-600' };
};

const PasswordInput = ({
    label, value, onChange, placeholder, id, hint
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    id: string;
    hint?: string;
}) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                {label}
            </label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder ?? '••••••••••'}
                    autoComplete="new-password"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-10 py-3 text-slate-900 text-sm outline-none focus:border-[#022C22] focus:ring-2 focus:ring-[#022C22]/10 transition-all pr-12 font-mono"
                />
                <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    tabIndex={-1}
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
        </div>
    );
};

// ── Main Component ─────────────────────────────────────────────────────────
const SecuritySettings = () => {
    const navigate = useNavigate();

    // ── Form state ────────────────────────────────────────────────────────
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // ── Notification ─────────────────────────────────────────────────────
    const [notification, setNotification] = useState<{
        isOpen: boolean;
        type: NotificationType;
        message: string;
        onConfirm?: () => void;
    }>({ isOpen: false, type: 'info', message: '' });

    const showNotification = (type: NotificationType, message: string, onConfirm?: () => void) => {
        setNotification({ isOpen: true, type, message, onConfirm });
    };
    const closeNotification = () => setNotification(prev => ({ ...prev, isOpen: false }));

    // ── Password strength ─────────────────────────────────────────────────
    const strength = getPasswordStrength(newPassword);
    const strengthBars = [1, 2, 3, 4, 5, 6];

    // ── Validation ────────────────────────────────────────────────────────
    const validate = (): string | null => {
        if (!currentPassword.trim()) return 'Please enter your current password.';

        const hasChanges = newEmail.trim() || newName.trim() || newPassword.trim();
        if (!hasChanges) return 'Please enter at least one field to change (email, name, or password).';

        if (newPassword) {
            if (newPassword.length < 10) return 'New password must be at least 10 characters.';
            if (!/[A-Z]/.test(newPassword)) return 'Password must include at least one uppercase letter.';
            if (!/[a-z]/.test(newPassword)) return 'Password must include at least one lowercase letter.';
            if (!/[0-9]/.test(newPassword)) return 'Password must include at least one number.';
            if (!/[^A-Za-z0-9]/.test(newPassword)) return 'Password must include at least one symbol (e.g. @, #, !).';
            if (newPassword !== confirmPassword) return 'New password and confirmation do not match.';
        }

        if (newEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            return 'Please enter a valid email address.';
        }

        return null;
    };

    // ── Submit ────────────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const error = validate();
        if (error) { showNotification('error', error); return; }

        showNotification(
            'confirm',
            '⚠️ You will be logged out after this change. All sessions will be terminated and you must log in again with the new credentials. Continue?',
            () => executeChange()
        );
    };

    const executeChange = async () => {
        setSubmitting(true);
        try {
            const payload: Record<string, string> = {
                current_password: currentPassword,
            };
            if (newEmail.trim()) payload.new_email = newEmail.trim();
            if (newName.trim()) payload.new_name = newName.trim();
            if (newPassword.trim()) {
                payload.new_password = newPassword;
                payload.new_password_confirmation = confirmPassword;
            }

            await api.post('/auth/change-credentials', payload);
            setSuccess(true);

            // Clear token — back-end already revoked all sessions
            localStorage.removeItem('admin_token');

            setTimeout(() => {
                navigate('/admin/login');
            }, 3500);

        } catch (err: any) {
            const msg =
                err.response?.data?.errors
                    ? Object.values(err.response.data.errors).flat().join(' ')
                    : err.response?.data?.message || 'Failed to update credentials.';
            showNotification('error', msg);
        } finally {
            setSubmitting(false);
        }
    };

    // ── Success state ─────────────────────────────────────────────────────
    if (success) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Credentials Updated!</h2>
                <p className="text-slate-500 max-w-sm">
                    Your credentials have been changed successfully.<br /><br />
                    All sessions have been terminated. Redirecting to login…
                </p>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Redirecting in 3 seconds…
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto pb-16 space-y-8">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#022C22] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <ShieldCheck size={24} className="text-[#DFA45B]" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Security Settings</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Change your admin login credentials. All sessions will be revoked after any change.</p>
                </div>
            </div>

            {/* Security Notice Banner */}
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 leading-relaxed">
                    <strong className="font-bold">Before you proceed:</strong> After saving, you will be <strong>automatically logged out</strong> from all devices. Use the new credentials to log back in.
                </div>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden" autoComplete="off">

                {/* ── Section: Verify Identity ── */}
                <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-5">
                        <KeyRound size={18} className="text-[#022C22]" />
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Step 1 — Verify Your Identity</h2>
                    </div>
                    <PasswordInput
                        id="current_password"
                        label="Current Password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        placeholder="Enter your current password"
                        hint="Required to authorize any credential changes."
                    />
                </div>

                {/* ── Section: New Credentials ── */}
                <div className="p-8 border-b border-slate-100 space-y-5">
                    <div className="flex items-center gap-2 mb-1">
                        <User size={18} className="text-[#022C22]" />
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Step 2 — New Credentials (Fill any or all)</h2>
                    </div>

                    {/* New Name */}
                    <div>
                        <label htmlFor="new_name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                            New Username / Display Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                id="new_name"
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="e.g. Arsen Admin"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-10 py-3 text-slate-900 text-sm outline-none focus:border-[#022C22] focus:ring-2 focus:ring-[#022C22]/10 transition-all"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* New Email */}
                    <div>
                        <label htmlFor="new_email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                            New Email Address (Login Email)
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                id="new_email"
                                type="email"
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                                placeholder="e.g. admin@arseninterior.in"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-10 py-3 text-slate-900 text-sm outline-none focus:border-[#022C22] focus:ring-2 focus:ring-[#022C22]/10 transition-all"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <PasswordInput
                        id="new_password"
                        label="New Password"
                        value={newPassword}
                        onChange={setNewPassword}
                        placeholder="Min. 10 chars with mixed case, numbers & symbols"
                    />

                    {/* Password Strength Meter */}
                    {newPassword && (
                        <div className="space-y-1.5">
                            <div className="flex gap-1">
                                {strengthBars.map(n => (
                                    <div
                                        key={n}
                                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${n <= strength.score ? strength.color : 'bg-slate-200'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-slate-400">Password strength</p>
                                <span className={`text-xs font-bold ${strength.label === 'Weak' ? 'text-red-500' :
                                    strength.label === 'Fair' ? 'text-yellow-600' : 'text-emerald-600'
                                    }`}>{strength.label}</span>
                            </div>
                            {/* Requirements checklist */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                {[
                                    { label: 'At least 10 characters', ok: newPassword.length >= 10 },
                                    { label: 'Uppercase letter (A–Z)', ok: /[A-Z]/.test(newPassword) },
                                    { label: 'Lowercase letter (a–z)', ok: /[a-z]/.test(newPassword) },
                                    { label: 'Number (0–9)', ok: /[0-9]/.test(newPassword) },
                                    { label: 'Symbol (!, @, #…)', ok: /[^A-Za-z0-9]/.test(newPassword) },
                                ].map(req => (
                                    <div key={req.label} className="flex items-center gap-1.5">
                                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${req.ok ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                            {req.ok && <CheckCircle2 size={10} className="text-white" />}
                                        </div>
                                        <span className={`text-[11px] ${req.ok ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>{req.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Confirm Password */}
                    {newPassword && (
                        <PasswordInput
                            id="confirm_password"
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            placeholder="Re-enter the new password"
                        />
                    )}

                    {/* Match status */}
                    {newPassword && confirmPassword && (
                        <div className={`flex items-center gap-2 text-xs font-semibold ${newPassword === confirmPassword ? 'text-emerald-600' : 'text-red-500'}`}>
                            {newPassword === confirmPassword
                                ? <><CheckCircle2 size={14} /> Passwords match</>
                                : <><AlertTriangle size={14} /> Passwords do not match</>
                            }
                        </div>
                    )}
                </div>

                {/* ── Info row ── */}
                <div className="px-8 py-4 bg-slate-50 flex items-start gap-2 border-b border-slate-100">
                    <Info size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                     
                        All active admin sessions will be forcefully terminated upon saving.
                    </p>
                </div>

                {/* ── Submit ── */}
                <div className="p-8 flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2.5 px-8 py-3 bg-[#022C22] hover:bg-[#033a2d] text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#022C22]/20 disabled:opacity-60 active:scale-95"
                    >
                        {submitting ? (
                            <><Loader2 size={16} className="animate-spin" /> Saving…</>
                        ) : (
                            <><ShieldCheck size={16} /> Save & Log Out</>
                        )}
                    </button>
                </div>
            </form>

            <Notification
                type={notification.type}
                message={notification.message}
                isOpen={notification.isOpen}
                onClose={closeNotification}
                onConfirm={notification.onConfirm}
                confirmLabel="Yes, Change Credentials"
            />
        </div>
    );
};

export default SecuritySettings;
