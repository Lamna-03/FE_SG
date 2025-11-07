// src/page/Dashboard.tsx
import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button/button";
import WorkspaceSection from "@/widgets/WorkspaceSection/ui/WorkspaceSection";
import { useOutletContext } from "react-router-dom";

type HeaderContextType = (title: string) => void;

import { useWorkspaceStore } from "@/entities/workspace/model/workspaceStore";
const DashboardPage = () => {
  const setHeaderTitle = useOutletContext<HeaderContextType>();
  useEffect(() => {
    setHeaderTitle("Dashboard");
  }, [setHeaderTitle]);
  const { workspaces, isLoadingWorkspaces, error } = useWorkspaceStore();

  const renderContent = () => {
    if (isLoadingWorkspaces) return <div>Loading Workspaces...</div>;
    if (error) return <div style={{ color: 'red' }}>Lỗi: {error}</div>;

    return workspaces.map((ws) => (
      <WorkspaceSection key={ws.id} workspace={ws} />
    ));
  };

  return (
    <div style={styles.layout}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.pageTitle}>Dashboard</h1>
          <Button>+ New Workspace</Button>
        </header>

        
        {renderContent()}
      </main>
    </div>
  );
};

// CSS (giống Trello)
const styles = {
  layout: { display: 'flex', minHeight: '100vh' },
  mainContent: {
    flex: 1,
    padding: '24px 48px',
    backgroundColor: '#FFFFFF',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  pageTitle: { margin: 0, fontSize: '28px', fontWeight: 700 }
};

export default DashboardPage;