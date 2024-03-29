import {Button, DialogActions, Modal, ModalClose, Sheet, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import validator from "validator";
import axios from "axios";
import tokenStore from "../../stores/TokenStore";

const ProfileChangeEmailModal = ({ open, setOpen }) => {
    const [data, setData] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { token } = tokenStore

    const startChangingEmail = async () => {
        try {
            await axios.get("User/email-change-request", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch(e) {
            console.error(e)
        }
    }

    const changeEmail = async () => {
        try {
            setIsLoading(true)
            await axios.post("User/email-change", { code: verificationCode, email: data },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            setError("")
            setSuccess("Email has been sent")
        } catch(e) {
            if (e.response.status === 400)
                setError("Invalid token")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        let timeout = setTimeout(() => startChangingEmail(), 2000);

        return () => clearTimeout(timeout)
    }, []);

    const validate = () => {
        if (!data.length) {
            setError("Enter email")
            return 0
        }

        if (verificationCode.length < 5) {
            setError("Invalid verification code")
        }

        if (!validator.isEmail(data)) {
            setError("Is not email")
            return 0
        }

        return 1
    }

    const handleConfirm = async () => {
        if (validate()) {
            await changeEmail()
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
                    Change Email
                </Typography>

                <div className="my-1">
                    We have sent you a verification email.
                </div>

                <div>
                <input onChange={e => {
                    setVerificationCode(e.target.value)
                }} type="email" required
                       className="w-full mt-2.5 mb-1 border border-neutral-300 px-2 py-1 rounded outline-orange-300 text-black"
                       placeholder="Verification Code"/>
                </div>

                <input onChange={e => {
                    setError("")
                    setData(e.target.value)
                }} type="email" required
                       className="w-full my-2.5 border border-neutral-300 px-2 py-1 rounded outline-orange-300 text-black"
                       placeholder="New Email"/>
                {error ? <div className="rounded mb-1 px-2 py-1.5 bg-red-300 text-white">{error}</div> : ""}
                {success ? <div className="rounded mb-1 px-2 py-1.5 bg-green-300 text-white">{success}</div> : ""}

                <DialogActions sx={{marginTop: "12px"}}>
                    <Button disabled={isLoading}
                            sx={{marginLeft: "10px", minWidth: "100px"}} variant="solid" color="danger"
                            onClick={handleConfirm}>
                        Change
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Sheet>
        </Modal>
    )
}

export default ProfileChangeEmailModal