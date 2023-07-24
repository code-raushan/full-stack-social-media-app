import React, { useCallback, useState } from "react";
import { TbSocial } from "react-icons/tb";
import {
  BiHomeCircle,
  BiSearchAlt2,
  BiSolidEnvelope,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { BsBookmarksFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { VerifyGoogleToken } from "@/graphql/query/user";
import { graphqlClient } from "@/clients/api";
import { useCurrentUser } from "@/hooks/currentUser";
import { useQueryClient } from "@tanstack/react-query";



interface AppLayoutProps {
    children: React.ReactNode;
}


interface AppSideBar {
    title: string;
    icon: React.ReactNode;
  }
  
  const AppSideBarItems: AppSideBar[] = [
    {
      title: "Home",
      icon: <BiHomeCircle />,
    },
    {
      title: "Explore",
      icon: <BiSearchAlt2 />,
    },
    {
      title: "Notifications",
      icon: <IoMdNotifications />,
    },
    {
      title: "Messages",
      icon: <BiSolidEnvelope />,
    },
    {
      title: "Bookmarks",
      icon: <BsBookmarksFill />,
    },
    {
      title: "Profile",
      icon: <CgProfile />,
    },
    {
      title: "More",
      icon: <BiDotsHorizontalRounded />,
    },
  ];

const AppLayout: React.FC<AppLayoutProps> = (props) => {
    const { user } = useCurrentUser();
  const queryClient = useQueryClient();


  const handleGoogleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      console.log(googleToken);
      if (!googleToken) throw new Error("token does not exist");

      // sending the graphql request to the backend server, with the token that we have received from google oauth2
      const { verifyGoogleToken } = await graphqlClient.request(
        VerifyGoogleToken,
        { token: googleToken }
      );
      console.log(verifyGoogleToken);
      toast.success("User Signed In");
      if (verifyGoogleToken) {
        window.localStorage.setItem("__app_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries(["CURRENT_USER"]);
    },
    [queryClient]
  );


    return (
        <div className="grid grid-cols-12 h-screen w-screen px-32">
            <div className="relative col-span-3">
                <div className="ml-[-5px] text-3xl text-blue-600 flex flex-row items-center gap-4 mt-1 p-2 hover:bg-gray-100 h-fit w-fit rounded-full transition-all">
                    <TbSocial />
                </div>
                <div>
                    <ul className="mt-4 flex flex-col ">
                        {AppSideBarItems.map((item) => (
                            <li
                                className="flex flex-row gap-3 items-center mb-2 hover:bg-gray-200 h-fit w-fit px-3 py-2 rounded-full transition-all"
                                key={item.title}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-lg ">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-1 pr-16">
                    <button className="bg-blue-500 text-xl px-1 py-2 text-white w-3/4 rounded-full">
                        Post
                    </button>
                </div>
                {user && (
                    <div className="absolute bottom-1 flex gap-3 items-center hover:bg-gray-300 px-4 py-3 rounded-lg transition-all ease-in">
                        <div>
                            {user && user.profileImg && (
                                <Image
                                    src={user.profileImg}
                                    height={50}
                                    width={50}
                                    className="rounded-full"
                                    alt="user-img"
                                />
                            )}
                        </div>
                        <div>
                            {user && <h1 className="font-semibold">{user.firstName}</h1>}
                            {user && <h1 className="font-semibold">{user.lastName}</h1>}
                        </div>
                    </div>
                )}
            </div>
            {props.children}
            <div className="col-span-4 ">
                {!user && (
                    <div className=" px-4 py-8 space-y-2">
                        <h1 className="font-semibold">New to Socialo?</h1>
                        <GoogleLogin onSuccess={handleGoogleLogin} />
                    </div>
                )}
            </div>
        </div>

    );
};
export default AppLayout;
