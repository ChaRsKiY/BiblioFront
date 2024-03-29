import AddBook from "../../components/AddBook/AddBook";
import {useEffect} from "react";

const AddBookPage = () => {
    useEffect(() => {
        document.title = "Biblio - Add Book"
    }, []);

    return (
        <AddBook />
    )
}

export default AddBookPage