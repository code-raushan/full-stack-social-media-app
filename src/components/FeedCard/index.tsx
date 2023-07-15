import {FC} from "react";
import Image from "next/image";
import {BsChat} from "react-icons/bs"
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai"
import {BiUpload} from "react-icons/bi"



const FeedCard: FC = () => {
  return (
    <div className="border px-2 py-2 hover:bg-gray-100 transition-all">
      <div className="grid grid-cols-12 space-x-2">
        <div className="col-span-1 rounded-full">
          <Image src={"https://avatars.githubusercontent.com/u/109172929?v=4"} alt="user-mage" height={50} width={50} className="rounded-full"/>
        </div>
        <div className="col-span-11">
          <p className="font-semibold">Raushan Kumar</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque neque obcaecati reiciendis recusandae laudantium.</p>
          <div className="flex flex-row justify-between mt-4 pr-12">
            <div className="cursor-pointer"><BsChat /></div>
            <div className="cursor-pointer"><AiOutlineRetweet /></div>
            <div className="cursor-pointer"><AiOutlineHeart /></div>
            <div className="cursor-pointer"><BiUpload /></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FeedCard;
