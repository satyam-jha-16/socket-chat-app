'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EmptyMessage from "@/components/messages/EmptyMessage";
import MessageContainer from "@/components/messages/MessageContiner";
import Conversations from "@/components/sidebar/Conversations";
import LogoutButton from "@/components/sidebar/LogoutButton";
import SearchUser from "@/components/sidebar/SearchUser";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authUser, setAuthUser, isLoading } = useAuthContext();

  // console.log("auth user ", authUser);
  const router = useRouter();

  if(!authUser && !isLoading){
    router.push('/auth/login');
  }
  return (
    <div>
      {
        isLoading ? <div className = 'grid place-center justify-center items-center pt-10'><div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div> :
          authUser ? (
            <main className="border">
              <MaxWidthWrapper >
                <div className="flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg h-dvh">
                  <div className="w-1/3 mt-7 mb-20 bg-white shadow-xl flex flex-col justify-between h-min rounded-lg ">
                    <Sidebar />
                  </div>
                  <div className="mt-7 w-2/3 bg-white p-6 border-solid shadow-lg border-black">
                    {/* <MainContent /> */}
                    <MessageContainer />
                  </div>
                </div>
              </MaxWidthWrapper>
            </main>

          ) : (
            <div className = 'flex flex-col justify-center items-center pt-10'>
              <div className="w-6 h-6 border-2 p-5 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className = "text-2xl pt-10">
              Hold up while we redirect you to the Login Page </p>
            </div>
            
          )
      }
    </div>
  );
}
