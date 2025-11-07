// src/page/BoardDetailPage.tsx
import  { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import type { Board } from '@/entities/board/model/types';
// (Bạn sẽ cần tạo một API 'getBoardByIdApi' tương tự như các API khác)
// import { getBoardByIdApi } from '@/entities/board/api/boardApi';

// Giả sử đây là kiểu dữ liệu Header mà chúng ta sẽ tạo ở Bước 4
type HeaderContextType = (title: string) => void;

const BoardDetailPage = () => {
  // 1. Lấy boardId từ URL (ví dụ: /boards/abc-123)
  const { boardId } = useParams();
  
  const setHeaderTitle = useOutletContext<HeaderContextType>();

  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      if (boardId) {
        setIsLoading(true);
        try {
          // const boardData = await getBoardByIdApi(boardId);
          
          const boardData = { name: `Board ${boardId}`, id: boardId } as Board;
          setBoard(boardData);
          
          setHeaderTitle(boardData.name); // <-- Gửi tên board lên Header
          
        } catch (error) {
          console.error("Failed to fetch board", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBoard();
  }, [boardId, setHeaderTitle]);

  if (isLoading) {
    return <div>Loading board...</div>;
  }

  if (!board) {
    return <div>Board not found.</div>;
  }

  return (
    <div style={{ padding: '24px 48px' }}>
      <h1>{board.name}</h1>
      <p>Nội dung chi tiết của board (các cột "Personal Tasks", "Add a list"...)</p>
    </div>
  );
};

export default BoardDetailPage;