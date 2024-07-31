import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {
				method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			setAuthUser(null);
		} catch (error: any) {
			console.error(error.message);
			toast({
                title: "Failed to logout",
            });
			return ;
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;