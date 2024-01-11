import { makeAutoObservable } from 'mobx';
import Cookies from "js-cookie";

class TokenStore {
    token = null;

    constructor() {
        this.token = Cookies.get('token') || null;
        makeAutoObservable(this);
    }

    setToken(t) {
        this.token = t;
    }
}

const tokenStore = new TokenStore();
export default tokenStore;
