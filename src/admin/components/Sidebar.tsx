import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Briefcase,
    Layers,
    PhoneCall,
    LogOut,
    Home,
    Settings,
    X
} from 'lucide-react';
import logo from '../../assets/arsen-logo.png';
import Notification, { NotificationType } from './Notification';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

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

    const confirmLogout = () => {
        showNotification(
            'confirm',
            'Are you sure you want to sign out?',
            () => handleLogout()
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Projects', icon: Layers, path: '/admin/projects' },
        { name: 'Banners', icon: ImageIcon, path: '/admin/banners' },
        { name: 'Careers', icon: Briefcase, path: '/admin/careers' },
        { name: 'Contacts', icon: PhoneCall, path: '/admin/contact-details' },
        { name: 'Security', icon: Settings, path: '/admin/security' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <div className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#022C22] text-white flex flex-col border-r border-[#1a4a40] font-sans z-50 transition-transform duration-300 shadow-2xl md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                {/* Close Button Mobile */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white md:hidden">
                    <X size={24} />
                </button>

                {/* Logo Section */}
                <div className="p-8 pb-6 flex flex-col items-center gap-4">
                    <div className="w-40 h-auto">
                        <img src={logo} alt="Arsen Interior" className="w-full h-full object-contain filter drop-shadow-sm" />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => onClose()} // Close sidebar on mobile nav
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm group ${isActive
                                        ? 'bg-[#DFA45B] text-[#022C22] shadow-lg shadow-[#DFA45B]/20 translate-x-1'
                                        : 'text-slate-300 hover:bg-[#0F172A] hover:text-white hover:translate-x-1'
                                    }`
                                }
                            >
                                <item.icon size={20} className={isActive ? 'text-[#022C22]' : 'text-slate-400 group-hover:text-white'} />
                                <span className="font-semibold">{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-6 bg-[#012019] space-y-3 mt-auto border-t border-[#1a4a40]">
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-[#0F172A] transition-all text-sm font-medium border border-transparent hover:border-slate-700"
                    >
                        <Home size={18} />
                        <span>View Site</span>
                    </a>
                    <button
                        onClick={confirmLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-all text-sm font-medium border border-transparent hover:border-red-900/30"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>

                <Notification
                    type={notification.type}
                    message={notification.message}
                    isOpen={notification.isOpen}
                    onClose={closeNotification}
                    onConfirm={notification.onConfirm}
                    confirmLabel="Sign Out"
                />
            </div>
        </>
    );
};

export default Sidebar;
