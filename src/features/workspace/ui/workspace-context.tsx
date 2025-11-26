import { WorkspaceDisplayContext, WorkspaceContext } from '../shared/context';
import type { SortOption, ViewMode } from '../shared/types';
import { useState, useMemo, ReactNode } from "react";
import { useParams } from "react-router"; 
import { useBoardStore } from "../../../shared/stores/useBoardStore";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
    
    console.log("%cFilterSearchInput rendered", "color: green");
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { boards } = useBoardStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("recent");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const filteredAndSortedBoards = useMemo(() => {
        // 1. Lọc board theo workspace
        const workspaceBoards = boards.filter(
            (board) => board.workspaceId === workspaceId
        );

        // 2. Lọc theo search query
        const filtered = workspaceBoards.filter(
            (board) =>
                board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                board.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // 3. Sắp xếp
        switch (sortBy) {
            case "az":
                return filtered.sort((a, b) => a.title.localeCompare(b.title));
            case "za":
                return filtered.sort((a, b) => b.title.localeCompare(a.title));
            case 'recent':
                return filtered.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            default:
                return filtered;
        }
    }, [boards, workspaceId, searchQuery, sortBy]); 

    const state = useMemo(() => ({
        searchQuery,
        sortBy,
        viewMode,
        boards: filteredAndSortedBoards,
    }), [searchQuery, sortBy, viewMode, filteredAndSortedBoards]);

    const dispatch = useMemo(() => ({
        setSearchQuery, 
        setSortBy,      
        setViewMode     
    }), []);

    return (
        <WorkspaceContext value={state}>
            <WorkspaceDisplayContext value={dispatch}>
                {children}
            </WorkspaceDisplayContext>
        </WorkspaceContext>
    );
}