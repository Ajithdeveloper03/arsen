import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./AdminLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectsManager from "./pages/ProjectsManager";
import BannersManager from "./pages/BannersManager";
import CareersManager from "./pages/CareersManager";
import ContactDetailsManager from "./pages/ContactDetailsManager";
import './admin.css';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="banners" element={<BannersManager />} />
                <Route path="careers" element={<CareersManager />} />
                <Route path="contact-details" element={<ContactDetailsManager />} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;
