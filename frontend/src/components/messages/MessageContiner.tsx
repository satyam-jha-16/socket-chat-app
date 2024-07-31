import useConversation from "@/zustand/useCoversation"
import Image from "next/image";
import EmptyMessage from "./EmptyMessage";
import Compose from "./Compose";
import Messages from "./Messages";

const MessageContainer = () => {
    const {selectedConversation} = useConversation();
    if(!selectedConversation) return <EmptyMessage />
    return (
       
        <div className="flex flex-col justify-between ">
            {/* PROFILE SECTION */}
            <div>
            <div className="text-xl text-black flex justify-between items-center rounded-xl p-1 shadow-sm shadow-stone-400">
                <div className="pl-2 text-2xl">
                {selectedConversation?.fullName}
                </div>
                <Image src={selectedConversation?.profilePic } alt="profile" width={50} height={50} className="rounded-full" />
            </div>
            <div>
                <Messages />
            </div>
            </div>
            <div className="bottom-3">
                <Compose />
            </div>
        </div>
    )
}

export default MessageContainer;