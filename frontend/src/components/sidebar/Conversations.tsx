import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const  Conversations = () => {
  const tags = [{tag: "tag1"}, {tag: "tag2"}, {tag: "tag3"}, {tag: "tag4"}, {tag: "tag5"}, {tag: "tag6"}, {tag: "tag7"}, {tag: "tag8"}, {tag: "tag9"}, {tag: "tag10"}, {tag: "tag11"}, {tag: "tag12"}, {tag: "tag13"}, {tag: "tag14"}, {tag: "tag15"}, {tag: "tag16"}, {tag: "tag17"}, {tag: "tag18"}, {tag: "tag19"}, {tag: "tag20"}, {tag: "tag21"}, {tag: "tag22"}, {tag: "tag23"}, {tag: "tag24"}, {tag: "tag25"}, {tag: "tag26"}, {tag: "tag27"}, {tag: "tag28"}, {tag: "tag29"}, {tag: "tag30"}, {tag: "tag31"}, {tag: "tag32"}, {tag: "tag33"}, {tag: "tag34"}, {tag: "tag35"}, {tag: "tag36"}, {tag: "tag37"}, {tag: "tag38"}, {tag: "tag39"}, {tag: "tag40"}, {tag: "tag41"}, {tag: "tag42"}, {tag: "tag43"}, {tag: "tag44"}, {tag: "tag45"}, {tag: "tag46"}, {tag: "tag47"}, {tag: "tag48"}, {tag: "tag49"}, {tag: "tag50"}]
  return (
    <div className=''>
      <ScrollArea className="h-96 mb-20 mt-10 w-full ">
      <div className="p-6 text-xl">
        {tags.map((tag) => (
          <>
            <div key={tag.tag} className="text-md hover:bg-slate-100 p-1">
              {tag.tag}
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