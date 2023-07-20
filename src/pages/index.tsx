import React, { useCallback } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { toast } from 'react-hot-toast'
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { TbSocial } from "react-icons/tb";
import {
  BiHomeCircle,
  BiSearchAlt2,
  BiSolidEnvelope,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { GoFileMedia } from "react-icons/go"
import { IoMdNotifications } from "react-icons/io";
import { BsBookmarksFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { graphqlClient } from "@/clients/api";
import { VerifyGoogleToken } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/currentUser";
import { useQueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient()
  const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    console.log(googleToken)
    if (!googleToken) throw new Error('token does not exist');

    // sending the graphql request to the backend server, with the token that we have received from google oauth2
    const { verifyGoogleToken } = await graphqlClient.request(VerifyGoogleToken, { token: googleToken });
    console.log(verifyGoogleToken);
    toast.success("User Signed In");
    if (verifyGoogleToken) {
      window.localStorage.setItem("__app_token", verifyGoogleToken);
    }
    await queryClient.invalidateQueries(["CURRENT_USER"]);
  }, [queryClient]);

  const handleImgUpload = useCallback(() => {
    // const input = document.createElement('input');
    // input.setAttribute('type', 'file');
    // input.setAttribute('accept', 'images/*')
    // input.click();
  }, [])
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-32">
        <div className="relative col-span-3">
          <div className="ml-[-5px] text-3xl text-blue-600 flex flex-row items-center gap-4 mt-1 p-2 hover:bg-gray-100 h-fit w-fit rounded-full transition-all">
            <TbSocial />
          </div>
          <div>
            <ul className="mt-4 flex flex-col ">
              {AppSideBarItems.map((item) => (
                <li
                  className="flex flex-row gap-3 items-center mb-4 hover:bg-gray-200 h-fit w-fit px-3 py-2 rounded-full transition-all"
                  key={item.title}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xl ">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-1 pr-16">
            <button className="bg-blue-500 text-xl px-1 py-2 text-white w-3/4 rounded-full">
              Post
            </button>
          </div>
          {user &&
            <div className="absolute bottom-10 flex gap-3 items-center hover:bg-gray-300 px-4 py-3 rounded-lg transition-all ease-in">
              <div>
                {user && user.profileImg && <Image src={user.profileImg} height={50} width={50} className="rounded-full" alt="user-img" />}
              </div>
              <div>
                {user && <h1 className="font-semibold">{user.firstName}</h1>}
                {user && <h1 className="font-semibold">{user.lastName}</h1>}
              </div>
            </div>
          }
        </div>
        <div className="col-span-5 border-l-2 border-r-2 h-screen overflow-scroll no-scrollbar border-gray-200 dark:border-gray-400">
          <div className="border px-2 py-4">
            <div className="grid grid-cols-12 space-x-2">
              <div className="col-span-1 rounded-full">
                {user?.profileImg && <Image src={user?.profileImg} alt="user-image" height={50} width={50} className="rounded-full" />}
              </div>
              <div className="col-span-11">
                <textarea
                  className="w-full outline-none border-b border-slate-300"
                  placeholder="What's happening?"
                  rows={3}></textarea>
                <div className="flex justify-between px-2 py-1 items-center">
                  <div className="text-blue-600 text-lg">
                    <div>
                      <label htmlFor="fileUpload">
                        <GoFileMedia onClick={handleImgUpload} />
                      </label>
                      <input type="file" className="hidden" name="file" id="fileUpload" />
                    </div>
                  </div>
                  <div>
                    <button className="px-2 py-1 bg-blue-600 text-white border-none  outline-none rounded-lg" >Post</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-4 ">
          {!user && <div className=" px-4 py-8 space-y-2">
            <h1 className="font-semibold">New to Socialo?</h1>
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>}
        </div>
      </div>
    </div>
  );
}
