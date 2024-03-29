const TitleWithIcon = ({ text, icon }) => {
    return (
        <div className="flex items-center space-x-3.5">
            <div className="rounded-[10px] bg-orange-400 p-1.5 flex items-center justify-center text-white w-9 h-9">
                {icon}
            </div>
            <div className="font-[Kanit] text-2xl text-gray-600 dark:text-white">{text}</div>
        </div>
    )
}

export default TitleWithIcon