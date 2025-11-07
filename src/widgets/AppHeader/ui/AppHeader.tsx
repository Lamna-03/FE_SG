import React from "react";

interface AppHeaderProps {
    title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>{title}</h1>
        </header>
    );
};
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    padding: '16px 48px', // Giảm padding một chút
    borderBottom: '1px solid #E5E5E5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '65px', // Cố định chiều cao
    flexShrink: 0, // Ngăn header co lại
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: { // Style placeholder cho Avatar
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#0052CC',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
  }
};

export default AppHeader;