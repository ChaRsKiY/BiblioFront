import axios from "axios";

const updateUserAdminData = async (token, changeData, userId) => {
    try {
        const formDataToSubmit = new FormData();

        Object.entries(changeData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value);
        });

        if (token) {
            await axios.put("User/update/" + userId,
                formDataToSubmit,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
        }
    } catch (error) {
        console.error(error)
        if(error.response.status === 400) {
            if (error.response.data === "usernameExist") {
                return error.response.data;
            }
        }
    }
};

export default updateUserAdminData;
