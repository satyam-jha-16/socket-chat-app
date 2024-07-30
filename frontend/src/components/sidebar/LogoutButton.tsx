import useLogout from "@/hooks/useLogout";
import { log } from "console";

const LogoutButton = () => {
    const { logout, loading } = useLogout();
    return (
        <button
        onClick={logout}
        className="w-80 h-12 mt-4 rounded-lg bg-red-600 text-white font-medium flex items-center justify-center"
        disabled={loading}
    >
        {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
            "Logout"
        )}
    </button>
    );
}
export default LogoutButton;