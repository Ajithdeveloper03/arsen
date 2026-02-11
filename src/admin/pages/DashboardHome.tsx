import React, { useState, useEffect } from 'react';
import {
    Users,
    Layers,
    Image as ImageIcon,
    Briefcase,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import api from '../../services/api';

const DashboardHome = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/dashboard/stats');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        { name: 'Total Banners', value: stats?.banners_count || 0, icon: ImageIcon, color: 'text-blue-500' },
        { name: 'Total Projects', value: stats?.projects_count || 0, icon: Layers, color: 'text-purple-500' },
        { name: 'Active Jobs', value: stats?.active_jobs_count || 0, icon: Briefcase, color: 'text-green-500' },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Dashboard</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's an overview of your website content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-xl transition-all cursor-default">
                        <div className="space-y-2">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">{card.name}</p>
                            <p className="text-4xl font-black">{card.value}</p>
                        </div>
                        <div className={`p-4 rounded-2xl bg-gray-50 group-hover:bg-[#0F1F2A] group-hover:text-white transition-all`}>
                            <card.icon size={28} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Recent Projects</h3>
                        <button className="text-[#DFA45B] text-xs font-bold uppercase tracking-widest flex items-center gap-1">View All <ArrowUpRight size={14} /></button>
                    </div>
                    <div className="space-y-4">
                        {stats?.recent_projects?.map((project: any) => (
                            <div key={project.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 italic">
                                    <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-lg">{project.title}</p>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">{project.type} • {project.status}</p>
                                </div>
                                <div className="text-gray-300">
                                    <Clock size={18} />
                                </div>
                            </div>
                        ))}
                        {(!stats?.recent_projects || stats.recent_projects.length === 0) && (
                            <p className="text-gray-400 text-center py-10">No projects added yet.</p>
                        )}
                    </div>
                </div>

                <div className="bg-[#0F1F2A] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black italic uppercase leading-tight mb-6">Need help <br /><span className="text-[#DFA45B]">managing content?</span></h2>
                        <p className="text-gray-400 mb-8 max-w-sm">Use the sidebar to navigate between different sections of your website. You can add, edit, or delete items instantly.</p>
                        <button className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#DFA45B] transition-all">Documentation</button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFA45B]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
