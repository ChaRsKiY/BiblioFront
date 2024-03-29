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
import {useState} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";

const AdminSendEmailModal = ({ open, setOpen, userId }) => {
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const { token } = tokenStore

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true)

            await axios.post("Admin/send-email", { id: userId, subject, email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            setOpen(false)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.error(e)
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginX: "12px" }}
        >
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
                            Send Email - Id {userId}
                        </Typography>
                        <form
                            onSubmit={handleFormSubmit}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Subject</FormLabel>
                                    <Input name="bio" value={subject} color="warning" onChange={handleSubjectChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email Content</FormLabel>
                                    <Textarea name="bio" sx={{ maxHeight: "350px", minWidth: "350px" }} value={email} color="warning" onChange={handleEmailChange} />
                                </FormControl>
                                <Button disabled={isLoading} type="submit" color="warning">Send</Button>
                            </Stack>
                        </form>
                    </Sheet>
        </Modal>
    )
}

export default AdminSendEmailModal