import { useAuthContext } from "@/context/AuthContext";
import {format} from "date-fns"; // Optional: Use date-fns for formatting

type Msg = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  shouldShake? :boolean;
};

const Message = ({ msg }: { msg: Msg }) => {
  const { authUser } = useAuthContext();

  const amISender = msg?.senderId === authUser?.id;
  const shakeClass = msg.shouldShake === true ? "shake" : "";

  // Styles for sender and receiver
  const senderClasses = "bg-slate-50 shadow-md text-black rounded-t-2xl rounded-bl-2xl self-end";
  const receiverClasses = "bg-black pl-2 shadow-white shadow-md text-white rounded-t-2xl rounded-br-2xl self-start";

  // Format the createdAt timestamp
  const formattedTime = format(new Date(msg.createdAt), 'p'); // Example format '3:45 PM'

  return (
    <div className={`flex ${amISender ? "justify-end" : `justify-start ${shakeClass}`} my-2`}>
      <div className="max-w-xs md:max-w-md">
        <div className={`${amISender ? senderClasses : receiverClasses} p-2 break-words`}>
          {msg.body}
        </div>
        <div className="text-gray-500 text-xs mt-1 text-right">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
