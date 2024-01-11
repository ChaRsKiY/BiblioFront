import { makeAutoObservable } from 'mobx';
import Cookies from "js-cookie";

class GlobalLoaderStore {
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading(t) {
        this.isLoading = t;
    }
}

const globalLoaderStore = new GlobalLoaderStore();
export default globalLoaderStore;
