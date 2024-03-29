import {Button, Input} from "@mui/joy";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {IoIosClose} from "react-icons/io";
import {useGSAP} from "@gsap/react";
import gsap from "gsap"
import {Link} from "react-router-dom";

const AIMessenger = ({ setAiMessages, aiMessages, setIsAIOpen }) => {
    const [input, setInput] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState("")

    const ref = useRef();
    const lastMessage = useRef();

    const toUrlString = (str) => {
        const regex = /(\()?(\/[^\s]+)(\))?/g;
        const jsx = str.split(regex).map((part, index) => {
            if (index % 4 === 0) {
                return part;
            } else if (index % 4 === 1) {
                return <Link key={index} to={part}>{part}</Link>;
            } else {
                return part;
            }
        });
        return jsx;
    }

    useGSAP(() => {
        if (lastMessage.current) {
            const newMessage = lastMessage.current;
            gsap.fromTo(newMessage, { translateY: 20, opacity: 0 }, { translateY: 0, opacity: 1, duration: 0.6 })
        }
    }, [aiMessages])

    const scrollToBottom = () => {
        if (ref.current.scrollHeight)
            ref.current.scrollTop = ref.current.scrollHeight;
    }

    const getAIMessage = async () => {
        const response = await axios.post("AI",{ body: input.trim() })
        setAiMessages([...aiMessages, { text: input.trim() }, response.data])
        setIsPending(false)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()

        if (input.trim().length > 2 && input.trim().length < 50) {
            setIsPending(true)
            setAiMessages([...aiMessages, { text: input }])
            setInput("")
            getAIMessage()
        } else {
            if(input.trim().length <= 2)
                setError("You request is too short.")
            else
                setError("You request is too long.")
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [aiMessages]);

    return (
        <div className="fixed p-3.5 rounded-xl bg-orange-300 text-white right-5 bottom-10 z-50 max-w-96 ml-4 dark:bg-orange-700">
            <div className="flex flex-col mb-3">
                <div className="flex justify-between items-center text-xl mb-2">
                    <div>Biblio AI Beta</div>
                    <IoIosClose onClick={() => setIsAIOpen(prev => !prev)} className="cursor-pointer" size={35}/>
                </div>

                <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input value={input} placeholder="Ask the ai..." className="flex-1" onChange={(e) => { setInput(e.target.value); setError("") }} color="warning" />
                    <Button disabled={isPending} type="submit" color="warning">Send</Button>
                </form>
            </div>

            <div ref={ref} className="space-y-1.5 flex flex-col w-full overflow-y-scroll max-h-80 h-fit">
                {aiMessages.map((el, key) => (
                    el.text ? (
                        <div className="aimessage p-1.5 rounded bg-neutral-500 ml-5"
                             key={key} {...(key === aiMessages.length - 1 ? {ref: lastMessage} : {})}>
                            <div className="text-[0.9rem] text-neutral-200">You</div>
                            {el.text}
                        </div>
                    ) : (
                        <div className="aimessage p-1.5 rounded bg-neutral-400 mr-5"
                             key={key} {...(key === aiMessages.length - 1 ? {ref: lastMessage} : {})}>
                            <div className="text-[0.9rem] text-neutral-200">Biblio</div>
                            <div>{toUrlString(el)}</div>
                        </div>
                    )
                ))}
                {isPending && (
                    <div className="text-gray-500">Biblio is typing...</div>
                )}
                <div className="flex justify-between pt-2">
                    <div className="text-red-500">{error}</div>
                    <div className="text-neutral-100 cursor-pointer">Report AI</div>
                </div>
            </div>
        </div>
    )
}

export default AIMessenger