import useSendMessage from '@/hooks/useSendMessage';
import { SendHorizontal } from 'lucide-react';
import React, { useState } from 'react'

const Compose = () => {
    const [message, setMessage] = useState("");
    const {sendMessage, loading} = useSendMessage();
    const handleSend =async () => {
        if(message.trim() === "") return;
        await sendMessage(message);
        setMessage("");
    }
    const handleKeyDown = (e : any) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
            handleSend();
        }
    }
    return (
        <div className="relative flex justify-center mt-3 items-center ">
            <input
                placeholder="send message"
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-11 pl-5 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
            />
            <button
                onClick={() => handleSend()}
                className="absolute top-3 right-3 text-neutral-500"
            >
                {
                    loading ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <SendHorizontal size={20} />
                    )
                }
                
            </button>
        </div>
    )
}

export default Compose