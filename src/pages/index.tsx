import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GoogleLogin } from "@react-oauth/google";
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
import FeedCard from "@/components/FeedCard";
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
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-32">
        <div className="col-span-3 ">
          <div className="ml-[-5px] text-3xl text-blue-600 flex flex-row items-center gap-4 mt-1 p-2 hover:bg-gray-100 h-fit w-fit rounded-full transition-all">
            <TbSocial />
          </div>
          <div>
            <ul className="mt-4 flex flex-col ">
              {AppSideBarItems.map((item) => (
                <li
                  className="flex flex-row gap-3 items-center mb-4 hover:bg-gray-200 h-fit w-fit px-2 py-2 rounded-full transition-all"
                  key={item.title}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xl ">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-1 pr-6">
            <button className="bg-blue-500 text-xl p-3 text-white w-full rounded-full">
              Post
            </button>
          </div>
        </div>
        <div className="col-span-5 border-l-2 border-r-2 h-screen overflow-scroll no-scrollbar border-gray-200 dark:border-gray-400">
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
          <div className=" px-4 py-8 space-y-2">
            <h1 className="font-semibold">New to Socialo?</h1>
            <GoogleLogin onSuccess={(cred) => console.log(cred)} />
          </div>
        </div>
      </div>
    </div>
  );
}
