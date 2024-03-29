import {Button, DialogActions, FormLabel, Input, Modal, ModalClose, Option, Select, Sheet, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import tokenStore from "../../stores/TokenStore";
import {useTranslation} from "react-i18next";

const EditBookModal = ({ open, setOpen, book }) => {
    const [genres, setGenres] = useState([])
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        title: book.title,
        author: book.author,
        description: book.description,
        year: new Date(book.year).getFullYear(),
        genreId: book.genreId,
        content: null,
        image: null
    })

    const { t } = useTranslation()

    const validateFields = () => {
        const errors = [];

        if (!data.title.trim()) {
            errors.push(t("TitleIsRequired"));
        } else if (data.title.split(/\s+/).length > 35) {
            errors.push(t("TitleShouldNotExceed35Words"));
        }

        if (!data.author.trim()) {
            errors.push(t("AuthorIsRequired"));
        } else if (data.author.length < 2 || data.author.length > 20) {
            errors.push(t("AuthorShouldBeBetween2And20Characters"));
        }

        if (data.description.length > 200 || data.description.length < 10) {
            errors.push(t("DescriptionShouldBeBetween10And200Characters"));
        }

        if (!data.year || isNaN(data.year) || data.year < 999 || data.year > new Date().getFullYear()) {
            errors.push(t("YearMustBeBetween999AndTheCurrentYear"));
        }

        if (!data.genreId || isNaN(data.genreId)) {
            errors.push(t("InvalidOrMissingGenre"));
        }

        if (!data.content || !data.image) {
            errors.push(t("ContentImageAndCoverFilesMustBeChosen"));
        }

        setErrors(errors)

        return !errors.length;
    };


    const getGenres = async () => {
        try {
            const result = await axios.get(`Genre`)
            setGenres(result.data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleFieldChanged = (e) => {
        if(e) {
            const { name, value } = e.target;
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleFileChange = (e) => {
        if (e) {
            const { name } = e.target;
            setData((prevData) => ({
                ...prevData,
                [name]: e.target.files[0],
            }));
        }
    };

    useEffect(() => {
        getGenres()
    }, []);

    const navigate = useNavigate()
    const { token } = tokenStore

    const handleSubmit = async () => {
        if (validateFields()) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("content", data.content);
            formData.append("year", data.year);
            formData.append("author", data.author);
            formData.append("genreId", data.genreId);
            formData.append("image", data.image);

            try {
                await axios.put('Book/' + book.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    },
                });
                setIsLoading(false)
                setOpen(false)
            } catch (e) {
                console.error(e)
                setIsLoading(false)
            }


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
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >
                    Edit book
                </Typography>

                <div className="space-y-2">
                    <div>
                        <FormLabel sx={{ marginLeft: "5px" }}>Title</FormLabel>
                        <Input defaultValue={book.title} name="title" onChange={handleFieldChanged} color="warning" placeholder="Title"/>
                    </div>

                    <div>
                        <FormLabel sx={{ marginLeft: "5px" }}>Author</FormLabel>
                        <Input defaultValue={book.author} name="author" onChange={handleFieldChanged} color="warning" placeholder="Author"/>
                    </div>

                    <div>
                        <FormLabel sx={{ marginLeft: "5px" }}>Year</FormLabel>
                        <Input defaultValue={new Date(book.year).getFullYear()} name="year" onChange={handleFieldChanged} color="warning" placeholder="Year" type="number"/>
                    </div>

                    <div>
                        <FormLabel sx={{ marginLeft: "5px" }}>Genres</FormLabel>
                        <select
                            name="genreId"
                            onChange={handleFieldChanged}
                            className="border border-orange-200 rounded-[7px] w-full p-1.5 outline-orange-700"
                        >

                            {genres.map((el) => (
                                <option key={el.id} value={el.id}>{el.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <FormLabel sx={{marginLeft: "5px"}}>Description</FormLabel>
                        <Input defaultValue={book.description} name="description" onChange={handleFieldChanged} color="warning" placeholder="Description"/>
                    </div>

                    <div>
                        <FormLabel sx={{marginLeft: "5px"}}>Content</FormLabel>
                        <Input accept=".txt, .pdf, .docx" name="content" onChange={handleFileChange} color="warning" type="file"/>
                    </div>

                    <div>
                        <FormLabel sx={{marginLeft: "5px"}}>Cover</FormLabel>
                        <Input accept=".png, .jpg, .webp" name="image" onChange={handleFileChange} color="warning" type="file"/>
                    </div>

                    {errors ? (
                        <div className="rounded-[7px] p-3 space-y-1 bg-red-200 text-white mb-2">
                            {errors.map((el, id) => (
                                <div key={id}>
                                    {el}
                                </div>
                            ))}
                        </div>
                    ) : ""}
                </div>

                <DialogActions sx={{marginTop: "12px"}}>
                    <Button disabled={isLoading} sx={{ marginLeft: "5px", minWidth: "100px" }} variant="solid" color="danger" onClick={() =>
                    {
                        handleSubmit()
                    }}>
                        Edit
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Sheet>
        </Modal>
    )
}

export default EditBookModal