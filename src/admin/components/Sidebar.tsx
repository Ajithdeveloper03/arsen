import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Briefcase,
    Layers,
    PhoneCall,
    LogOut,
    Home,
    ChevronRight,
    Search
} from 'lucide-react';
import logo from '../../assets/arsen-logo.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
    ];

    return (
        <div className="w-64 bg-[#022C22] text-white min-h-screen flex flex-col border-r border-[#1a4a40] font-sans">
            {/* Logo Section */}
            <div className="p-6 pt-8 flex flex-col items-center gap-4">
                <div className="w-32 h-auto">
                    <img src={logo} alt="Arsen Interior" className="w-full h-full object-contain filter drop-shadow-sm" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${isActive
                                    ? 'bg-[#DFA45B] text-[#022C22] shadow-sm'
                                    : 'text-slate-300 hover:bg-[#0F172A] hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={18} />
                            <span className="font-semibold">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 bg-[#012019] space-y-2">
                <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-[#0F172A] transition-all text-sm font-medium"
                >
                    <Home size={18} />
                    <span>View Site</span>
                </a>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all text-sm font-medium"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
