import { Filter, ArrowUpAZ, ArrowDownAZ, Clock, Calendar, Grid, List } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useContext } from 'react';
import { WorkspaceContext, WorkspaceDispatchContext } from '../shared/context';
import FilterSearchInput from './filter-search-input';

export function WorkspaceFilter() {
    const {
        sortBy,
        viewMode,
    } = useContext(WorkspaceContext)

    const dispatch = useContext(WorkspaceDispatchContext);

    const getSortLabel = () => {
        switch (sortBy) {
            case 'az': return 'A-Z';
            case 'za': return 'Z-A';
            case 'recent': return 'Most Recent';
            case 'oldest': return 'Least Recent';
            default: return 'Sort';
        }
    };

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <FilterSearchInput />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Sort: {getSortLabel()}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => dispatch({ type: 'SET_SORT_BY', payload: 'az' })}>
                                <ArrowUpAZ className="w-4 h-4 mr-2" />
                                A-Z
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch({ type: 'SET_SORT_BY', payload: 'za' })}>
                                <ArrowDownAZ className="w-4 h-4 mr-2" />
                                Z-A
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch({ type: 'SET_SORT_BY', payload: 'recent' })}>
                                <Clock className="w-4 h-4 mr-2" />
                                Most Recent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch({ type: 'SET_SORT_BY', payload: 'oldest' })}>
                                <Calendar className="w-4 h-4 mr-2" />
                                Least Recent
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <Button
                        size="sm"
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })}
                        className="h-8 w-8 p-0"
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })}
                        className="h-8 w-8 p-0"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}