const AdminBannerTable = () => {
    const banner = [
        {
            title: "Wonderful books",
            content: "This books for you are wonderful"
        },
        {
            title: "Wonderful books",
            content: "This books for you are wonderful"
        },
        {
            title: "Wonderful books",
            content: "This books for you are wonderful"
        },
    ]

    return (
        <div className="flex justify-center items-center">
            <table className="w-full table-auto mt-4 font-[Kanit] text-[1.1rem] space-x-1.5">
                <thead>
                <tr className="text-left text-gray-500 text-xl dark:text-gray-300">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Content</th>
                </tr>
                </thead>
                <tbody>
                {banner.map((block, index) => (
                    <tr key={block.id} className="hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-neutral-600">
                        <td className="pb-1 ">{block.title}</td>
                        <td className="pb-1">{block.content}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminBannerTable