const AdminGenresBlock = ({ genres, handleDeleteGenreClicked }) => {
    return (
        <div className="mt-4 flex flex-wrap font-[Kanit] justify-start items-baseline">
            {genres.map((el, key) => (
                <div onDoubleClick={() => handleDeleteGenreClicked(el)} key={key} className="px-3 py-1.5 border border-gray-300 rounded-xl mr-2 mb-2 hover:bg-orange-300 hover:text-white hover:border-orange-300 duration-300 cursor-pointer dark:text-white dark:border-neutral-500">
                    {el.title}
                </div>
            ))}
        </div>
    )
}

export default AdminGenresBlock