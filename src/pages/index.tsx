import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { toast } from "react-hot-toast";

import { GoFileMedia } from "react-icons/go";

import FeedCard from "@/components/FeedCard";

import { useCurrentUser } from "@/hooks/currentUser";
import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";
import AppLayout from "@/Layouts/AppLayout";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const { user } = useCurrentUser();
  const { posts = [] } = useGetAllPosts();

  const { mutate } = useCreatePost();

  const [content, setContent] = useState("");

  const handlePostCreate = useCallback(async () => {
    if (user) {
      mutate({
        content,
      });
      setContent("")
    } else {
      toast.error('Not Authenticated!')
      setContent("")
    }
  }, [user, content, mutate]);


  const handleImgUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  return (
    <div className={inter.className}>
      <AppLayout>
        <div className="col-span-5 border-l-2 border-r-2 h-screen overflow-scroll no-scrollbar border-gray-200 dark:border-gray-400">
          <div className="border px-2 py-4">
            <div className="grid grid-cols-12 space-x-2">
              <div className="col-span-1 rounded-full">
                {user?.profileImg && (
                  <Image
                    src={user?.profileImg}
                    alt="user-image"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  className="w-full outline-none border-b border-slate-300"
                  placeholder="What's happening?"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-between px-2 py-1 items-center">
                  <div className="text-blue-600 text-lg">
                    <div>
                      <GoFileMedia onClick={handleImgUpload} />
                    </div>
                  </div>
                  <div>
                    <button
                      className="px-2 py-1 bg-blue-600 text-white border-none  outline-none rounded-lg"
                      onClick={handlePostCreate}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {posts &&
            posts.map((post) =>
              post ? <FeedCard key={post?.id} data={post as Post} /> : null
            )}
        </div>
      </AppLayout>
    </div>
  );
}
