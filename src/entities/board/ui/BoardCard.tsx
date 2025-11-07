import React from "react";
import type {Board} from "@/entities/board/model/types";
import { Link } from "react-router-dom";


interface BoardCardProps {
    board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
    return (
        <Link to={`/boards/${board.id}`} style={style.card}>
            <h4 style={style.cardTitle}>{board.name}</h4>
            <p style={style.cardDescription}>{board.description}</p>
            <div>
                
            </div>
        </Link>

    )
}
const style = {
    card:{
        padding: '16px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    minHeight: '100px'
    },
    cardTitle: { margin: 0, fontSize: '16px', fontWeight: 600 },
  cardDescription: { margin: '4px 0 0', fontSize: '14px', color: '#555' }
}

export default BoardCard;