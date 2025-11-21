import { useReducer } from "react";
import type { SortOption, ViewMode } from "@/features/workspace/shared/types";
import { WorkspaceContext, WorkspaceDispatchContext } from "@/features/workspace/shared/context";
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

function reducer(state: {
    searchQuery: string;
    sortBy: SortOption;
    viewMode: ViewMode;
    boards: Board[];
}, action: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}) {
    switch (action.type) {
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
        case "SET_SORT_BY":
            return { ...state, sortBy: action.payload };
        case "SET_VIEW_MODE":
            return { ...state, viewMode: action.payload };
        default:
            return state;
    }
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(
        reducer,
        {
            searchQuery: "",
            sortBy: "recent",
            viewMode: "grid",
            boards: boards,
        }
    );

    return (
        <WorkspaceContext value={state}>
            <WorkspaceDispatchContext value={dispatch}>
                {children}
            </WorkspaceDispatchContext>
        </WorkspaceContext>
    );
}
