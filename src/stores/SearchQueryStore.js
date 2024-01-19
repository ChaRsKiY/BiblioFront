import { makeAutoObservable } from 'mobx';

class SearchQueryStore {
    searchQuery = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSearchQuery(q) {
        this.searchQuery = q;
    }
}

const searchQueryStore = new SearchQueryStore();
export default searchQueryStore;
