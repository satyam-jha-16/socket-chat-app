import { toast } from '@/components/ui/use-toast';
import useConversation from '@/zustand/useCoversation';
import { useEffect, useState } from 'react';
const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {

        const getMessages = async () => {
            if (!selectedConversation) return;
            setLoading(true);
            setMessages ([]);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/messages/${selectedConversation.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
                }
                setMessages(data);


            } catch (error : any) {
                toast({title : error.message})
                console.log("error", error);
                return ;                
            }finally{
                setLoading(false);
            }

        };

        getMessages();

    }, [selectedConversation, setMessages]);


    return {messages, loading};
}


export default useGetMessages;