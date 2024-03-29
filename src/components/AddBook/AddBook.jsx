import axios from "axios";
import {useEffect, useState} from "react";
import {BiError} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import tokenStore from "../../stores/TokenStore";

const AddBook = () => {
    const [genres, setGenres] = useState([])
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        title: "",
        author: "",
        description: "",
        year: null,
        genreId: null,
        content: null,
        image: null
    })

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
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleFileChange = (e) => {
        const { name } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0],
        }));
    };

    useEffect(() => {
        getGenres()
    }, []);

    const navigate = useNavigate()
    const { token } = tokenStore

    const handleSubmit = async (e) => {
        e.preventDefault()

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
                await axios.post('Book', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    },
                });
                setIsLoading(false)
                navigate('/books')
            } catch (e) {
                console.error(e)
                setIsLoading(false)
            }


        }
    }

    const { t } = useTranslation()

    return (
        <div className="flex justify-center items-center ml-5 mr-5 h-fit mt-24 mb-8 md:min-h-svh" style={{ fontFamily: "Kanit, Roboto, serif" }}>
            <div className="bg-gray-200 p-5 rounded-2xl mt-16 mb-20 md:mt-0 md:mb-0 sm:mt-28 sm:mb-28">
                <div className="text-center text-3xl pb-5 text-orange-300">{t('PostTheBook')}</div>
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-between mb-3">
                        <input placeholder={t('Title')}
                               name="title"
                               onChange={handleFieldChanged}
                               className="p-2 pl-4 rounded-xl outline-2 outline-orange-300 border-2 w-4/6 mr-2"/>
                        <input placeholder={t("Author")}
                               name="author"
                               onChange={handleFieldChanged}
                               className="p-2 pl-4 rounded-xl outline-2 outline-orange-300 border-2 w-3/5"/>
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                        <input placeholder={t("Year")}
                               type="number"
                               name="year"
                               className="p-2 pl-4 rounded-xl outline-2 outline-orange-300 border-2 w-2/5 mr-2"
                               onChange={handleFieldChanged}
                        />
                        <select
                            className="p-2 pl-4 rounded-xl outline-2 outline-orange-300 border-2 w-3/5 pr-5"
                            name="genreId"
                            onChange={handleFieldChanged}
                            defaultValue={genres.length && genres[0].id}
                        >
                            {genres.map((el) => (
                                <option key={el.id} value={el.id}>{el.title}</option>
                            ))}
                        </select>
                    </div>
                    <textarea placeholder={t("Description")}
                              name="description"
                              onChange={handleFieldChanged}
                              className="p-2 pl-4 rounded-xl outline-2 outline-orange-300 border-2 w-full resize-none h-28"/>


                    <div className="flex items-center justify-center w-full mt-4">
                        <label htmlFor="dropzone-content"
                               className="px-2 flex flex-col items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 max-sm:text-[0.7rem] "><span
                                    className="font-semibold">{data.content ? data.content.name : t("ClickToUploadTheContent")} </span> -
                                    {data.content ? t("ClickForNewUpload") : t("OrDragAndDropIt")}</p>
                                <p className="text-xs text-gray-500">TXT, PDF {t('or')} DOCX</p>
                            </div>
                            <input id="dropzone-content" type="file" className="hidden" name="content"
                                   onChange={handleFileChange} accept=".txt, .pdf, .docx"/>
                        </label>
                    </div>

                    <div className="flex items-center justify-center w-full mt-4 ">
                        <label htmlFor="dropzone-image"
                               className="px-2 flex flex-col items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 max-sm:text-[0.7rem] "><span
                                    className="font-semibold">{data.image ? data.image.name : t("ClickToUploadTheCover")} </span> -
                                    {data.image ? t("ClickForNewUpload") : t("OrDragAndDropIt")}</p>
                                <p className="text-xs text-gray-500">PNG, JPG {t('or')} WEBP</p>
                            </div>
                            <input id="dropzone-image" type="file" className="hidden" name="image"
                                   onChange={handleFileChange}
                                   onDrop={handleFileChange}
                                   accept=".png, .jpg, .webp"/>
                        </label>
                    </div>

                    {errors.length ? (
                        <div className="bg-red-300 rounded-xl flex items-center p-3 mt-3.5 mb-0.5">
                            <BiError color="white" className="mr-4" size={25} />
                            <div className="text-white">
                            {errors.map((el, key) => (
                                <p key={key}>
                                    {el}
                                </p>
                            ))}
                            </div>
                        </div>
                    ) : ""}

                    <button disabled={isLoading} type="submit" className="bg-orange-300 text-white pt-2.5 pb-2.5 rounded-2xl mt-4">{t('Post')}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddBook