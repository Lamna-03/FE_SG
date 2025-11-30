import { useReducer, useMemo, useEffect } from "react";
import type { SortOption, ViewMode } from "@/features/workspace/shared/types";
import { WorkspaceContext, WorkspaceDispatchContext, type WorkspaceAction } from "@/features/workspace/shared/context";
import type { Board } from "@/shared/lib/types";

const boards = [
    {
        id: 'board-1',
        title: 'Project Alpha',
        description: 'Main project board',
        workspaceId: 'workspace-1',
        createdAt: new Date(),
        members: ['user-1', 'user-2'],
        listIds: ['list-1', 'list-2', 'list-3']
    },
    {
        id: 'board-2',
        title: 'Marketing Campaign',
        description: 'Q4 Marketing initiatives',
        workspaceId: 'workspace-1',
        createdAt: new Date(),
        members: ['user-2', 'user-3'],
        listIds: ['list-4']
    },
    {
        id: 'board-3',
        title: 'Personal Todo',
        description: 'Personal tasks and goals',
        workspaceId: 'workspace-2',
        createdAt: new Date(),
        members: ['user-1'],
        listIds: ['list-5']
    }
];

type State = {
    searchQuery: string;
    sortBy: SortOption;
    viewMode: ViewMode;
    boards: Board[];
};

function reducer(state: State, action: WorkspaceAction): State {
    switch (action.type) {
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
        case "SET_SORT_BY":
            return { ...state, sortBy: action.payload };
        case "SET_VIEW_MODE":
            return { ...state, viewMode: action.payload };
        case "SET_BOARDS":
            return { ...state, boards: action.payload };
        default:
            return state;
    }
}

/*
    Explanation:
    - We keep raw 'boards' in the reducer state and derive 'filtered + sorted' boards
        with useMemo, which depends on the current `searchQuery` and `sortBy`.
    - Components consume the derived `boards` from the WorkspaceContext. This keeps
        the logic centralized and makes components simpler (they just display `boards`).
    - We keep `WorkspaceDispatchContext` as a bare `dispatch` function. Components
        dispatch actions like `SET_SEARCH_QUERY` or `SET_SORT_BY` which the reducer handles.
    - The `SET_BOARDS` action is optional but useful when updating the boards list
        from the outside (e.g., when the parent passes new `initialBoards`).
*/

export function WorkspaceProvider({ children, initialBoards }: { children: React.ReactNode; initialBoards?: Board[] }) {
    const [state, dispatch] = useReducer(
        reducer,
        {
            searchQuery: "",
            sortBy: "recent",
            viewMode: "grid",
            boards: initialBoards ?? boards,
        }
    );

    // Derived state: filtered + sorted boards
    const computedBoards = useMemo(() => {
        const query = state.searchQuery.trim().toLowerCase();

        let filtered = state.boards;
        if (query.length > 0) {
            filtered = filtered.filter((b) =>
                b.title.toLowerCase().includes(query) ||
                (b.description && b.description.toLowerCase().includes(query))
            );
        }

        const sorted = [...filtered].sort((a, b) => {
            switch (state.sortBy) {
                case "az":
                    return a.title.localeCompare(b.title);
                case "za":
                    return b.title.localeCompare(a.title);
                case "recent":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case "oldest":
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return sorted;
    }, [state.searchQuery, state.sortBy, state.boards]);

    // Sync boards when initialBoards change (e.g., provider parent passes new boards)
    useEffect(() => {
        if (initialBoards) {
            dispatch({ type: 'SET_BOARDS', payload: initialBoards });
        }
    }, [initialBoards]);

    return (
        <WorkspaceContext value={{ ...state, boards: computedBoards }}>
            <WorkspaceDispatchContext value={dispatch}>
                {children}
            </WorkspaceDispatchContext>
        </WorkspaceContext>
    );
}
