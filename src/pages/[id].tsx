import { useRouter } from "next/router";
import AppLayout from "@/components/Layouts/AppLayout";
import { NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/currentUser";
import FeedCard from "@/components/FeedCard";
import { Post } from "@/gql/graphql";
const UserProfilePage: NextPage = ()=>{
    const router = useRouter();
    const {user} = useCurrentUser();
    return (
        <div>
            <AppLayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BsArrowLeftShort className="text-4xl" />
                        <div>
                            <h1 className="text-2xl font-bold">
                                {user?.firstName} {user?.lastName}
                            </h1>
                            <h1 className="text-md font-bold text-slate-500">
                                {user?.posts?.length}
                            </h1>
                        </div>
                    </nav>
                    <div className="p-4 border">
                        {user?.profileImg && <Image src={user?.profileImg} alt="user-image" height={150} width={150} className="rounded-full"/>}
                        <h1 className="text-2xl font-bold mt-5">{user?.firstName} {user?.lastName}</h1>
                    </div>
                    <div>
                        {user?.posts?.map((post)=> <FeedCard data={post as Post} key={post?.id}/>)}
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}
export default UserProfilePage