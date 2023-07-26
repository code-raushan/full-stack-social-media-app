import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsChat } from "react-icons/bs";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { Post } from "@/gql/graphql";

interface Props {
  data: Post;
}

const FeedCard: FC<Props> = (props) => {
  const { data } = props;
  return (
    <div className="border px-2 py-2 hover:bg-gray-100 transition-all">
      <div className="grid grid-cols-12 space-x-2">
        <div className="col-span-1 rounded-full">
          {data.author?.profileImg && (
            <Image
              src={data.author?.profileImg}
              alt="user-image"
              height={50}
              width={50}
              className="rounded-full"
            />
          )}
        </div>
        <div className="col-span-11">
          <p className="font-semibold">
            <Link href={`/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </p>
          <p>{data.content}</p>
          <div className="flex flex-row justify-between mt-4 pr-12">
            <div className="cursor-pointer">
              <BsChat />
            </div>
            <div className="cursor-pointer">
              <AiOutlineRetweet />
            </div>
            <div className="cursor-pointer">
              <AiOutlineHeart />
            </div>
            <div className="cursor-pointer">
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
