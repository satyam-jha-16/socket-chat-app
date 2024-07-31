import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import useGetConversations from '@/hooks/useGetConversation'
import useConversation from '@/zustand/useCoversation'
import Image from 'next/image'

const Conversations = () => {

  const { conversations, loading } = useGetConversations();
  const {setSelectedConversation, selectedConversation} = useConversation();
  ;
  return (
    <div className=''>
      <ScrollArea className="h-96 mb-20 mt-10 w-full ">
        <div className="p-6 text-xl">
          {
            loading ? (<div className='flex justify-center align-middle'>
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>) : (null)
          }
          {conversations.map((person) => (
            <>
            <div  className={`text-md flex items-center gap-9 hover:bg-slate-100 hover:rounded-lg p-1 ${selectedConversation?.id === person.id? "bg-slate-100 rounded-lg" : ""}`} onClick={() => setSelectedConversation(person)}>
        
              <Image src={person.profilePic} alt="profile" width={40} height={40} className="rounded-full" />
            
              <div key={person.id} >
                {person.fullName}
              </div>
            </div>
              <Separator className="my-1" />
            </>
          ))}
        </div>
      </ScrollArea>

    </div>
  )
}

export default Conversations;