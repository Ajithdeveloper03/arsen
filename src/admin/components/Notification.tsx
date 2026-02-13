import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, AlertCircle, X, HelpCircle, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type NotificationType = 'success' | 'error' | 'info' | 'confirm';

interface NotificationProps {
    type: NotificationType;
    message: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void; // For confirmation dialogs
    confirmLabel?: string;
}

const Notification = ({ type, message, isOpen, onClose, onConfirm, confirmLabel = "Yes, I'm sure" }: NotificationProps) => {
    useEffect(() => {
        if (isOpen && type !== 'confirm') {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, type]);

    const getStyles = () => {
        switch (type) {
            case 'success': return { bg: 'bg-[#022C22]', icon: <CheckCircle size={24} className="text-emerald-400" /> };
            case 'error': return { bg: 'bg-red-900', icon: <XCircle size={24} className="text-red-400" /> };
            case 'confirm': return { bg: 'bg-slate-900', icon: <HelpCircle size={24} className="text-sky-400" /> };
            default: return { bg: 'bg-blue-900', icon: <AlertCircle size={24} className="text-blue-400" /> };
        }
    };

    const { bg, icon } = getStyles();

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for confirm dialogs to prevent interaction with underlying modal */}
                    {type === 'confirm' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[899] bg-black/40 backdrop-blur-[2px]"
                            onClick={onClose}
                        />
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className={`fixed bottom-1/2 translate-y-1/2 left-1/2 z-[900] flex flex-col gap-4 px-6 py-5 rounded-2xl shadow-2xl text-white ${bg} border border-white/10 min-w-[320px] max-w-md backdrop-blur-md`}
                        style={{ bottom: type === 'confirm' ? '50%' : '2rem', transform: type === 'confirm' ? 'translate(-50%, 50%)' : 'translateX(-50%)' }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 mt-1">{icon}</div>
                            <div className="flex-1">
                                {type === 'confirm' && <h4 className="font-bold text-lg mb-1">Confirmation Required</h4>}
                                <p className="font-medium text-sm leading-relaxed text-white/90">{message}</p>
                            </div>
                            {type !== 'confirm' && (
                                <button onClick={onClose} className="shrink-0 hover:bg-white/10 p-1.5 rounded-full transition-colors -mr-2 -mt-2">
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {type === 'confirm' && (
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { onConfirm && onConfirm(); onClose(); }}
                                    className="px-5 py-2 text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 rounded-lg shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                                >
                                    <Check size={16} /> {confirmLabel}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Notification;
