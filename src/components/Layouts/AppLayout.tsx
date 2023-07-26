import React, { useCallback, useMemo, useState } from "react";
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
import Link from "next/link";
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
  link: string;
}


const AppLayout: React.FC<AppLayoutProps> = (props) => {

  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const AppSideBarItems: AppSideBar[] = useMemo(() => [
    {
      title: "Home",
      icon: <BiHomeCircle />,
      link: "/"
    },
    {
      title: "Explore",
      icon: <BiSearchAlt2 />,
      link: "/"

    },
    {
      title: "Notifications",
      icon: <IoMdNotifications />,
      link: "/"

    },
    {
      title: "Messages",
      icon: <BiSolidEnvelope />,
      link: "/"

    },
    {
      title: "Bookmarks",
      icon: <BsBookmarksFill />,
      link: "/"

    },
    {
      title: "Profile",
      icon: <CgProfile />,
      link: `/${user?.id}`

    },
    {
      title: "More",
      icon: <BiDotsHorizontalRounded />,
      link: "/"

    },
  ], [user])



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
    <div className="grid grid-cols-12 h-screen w-screen overflow-hidden px-8 md:px-32">
      <div className="relative col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-16">
        <div>
          <div className="ml-[-5px] text-3xl text-blue-600 flex flex-row items-center gap-4 mt-1 p-2 hover:bg-gray-100 h-fit w-fit rounded-full transition-all">
            <TbSocial />
          </div>
          <div>
            <ul className="mt-4 flex flex-col ">
              {AppSideBarItems.map((item) => (
                <li
                  key={item.title}

                >
                  <Link href={item.link}
                    className="flex flex-row gap-3 items-center mb-2 hover:bg-gray-200 h-fit w-fit px-3 py-2 rounded-full transition-all"
                  >

                    <span className="text-2xl sm:lg">{item.icon}</span>
                    <span className="text-lg hidden sm:inline ">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-1 pr-16">
            <button className="hidden sm:block bg-blue-500 text-xl px-1 py-2 text-white w-3/4 rounded-full">
              Post
            </button>
          </div>
        </div>


        {user && (
          <div className="absolute bottom-4 flex flex-col sm:flex-row gap-3 items-center hover:bg-gray-300 pr-14 sm:pr-10 py-3 rounded-lg transition-all ease-in">
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
            <div className="invisible sm:visible">
              {user && <h1 className="font-semibold">{user.firstName}</h1>}
              {user && <h1 className="font-semibold">{user.lastName}</h1>}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-10 sm:col-span-5 border-r border-l h-screen overflow-scroll no-scrollbar border-gray-200">
        {props.children}
      </div>

      <div className="col-span-0 sm:col-span-3 p-5 ">
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
