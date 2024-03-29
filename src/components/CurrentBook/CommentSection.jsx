import {useEffect, useState} from "react";
import Comment from "./Comment";
import PageSwitchButtons from "./PageSwitchButtons";

const CommentSection = ({ comments, getComment }) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        getComment(page, setTotalPages)
    }, [page]);

    return (
        <div className="flex flex-col items-center">
            <div className="p-4 px-8 flex space-x-5 flex-wrap mt-3 justify-center">
                {comments && comments.map((el) => (
                    <div key={el.commentId}>
                        <Comment comment={el} />
                    </div>
                ))}
            </div>
            {totalPages - 1 ? <PageSwitchButtons page={page} totalPages={totalPages} setPage={setPage} /> : ""}
            <div className="mb-7" />
        </div>
    )
}

export default CommentSection