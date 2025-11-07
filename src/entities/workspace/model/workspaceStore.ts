import {create} from "zustand";
import type {Workspace} from "./types";
import {getAllWorkspacesApi} from "@/entities/workspace/api/workspaceApi";
import type { Board } from "@/entities/board/model/types";
import { getBoardsByWorkspaceIdApi } from "@/entities/board/api/boardApi";
interface WorkspaceState {
    workspaces: Workspace[];
    currentBoards: Board[];
    isLoadingWorkspaces: boolean;
    isLoadingBoards: boolean;
    error: string | null;
    fetchDataForSidebar: () => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    workspaces: [],
    currentBoards: [],
    isLoadingWorkspaces: false,
    isLoadingBoards: false,
    error: null,

    fetchDataForSidebar: async () => {
        set({ isLoadingWorkspaces: true, isLoadingBoards: true, error: null });
        try {
            const workspaceData = await getAllWorkspacesApi();
            set({ workspaces: workspaceData, isLoadingWorkspaces: false });

            if (workspaceData.length > 0) {
        const firstWorkspaceId = workspaceData[0].id;
        
        // 3. Lấy boards cho CHỈ workspace đó
        set({ isLoadingBoards: true });
        const boardData = await getBoardsByWorkspaceIdApi(firstWorkspaceId);
        set({ currentBoards: boardData, isLoadingBoards: false });
      }
        } catch (err) {
            console.error(err);
            set({ error: "Lỗi khi tải workspaces.", isLoadingWorkspaces: false, isLoadingBoards: false });
        } 
    }
}));