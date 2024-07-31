import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

type ConversationType = {
    id: string;
    fullName: string;
    profilePic: string;
}

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() =>{
        async function fetchConversations() {
            setLoading(true);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/messages/getconversations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error : any) {
                toast({title: error.message})
            }finally{
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    return {loading, conversations};
};

export default useGetConversations;