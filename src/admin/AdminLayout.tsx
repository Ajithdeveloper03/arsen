import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#F1F5F9] font-sans selection:bg-[#DFA45B] selection:text-[#022C22]">
            <Sidebar />
            <div className="flex-1 max-h-screen overflow-y-auto relative scroll-smooth bg-slate-50">
                <main className="relative z-10 p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen">
                    {/* Use Outlet to render child routes */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 min-h-[calc(100vh-4rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
