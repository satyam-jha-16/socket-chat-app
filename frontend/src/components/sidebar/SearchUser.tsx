import useGetConversations from "@/hooks/useGetConversation";
import useConversation from "@/zustand/useCoversation";
import { Search } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { toast } from "../ui/use-toast";

type ConversationType = {
    id: string;
    fullName: string;
    profilePic: string;
}

const SearchUser = () => {

    const [value, setValue] = useState("");
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();

    
    const handleSearch = () => {
        if(!value) return;
        if(value.length < 3 ) return toast({title : "Search query must be at least 3 characters"});
        
        const conversation = conversations.find((c : ConversationType) => { return c.fullName.toLowerCase().includes(value.toLowerCase())
            
        });
        if (conversation) {
            setSelectedConversation(conversation);
            setValue("");
        }else {
            return toast({title: "No users found!!"})
        }
        
    }
    const handleKeyDown = (e : any) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
            handleSearch();
        }
    }
    
    return (
        <div className="relative flex justify-center mt-3 items-center">
            <input
                placeholder="Search User"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-10 pl-5 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
            />
            <button
                onClick={() => handleSearch()}
                className="absolute top-2 right-3 text-neutral-500"
            >
                <Search size={20} />
            </button>
        </div>
    )
}

export default SearchUser;  