import {ModalClose, Sheet, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const SettingModalDialog = ({ setSettings, settings, setIsModalOpen }) => {
    const [textSize, setTextSize] = useState(settings.textsize)
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        if (textSize === settings.textsize) {
            setIsChanged(false)
        } else {
            setIsChanged(true)
        }
    }, [textSize]);

    const handleReadLengthInputChanged = (e) => {
        let newSize = e.target.value;
        if (newSize > 5) {
            newSize = 5;
        } else if (newSize < 1) {
            newSize = 1;
        }
        setTextSize(newSize);
    }


    const handleSubmit = () => {
        if (textSize !== settings.textsize && textSize >= 1 && textSize <= 5) {
            Cookies.set("textsize", textSize);
            setSettings(prev => ({
                ...prev,
                textsize: textSize
            }));
            setIsModalOpen(false);
        }
    }

    return (
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 700,
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
                Settings
            </Typography>

            <div className="space-y-4">
                <div className="flex space-x-2 items-center">
                    <div>Text size (1-5):</div>
                    <input onChange={handleReadLengthInputChanged}
                           placeholder={350}
                           value={textSize}
                           className="px-1.5 py-0.5 border-2 border-orange-200 rounded outline-orange-300"
                           type="number"/>
                </div>
                {/*isChanged && <div className="text-white bg-orange-400 rounded flex items-center space-x-3 p-3">
                    <CiWarning size={26}/>
                    <div>Book will be reloaded to first page.</div>
                </div>*/}
            </div>

            <button onClick={handleSubmit} className="text-white bg-orange-300 rounded py-1.5 mt-4 w-full hover:bg-orange-400">Submit</button>
        </Sheet>
    )
}

export default SettingModalDialog