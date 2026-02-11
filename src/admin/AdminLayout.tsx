import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    return (
        <div className="flex bg-[#F5F5F2] min-h-screen text-[#0F1F2A]">
            <Sidebar />
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto max-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
