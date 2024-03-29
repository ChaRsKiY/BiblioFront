import {Button, DialogActions, Modal, ModalClose, Sheet, Typography} from "@mui/joy";
import {useEffect, useState} from "react";

const AdminConfirmationModal = ({ open, setOpen, content, onConfirm, data }) => {
    const [timer, setTimer] = useState(8);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        let interval;

        if (open) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);
                setDisabled(false);
            }, 8000);
        }

        return () => clearInterval(interval);
    }, [open]);

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
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >
                    Confirmation
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                    {content}
                </Typography>
                <DialogActions sx={{ marginTop: "12px" }}>
                    <Button disabled={disabled} sx={{ marginLeft: "5px", minWidth: "100px" }} variant="solid" color="danger" onClick={() =>
                    {
                        setOpen(false)
                        onConfirm(data)
                    }}>
                        {!disabled ? "Confirm" : timer}
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Sheet>
        </Modal>
    )
}

export default AdminConfirmationModal