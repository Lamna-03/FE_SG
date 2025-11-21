import { createContext, type Dispatch } from "react";
import type { SortOption, ViewMode } from "./types";
import type { Board } from "@/shared/lib/types";

export type WorkspaceContextType = {
    searchQuery: string;
    sortBy: SortOption;
    viewMode: ViewMode;
    boards: Board[]
};

export type WorkspaceDispatchContextType = Dispatch<{
    type: 'SET_SEARCH_QUERY' | 'SET_SORT_BY' | 'SET_VIEW_MODE';
    payload: string;
}>;

export const WorkspaceContext = createContext<WorkspaceContextType>({
    searchQuery: '',
    sortBy: 'az',
    viewMode: 'grid',
    boards: [],
})

export const WorkspaceDispatchContext = createContext<WorkspaceDispatchContextType>(() => {});