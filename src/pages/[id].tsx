import { useRouter } from "next/router";
import AppLayout from "@/components/Layouts/AppLayout";
import { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/currentUser";
import FeedCard from "@/components/FeedCard";
import { Post, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";


interface ServerProps {
    user?: User
}

const UserProfilePage: NextPage<ServerProps> = (props)=>{
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
                                {props.user?.firstName} {props.user?.lastName}
                            </h1>
                            <h1 className="text-md font-bold text-slate-500">
                                {props.user?.posts?.length}
                            </h1>
                        </div>
                    </nav>
                    <div className="p-4 border">
                        {props.user?.profileImg && <Image src={props.user?.profileImg} alt="user-image" height={150} width={150} className="rounded-full"/>}
                        <h1 className="text-2xl font-bold mt-5">{props.user?.firstName} {props.user?.lastName}</h1>
                    </div>
                    <div>
                        {props.user?.posts?.map((post)=> <FeedCard data={post as Post} key={post?.id}/>)}
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async(context)=>{
    const id = context.query.id as string | undefined;
    if(!id) return {notFound: true, props: {user: undefined}}
    const user = await graphqlClient.request(getUserByIdQuery, {id});

    if(!user?.getUserById) return {notFound: true}

    console.log(id);
    return {
        props:{
            user: user.getUserById as User
        }
    }
}

export default UserProfilePage