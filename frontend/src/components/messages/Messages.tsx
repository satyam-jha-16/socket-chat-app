import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import { ScrollArea } from "../ui/scroll-area";
import useListenMessages from "@/hooks/useListenMessages";
import { useEffect, useRef } from "react";

const Messages = () => {
    const {loading, messages} = useGetMessages();
    useListenMessages();
    // console.log("messages", messages);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
      if (scrollableNode) {
        scrollableNode.scrollTop = scrollableNode.scrollHeight;
      }
    }
  }, [messages]);
    if(loading) return (<div className='flex justify-center my-10 align-middle'>
    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>)
    return (
        <ScrollArea className="h-[600px] p-7" ref={scrollAreaRef}  >
           {
            messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
            ))
           }
        </ScrollArea>
    )
}

export default Messages;