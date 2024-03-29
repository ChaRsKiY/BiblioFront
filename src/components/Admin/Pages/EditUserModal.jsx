import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    Sheet,
    Stack, Textarea,
    Typography
} from "@mui/joy";
import {useEffect, useState, useTransition} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";
import updateUserAdminData from "../../../utils/updateUserAdminData";

const AdminEditUserModal = ({ getAll, open, setOpen, userId }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const [isPending, startTransition] = useTransition()

    const { token } = tokenStore


    useEffect(() => {
        const getCurrentUser = () => {
            startTransition(async () => {
                const result = await axios.get("User/userdata/" + userId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                setCurrentUser(result.data)
            })
        }

        getCurrentUser()
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const { name } = event.target;
        setCurrentUser(prevState => ({
            ...prevState,
            [name]: event.target.files[0]
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            startTransition(async () => {
                await updateUserAdminData(token, currentUser, userId)

                getAll()
                setOpen(false)
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginX: "12px" }}
        >
            <>
                {currentUser &&
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose variant="plain" sx={{m: 1}}/>
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            Edit - Id {userId}
                        </Typography>
                        <form
                            onSubmit={handleFormSubmit}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Username</FormLabel>
                                    <Input name="userName" value={currentUser.userName} color="warning" autoFocus onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input name="name" value={currentUser.name} color="warning" onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Surname</FormLabel>
                                    <Input name="surname" value={currentUser.surname} color="warning" onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Bio</FormLabel>
                                    <Textarea name="bio" sx={{ maxHeight: "200px" }} value={currentUser.bio} color="warning" onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Avatar</FormLabel>
                                    <Input name="avatarFile" color="warning" type="file" onChange={handleFileChange} />
                                </FormControl>
                                <Button disabled={isPending} type="submit" color="warning">Submit</Button>
                            </Stack>
                        </form>
                    </Sheet>
                }</>
        </Modal>
    )
}

export default AdminEditUserModal