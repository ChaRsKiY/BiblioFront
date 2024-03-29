import axios from "axios";

const getUser = async (token) => {
    try {
        if (token) {
            const response = await axios.get("User/decode", {
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
