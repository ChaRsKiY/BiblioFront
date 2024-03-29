import LazyImage from "../Books/LazyImage";

const Comment = ({ comment }) => {
    return (
        <div className="bg-gray-100 rounded p-5 mb-5 max-w-72">
            <div className="flex items-center">
                <div className="rounded-full overflow-hidden mr-3 h-12 w-12">
                    <LazyImage alt={comment.username} src={"https://localhost:7000/User/avatar/" + comment.avatar} height={55} width={55} />
                </div>
                <div className="text-[1.3rem] text-gray-600 font-bold">{comment.username}</div>
            </div>
            <div className="p-1 pt-3 text-[1.3rem]">{comment.content}</div>
        </div>
    )
}

export default Comment