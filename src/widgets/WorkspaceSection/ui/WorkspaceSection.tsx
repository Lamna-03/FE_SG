// src/widgets/WorkspaceSection/ui/WorkspaceSection.tsx
import React, {useState , useEffect} from 'react';
import  type {Workspace} from "@/entities/workspace/model/types";
import type { Board } from '@/entities/board/model/types';
import { getBoardsByWorkspaceIdApi } from '@/entities/board/api/boardApi';
import BoardCard from '@/entities/board/ui/BoardCard';
import { Button } from '@/shared/ui/button/button';

interface WorkspaceSectionProps {
    workspace: Workspace;
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({ workspace }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchBoards = async () => {
            setIsLoading(true);
            try {
                const boardData = await getBoardsByWorkspaceIdApi(workspace.id);
                setBoards(boardData);
            }
            catch (error) {
                console.error("Lỗi khi tải boards:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBoards();
    }, [workspace.id])
    return (
        <section style={styles.section}>
            <div style={styles.header}>
                <h2 style={styles.title}>{workspace.name}</h2>
                <Button variant="outline">+ Add Board</Button>
            </div>
            <p style={styles.description}>{workspace.description}</p>
            {/* Lấy số boards trong workspace */}
            <p style={styles.numberBoards}>{boards.length} board{boards.length !== 1 ? 's' : ''}</p>
            
            {isLoading && <p>Loading boards...</p>}
            <div style={styles.boardGrid}>
                {boards.map((board) => (
                    <BoardCard key={board.id} board={board} />
                ))}
            </div>
        </section>
    )
}
const styles = {
  section: { marginBottom: '32px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { margin: 0, fontSize: '20px', fontWeight: 700 },
  description: { margin: '4px 0 4px', color: '#666' },
numberBoards: { margin: '4px 0 16px', color: '#666',fontSize: '12px' },

  boardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px'
  }
};

export default WorkspaceSection;