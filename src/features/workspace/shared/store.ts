let searchQuery ='';

let subscribers: Array<() => void> = [];

export const searchStore = {
    getSnapshot(){
        return searchQuery;
    },
    changeSearchQuery(newQuery: string){
        searchQuery = newQuery;
        subscribers.forEach(func => func());
    },
    subscribers(listener: () => void){
        subscribers.push(listener);
        return() => {
            subscribers = subscribers.filter((l) => l != listener);
        };
    }
}