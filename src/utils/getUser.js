import axios from "axios";
import { SERVER_URL } from "../data/urls";
import Cookies from "js-cookie";

const getUser = async (token) => {
    try {
        if (token) {
            const response = await axios.get(SERVER_URL + "User/decode", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export default getUser;
