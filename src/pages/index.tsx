import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { toast } from "react-hot-toast";
import axios from "axios";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { GoFileMedia } from "react-icons/go";

import FeedCard from "@/components/FeedCard";

import { useCurrentUser } from "@/hooks/currentUser";
import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";
import AppLayout from "@/components/Layouts/AppLayout";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllPostsQuery, getSignedURLForPostQuery } from "@/graphql/query/post";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps{
  posts: Post[];
}


export default function Home(props: HomeProps) {
  const [imageURL, setImageURL]=useState("")
  const { user } = useCurrentUser();
  const { posts = props.posts as Post[] } = useGetAllPosts();

  const { mutateAsync } = useCreatePost();

  const [content, setContent] = useState("");

  const handlePostCreate = useCallback(async () => {
    if (user) {
      await mutateAsync({
        content,
        imageURL
      });
      setContent("");
      setImageURL("");
    } else {
      toast.error('Not Authenticated!')
      setContent("")
    }
  }, [user, mutateAsync, content, imageURL]);

  const handleInputChangeFile = useCallback((input: HTMLInputElement)=>{
    return async (event: Event)=>{
      event.preventDefault();
      // console.log(input.files);
      const file:File | null | undefined = input.files?.item(0);
      if(!file) return;
      console.log(file)

      const {getSignedURLForPost} = await graphqlClient.request(getSignedURLForPostQuery, {
        imageName: file.name,
        imageType: file.type
      });

      if(getSignedURLForPost){
        toast.loading("Uploading...", {id: "2"});
        await axios.put(getSignedURLForPost, file, {
          headers:{
            "Content-Type": file.type,
          }
        });
        toast.success("Upload Completed", {id: "2"});
        const url = new URL(getSignedURLForPost);
        const filePath = `${url.origin}${url.pathname}`;
        console.log(filePath);
        setImageURL(filePath);
      }
    }
  }, []);

  const handleImgUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

 
  return (
    <div className={inter.className}>
      <AppLayout>
        <div className="col-span-5 border-l-1 border-r-1 h-screen overflow-scroll no-scrollbar border-gray-200 dark:border-gray-400">
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
                {imageURL && (
                    <Image
                    src={imageURL}
                    alt="tweet-image"
                    width={300}
                    height={300}
                  />
                )}
                
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context)=>{
  const allPosts = await graphqlClient.request(getAllPostsQuery);
  return {
    props: {
      posts: allPosts.getAllPosts as Post[]
    }
  }
}