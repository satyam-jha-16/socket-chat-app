import { Separator } from "../ui/separator";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchUser from "./SearchUser";

const Sidebar = () => {
    return (
        <div className="">
            <div>
                <div className="flex justify-center items-center p-3 ">
                    <SearchUser />
                </div>
                <Separator />
                <Conversations />
            </div>
            <div className="flex align-center justify-center mb-4">
                <LogoutButton />
            </div>
        </div>
    )
};
export default Sidebar;