import React, { useState, useEffect } from 'react';
import { Layers, Image as ImageIcon, Briefcase, Plus, ArrowRight, Activity, Database, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    const [stats, setStats] = useState<any>(null);
    const [recentProjects, setRecentProjects] = useState<any[]>([]);

    useEffect(() => {
        fetchStats();
        fetchRecentProjects();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/dashboard/stats');
            setStats(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchRecentProjects = async () => {
        try {
            const res = await api.get('/projects');
            setRecentProjects(res.data.slice(0, 5));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm">Welcome back, Admin.</p>
                </div>
                <Link to="/admin/projects" className="bg-[#022C22] hover:bg-[#033a2d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">
                    <Plus size={18} /> Add Project
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SimpleStat
                    title="Total Projects"
                    value={stats?.projects_count || 0}
                    icon={Layers}
                    bg="bg-emerald-50"
                    color="text-emerald-600"
                    link="/admin/projects"
                />
                <SimpleStat
                    title="Active Banners"
                    value={stats?.banners_count || 0}
                    icon={ImageIcon}
                    bg="bg-blue-50"
                    color="text-blue-600"
                    link="/admin/banners"
                />
                <SimpleStat
                    title="Open Jobs"
                    value={stats?.active_jobs_count || 0}
                    icon={Briefcase}
                    bg="bg-orange-50"
                    color="text-orange-600"
                    link="/admin/careers"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects Table */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-slate-900 text-lg">Recent Projects</h2>
                        <Link to="/admin/projects" className="text-slate-500 hover:text-[#022C22] text-sm font-medium flex items-center gap-1 transition-colors">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentProjects.map((project: any) => (
                                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                                    <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm line-clamp-1">{project.title}</p>
                                                    <p className="text-slate-500 text-xs">{project.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 text-sm font-medium">{project.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${project.status === 'ongoing'
                                                    ? 'bg-orange-50 text-orange-600 border-orange-200'
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentProjects.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-slate-500">No recent activity.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
                        <Activity size={20} className="text-[#022C22]" /> System Status
                    </h3>
                    <div className="space-y-4">
                        <StatusItem label="API Connection" status="Operational" icon={CheckCircle2} color="text-green-600" bg="bg-green-50" />
                        <StatusItem label="Database Seed" status="Synced" icon={Database} color="text-green-600" bg="bg-green-50" />
                        <StatusItem label="Frontend Banners" status="Live (9)" icon={ImageIcon} color="text-blue-600" bg="bg-blue-50" />
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <p className="text-slate-500 text-sm mb-4">Need help? Contact developer support.</p>
                        <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-bold transition-colors border border-slate-200">
                            Documentation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SimpleStat = ({ title, value, icon: Icon, bg, color, link }: any) => (
    <Link to={link} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#022C22]/30 transition-all group flex items-center justify-between">
        <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
            <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
        </div>
    </Link>
);

const StatusItem = ({ label, status, icon: Icon, color, bg }: any) => (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-2 rounded-lg transition-colors -mx-2">
        <span className="text-slate-600 text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${bg} ${color}`}>{status}</span>
        </div>
    </div>
);

export default DashboardHome;
