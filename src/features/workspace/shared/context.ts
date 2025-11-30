import { createContext, type Dispatch } from "react";
import type { SortOption, ViewMode } from "./types";
import type { Board } from "@/shared/lib/types";

export type WorkspaceContextType = {
    searchQuery: string;
    sortBy: SortOption;
    viewMode: ViewMode;
    boards: Board[];
};

export type WorkspaceAction =
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_SORT_BY'; payload: SortOption }
    | { type: 'SET_VIEW_MODE'; payload: ViewMode }
    | { type: 'SET_BOARDS'; payload: Board[] };

export type WorkspaceDispatchContextType = Dispatch<WorkspaceAction>;

export const WorkspaceContext = createContext<WorkspaceContextType>({
    searchQuery: '',
    sortBy: 'az',
    viewMode: 'grid',
    boards: [],
});

export const WorkspaceDispatchContext = createContext<WorkspaceDispatchContextType>(() => {});