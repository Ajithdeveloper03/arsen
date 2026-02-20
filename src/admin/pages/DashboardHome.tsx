import { useState, useEffect } from 'react';
import { Layers, Image as ImageIcon, Briefcase, Plus, Activity, Database } from 'lucide-react';
import api, { BASE_URL } from '../../services/api';
import { Link } from 'react-router-dom';
// Data & Utils for accurate count
import { FEATURED_PROJECTS, RAW_COMPLETED_PROJECTS_LIST } from '../../data/completedProjects';
import { HARDCODED_ONGOING_PROJECTS } from '../../data/ongoingProjects';
import { mergeProjectsWithApi } from '../../utils/projectMerge';

const DashboardHome = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState<any[]>([]);
    const [totalProjectCount, setTotalProjectCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Stats & Projects
            const [statsRes, projectsRes] = await Promise.all([
                api.get('/dashboard/stats'),
                api.get('/projects')
            ]);

            setStats(statsRes.data);
            setActivities(statsRes.data.activities || []);

            // Calculate "Real" Count using Merge Logic (same as ProjectsManager)
            const LOCAL_MASTER_LIST = [
                ...HARDCODED_ONGOING_PROJECTS,
                ...FEATURED_PROJECTS.map((p) => ({ title: p.title })),
                ...RAW_COMPLETED_PROJECTS_LIST.map((t) => ({ title: t.replace(/^\d+\s+/, "").trim() }))
            ];

            // Merge checks for duplicates by title
            const merged = mergeProjectsWithApi(LOCAL_MASTER_LIST.map(p => ({ ...p, id: 'temp' })), projectsRes.data);
            setTotalProjectCount(merged.length);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#022C22]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage your portfolio and banners effortlessly.</p>
                </div>
                <div className="flex gap-3 relative z-10">
                    <Link to="/admin/projects" className="bg-[#022C22] hover:bg-[#033a2d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95">
                        <Plus size={18} /> Add Project
                    </Link>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-slate-50 rounded-full" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SimpleStat
                    title="Total Projects"
                    value={totalProjectCount || stats?.projects_count || 0}
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

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                {/* Activity Feed Section */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                            <h2 className="font-black text-slate-900 text-xl uppercase tracking-tight flex items-center gap-2">
                                <Activity size={24} className="text-[#022C22]" /> Recent Activities
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Real-time updates across your entire portfolio.</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {activities.length > 0 ? (
                            <div className="space-y-4">
                                {activities.map((activity, idx) => (
                                    <div key={activity.id} className="relative flex gap-6 group">
                                        {/* Timeline line */}
                                        {idx !== activities.length - 1 && (
                                            <div className="absolute left-6 top-10 bottom-0 w-[2px] bg-slate-100 group-hover:bg-emerald-100 transition-colors" />
                                        )}

                                        {/* Activity Icon/Image */}
                                        <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 shadow-sm group-hover:border-emerald-200 transition-all group-hover:scale-105">
                                            {activity.image_url ? (
                                                <img
                                                    src={activity.image_url.startsWith('http') ? activity.image_url : `${BASE_URL}${activity.image_url}`}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400">
                                                    {activity.type === 'Project' && <Layers size={20} />}
                                                    {activity.type === 'Banner' && <ImageIcon size={20} />}
                                                    {activity.type === 'Career' && <Briefcase size={20} />}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${activity.type === 'Project' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                            activity.type === 'Banner' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                'bg-orange-50 text-orange-700 border-orange-100'
                                                            }`}>
                                                            {activity.type}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                            {new Date(activity.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-slate-900 font-bold group-hover:text-[#022C22] transition-colors">{activity.title}</h3>
                                                    <p className="text-slate-500 text-sm mt-1">{activity.description}</p>
                                                </div>

                                                <Link
                                                    to={`/admin/${activity.type.toLowerCase()}s`}
                                                    className="mt-2 md:mt-0 px-4 py-1.5 bg-slate-50 hover:bg-[#022C22] hover:text-white text-slate-600 rounded-lg text-xs font-bold transition-all border border-slate-200"
                                                >
                                                    Edit {activity.type}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <Database size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-500 font-bold">No activity history recorded yet.</p>
                                <p className="text-slate-400 text-sm mt-1">Start by adding projects or banners to see them here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SimpleStat = ({ title, value, icon: Icon, bg, color, link }: any) => (
    <Link to={link} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#022C22]/30 transition-all group flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{title}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform relative z-10 shadow-sm`}>
            <Icon size={24} />
        </div>
        {/* Subtle hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
);

export default DashboardHome;

