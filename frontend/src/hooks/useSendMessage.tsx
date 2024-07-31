import { toast } from "@/components/ui/use-toast";
import useConversation from "@/zustand/useCoversation";
import { useState } from "react";

const useSendMessage = () => {
    const { selectedConversation, messages, setMessages } = useConversation();
    const [loading, setLoading] = useState(false);
    
    const sendMessage = async (message: string) => {
        if (!selectedConversation) {
            toast({
                title: "You need to login first"
            })
        }
    
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/messages/send/${selectedConversation?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message}),
                credentials: "include",
            });
            const data = await res.json();
            if(data .error){
                throw new Error(data.error);
            }

            setMessages([...messages, data]);

        } catch (error : any) {
            toast({
                title : error.message
            })
        } finally {
            setLoading(false);
        }
    };

    return {sendMessage, loading};
};


export default useSendMessage;