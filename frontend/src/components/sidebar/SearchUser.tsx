import { Search } from "lucide-react";
import { useState } from "react";

const SearchUser = () =>{
    const [value, setValue] = useState("");
    const handleSearch = () => {
        console.log("value", value);
    }
    return (
        <div className="relative flex justify-center mt-3 items-center">
                        <input
                            placeholder="Search User"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full h-10 pl-5 pr-10 text-base border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500"
                        />
                        <button
                            onClick={() => handleSearch()}
                            className="absolute top-2 right-3 text-neutral-500"
                        >
                             <Search size={20}/>
                        </button>
                    </div>
    )
}

export default SearchUser;  