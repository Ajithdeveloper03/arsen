import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Menu } from 'lucide-react';
import api from '../services/api';

const AdminLayout = () => {
    const token = localStorage.getItem('admin_token');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(true);

    // Idle Timeout Logic (15 minutes)
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes

        const handleLogout = async () => {
            try {
                await api.post('/auth/logout');
            } catch (err) {
                console.error('Logout failed', err);
            } finally {
                localStorage.removeItem('admin_token');
                window.location.href = '/admin/login?reason=timeout';
            }
        };

        const resetTimer = () => {
            if (timeout) clearTimeout(timeout);
            if (token) {
                timeout = setTimeout(handleLogout, IDLE_LIMIT);
            }
        };

        // Events to track activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        const handleActivity = () => {
            resetTimer();
        };

        if (token) {
            events.forEach(event => document.addEventListener(event, handleActivity));
            resetTimer(); // Start timer initially
        }

        return () => {
            if (timeout) clearTimeout(timeout);
            events.forEach(event => document.removeEventListener(event, handleActivity));
        };
    }, [token]);

    useEffect(() => {
        const validateSession = async () => {
            if (!token) {
                setIsValidating(false);
                return;
            }

            try {
                // Verify token with backend
                await api.get('/auth/me');
                setIsValidating(false);
            } catch (error) {
                // If token is invalid, clear it and redirect
                console.error('Session validation failed:', error);
                localStorage.removeItem('admin_token');
                // The api interceptor might have already redirected, but we ensure state update
                setIsValidating(false);
            }
        };

        validateSession();
    }, [token]);

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    if (isValidating) {
        return (
            <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center text-[#022C22] font-medium">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-[#DFA45B] border-t-transparent rounded-full animate-spin"></div>
                    <p>Verifying secure session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F1F5F9] font-sans selection:bg-[#DFA45B] selection:text-[#022C22]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 max-h-screen overflow-y-auto relative scroll-smooth bg-slate-50 flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden sticky top-0 z-30 px-6 py-4 bg-[#F1F5F9]/90 backdrop-blur-md flex items-center justify-between border-b border-slate-200">
                    <span className="font-black text-[#022C22] text-lg tracking-tight">ADMIN PANEL</span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-white rounded-lg shadow-sm text-[#022C22] border border-slate-200 active:scale-95 transition-transform"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <main className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen w-full">
                    {/* Use Outlet to render child routes */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm border border-slate-200 min-h-[calc(100vh-6rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
