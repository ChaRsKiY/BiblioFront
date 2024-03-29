import RatingStars from "./RatingStars";
import {useState} from "react";
import axios from "axios";
import tokenStore from "../../stores/TokenStore";

const AddCommentSection = ({ bookId, getComment }) => {
    const [comment, setComment] = useState("")

    const { token } = tokenStore

    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleAddComment = async (content) => {
        if (content) {
            await axios.post("Comment", { content: content, idBook: bookId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            getComment(1)
        }
    }

    const handleAddRating = async (rating) => {
        if (rating) {
            await axios.post("Rating", { stars: rating, idBook: bookId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    }

    return (
        <div className="mt-6">
            <div className="bg-gray-50 py-4 flex justify-evenly items-center max-sm:flex-col">
                <div className="flex flex-col">
                    <div className="text-center mb-1 text-xl text-orange-300">Share a comment</div>
                    <textarea value={comment} onChange={handleChangeComment} className="rounded py-1 px-2 border-2 border-orange-300 outline-orange-400 resize-none"/>
                    <button onClick={() => {
                        handleAddComment(comment)
                        setComment("")
                    }} className="text-white mt-2 rounded text-xl bg-orange-300 hover:bg-orange-400 py-1">Post
                    </button>
                </div>
                <div className="flex flex-col max-sm:mt-6 max-sm:mb-2">
                    <div className="text-center mb-1 text-xl text-orange-300">Rate the book</div>
                    <RatingStars handleAddRating={handleAddRating} />
                </div>
            </div>
        </div>
    )
}

export default AddCommentSection