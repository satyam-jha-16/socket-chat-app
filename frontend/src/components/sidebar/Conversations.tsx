import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useGetConversations from '@/hooks/useGetConversation';
import useConversation from '@/zustand/useCoversation';
import Image from 'next/image';
import { useSocketContext } from '@/context/SocketContext';

const Conversations = () => {
  const { onlineUsers } = useSocketContext();
  const { conversations, loading } = useGetConversations();
  const { setSelectedConversation, selectedConversation } = useConversation();
  //console.log(onlineUsers);
  
  return (
    <div className=''>
      <ScrollArea className="h-96 mb-20 mt-10 w-full">
        <div className="p-6 text-xl">
          {loading ? (
            <div className='flex justify-center align-middle'>
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : null}

          {conversations.map((person) => (
            <React.Fragment key={person.id}>
              <div
                className={`text-md flex items-center gap-9 hover:bg-slate-100 hover:rounded-lg p-1 cursor-pointer ${selectedConversation?.id === person.id ? "bg-slate-100 rounded-lg" : ""}`}
                onClick={() => setSelectedConversation(person)}
              >
                <div className="relative">
                  <Image src={person.profilePic} alt="profile" width={40} height={40} className="rounded-full" />
                  {onlineUsers.includes(person.id) && (
                    <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  {person.fullName}
                </div>
              </div>
              <Separator className="my-1" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Conversations;
