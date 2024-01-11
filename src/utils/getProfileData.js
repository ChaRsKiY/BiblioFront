import axios from "axios";
import { SERVER_URL } from "../data/urls";

const getProfileData = async (token) => {
    try {
        if (token) {
            const response = await axios.get(SERVER_URL + "User/userdata", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export default getProfileData;
