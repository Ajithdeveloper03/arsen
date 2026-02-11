import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Briefcase,
    Layers,
    PhoneCall,
    LogOut,
    Home
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Banners', icon: ImageIcon, path: '/admin/banners' },
        { name: 'Projects', icon: Layers, path: '/admin/projects' },
        { name: 'Careers', icon: Briefcase, path: '/admin/careers' },
        { name: 'Contact Details', icon: PhoneCall, path: '/admin/contact-details' },
    ];

    return (
        <div className="w-64 bg-[#0F1F2A] text-white min-h-screen flex flex-col border-r border-white/5">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#DFA45B] rounded-lg flex items-center justify-center font-bold text-black">
                    A
                </div>
                <span className="text-xl font-black italic tracking-tighter">ARSEN ADMIN</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-[#DFA45B] text-black font-bold'
                                : 'hover:bg-white/5 text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 space-y-2">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                >
                    <Home size={20} />
                    <span>View Website</span>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
