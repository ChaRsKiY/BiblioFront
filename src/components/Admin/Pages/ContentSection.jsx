const AdminContentSection = () => {
    const section = {
        title: "Books for u",
        content: "Books for u Books for u Books for u Books for u Books for u Books for u Books for u Books for u Books for u"
    }

    return (
        <div className="text-[1.1rem] mt-2 font-[Kanit] dark:text-white">
            <div><span className="text-gray-500 dark:text-gray-300">Title:</span> {section.title}</div>
            <div><span className="text-gray-500 dark:text-gray-300">Content:</span> {section.content}</div>
        </div>
    )
}

export default AdminContentSection