import { makeAutoObservable } from 'mobx';
import getUser from "../utils/getUser";
import Cookies from "js-cookie";
import globalLoaderStore from "./GlobalLoaderStore";

class UserStore {
    user = null;

    constructor() {
        makeAutoObservable(this);
    }

    async initialize(token) {
        try {
            globalLoaderStore.setIsLoading(true)

            const fetchedUser = await getUser(token);

            if (fetchedUser === 401) {
                Cookies.set("token", null, {expires: new Date(0)})
                this.setUser(null)
            } else {
                this.setUser(fetchedUser);
            }
        } catch (e) {
            if(e.response.status === 400) {
                Cookies.set("token", null, {expires: new Date(0)})
                this.setUser(null)
            }
        } finally {
            globalLoaderStore.setIsLoading(false)
        }
    }

    setUser(u) {
        this.user = u;
    }

    updateUser(token) {
        this.initialize(token);
    }
}

const userStore = new UserStore();
export default userStore;
