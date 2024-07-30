import { create } from 'zustand'

type ConversationType = {
    id : string;
    name : string;
    profilePic : string;
}
type MessageType = {
    id : string;
    body : string;
    senderId : string;
}
interface ConversationsState {
    selectedConversation : ConversationType | null;
    messages : MessageType[];
    setSelectedConversation : (conversation : ConversationType) => void;
    setMessages : (messages : MessageType[]) => void;
}
const useConversation = create<ConversationsState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages : [],
    setMessages : (messages) => set({messages : messages}),
}));

export default useConversation;