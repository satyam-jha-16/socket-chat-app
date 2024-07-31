import { Mail } from "lucide-react";

const EmptyMessage = () => {
    return (
        <div className="flex items-center justify-center mt-80">
            <div className="flex flex-col items-center justify-center">
                <Mail size={50} />
                <h1 className="text-blzck text-2xl">
                    Click on a conversation to start chat
                </h1>
            </div>
        </div>
    );
}

export default EmptyMessage;