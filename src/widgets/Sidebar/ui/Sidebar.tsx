import React, { useEffect } from "react";
import { useWorkspaceStore } from "@/entities/workspace/model/workspaceStore";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const { workspaces, isLoadingWorkspaces, fetchDataForSidebar, currentBoards, isLoadingBoards } = useWorkspaceStore();
    useEffect(() => {
        fetchDataForSidebar();
    }, [fetchDataForSidebar]);

    const getStyle = ({ isActive }: { isActive: boolean }) =>
        isActive ? styles.navLinkActive : styles.navLink;

    return (
        <aside style={styles.sidebar}>
            <div style={styles.wsHeader}>
                {/* Hiển thị tên workspace đầu tiên (nếu có) */}
                <strong>{workspaces[0]?.name || (isLoadingWorkspaces ? 'Loading...' : 'My Workspace')}</strong>
            </div>

            <div style={styles.boardsSection}>


                <nav style={styles.nav}>
                    <span style={styles.boardsTitle}>Navigation</span>

                    <NavLink to="/dashboard" style={getStyle}>
                        Dashboard
                    </NavLink>
                </nav>
            </div>



            <div style={styles.boardsSection}>
                <span style={styles.boardsTitle}>Boards</span>
                {isLoadingBoards && <p>Loading...</p>}
                {/* Tạm thời: Lấy boards từ workspace đầu tiên */}
                {/* (Bạn sẽ cần logic phức tạp hơn để render 
           đúng các board thuộc workspace đang chọn) */}
                {currentBoards.map((board) => (
                    <NavLink
                        key={board.id}
                        to={`/boards/${board.id}`}
                        style={getStyle}
                    >
                        {board.name}
                    </NavLink>
                ))}
            </div>

            <footer style={styles.footer}>
                John Doe {/* (Tạm thời) */}
            </footer>



        </aside>
    )
}
// CSS
const styles: { [key: string]: React.CSSProperties } = {
    sidebar: {
        width: '260px',
        backgroundColor: '#F9FAFB',
        borderRight: '1px solid #E5E5E5',
        padding: '20px',
        height: '100vh',
    },
    wsItem: { padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
    nav: { display: 'flex', flexDirection: 'column' },
    navLink: {
        padding: '8px 12px',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '4px',
    },
    navLinkActive: {
        padding: '8px 12px',
        textDecoration: 'none',
        borderRadius: '4px',
        backgroundColor: '#F5F5F5', // <-- Màu highlight
        
        fontWeight: 600
    },
    wsHeader: { marginBottom: '8px' },
    boardsSection: { marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' },
    boardsTitle: { fontWeight: 600, marginBottom: '8px', color: '#666', fontSize: '14px' },
    footer: { position: 'absolute', bottom: '20px', left: '20px', fontWeight: 500 }


};

export default Sidebar;