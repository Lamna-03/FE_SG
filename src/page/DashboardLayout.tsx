import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/widgets/Sidebar/ui/Sidebar";
import AppHeader from "@/widgets/AppHeader/ui/AppHeader";
const DashboardLayout = () => {

    const [headerTitle, setHeaderTitle] = React.useState("Dashboard");

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AppHeader title={headerTitle} />

                <main style={{ flex: 1, overflowY: 'auto' }}>
                    <Outlet context={setHeaderTitle} />
                </main>
            </div>
        </div>
    );
}
export default DashboardLayout;