import axios from "axios";

const updateUserData = async (token, changeData) => {
    try {
        const formDataToSubmit = new FormData();

        Object.entries(changeData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value);
        });

        if (token) {
            await axios.put("User/update",
                formDataToSubmit,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
        }
    } catch (error) {
        if(error.response.status === 400) {
            if (error.response.data === "usernameExist") {
                return error.response.data;
            }
        }
    }
};

export default updateUserData;
