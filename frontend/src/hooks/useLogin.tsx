import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username: string, password: string) => {
		try {
			setLoading(true);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
                credentials: "include",
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error);
			setAuthUser(data);
		} catch (error: any) {
			toast({title : error.message});
			return ;
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;