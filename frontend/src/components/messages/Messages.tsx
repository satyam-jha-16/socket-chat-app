import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import { ScrollArea } from "../ui/scroll-area";
import useListenMessages from "@/hooks/useListenMessages";

const Messages = () => {
    const {loading, messages} = useGetMessages();
    useListenMessages();
    //console.log("messages", messages);
    if(loading) return (<div className='flex justify-center my-10 align-middle'>
    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>)
    return (
        <ScrollArea className="h-[600px] p-7">
           {
            messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
            ))
           }
        </ScrollArea>
    )
}

export default Messages;