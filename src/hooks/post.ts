import { graphqlClient } from "@/clients/api"
import { CreatePostData } from "@/gql/graphql";
import { createPostMutation } from "@/graphql/mutation/post";
import { getAllPostsQuery } from "@/graphql/query/post"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast";

export const useGetAllPosts = ()=>{
    const query = useQuery({
        queryKey: ['ALL_POSTS'],
        queryFn: ()=> graphqlClient.request(getAllPostsQuery)
    });
    return {...query, posts: query.data?.getAllPosts}   
}

export const useCreatePost = ()=>{
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (payload: CreatePostData)=> graphqlClient.request(createPostMutation, {
            payload
        }),
        onMutate: ()=>toast.loading("Creating Post", {id: '1'}),
        onSuccess: async ()=>{
            await queryClient.invalidateQueries(['ALL_POSTS']),
            toast.success('Posted', {id: '1'})
        }
    });
    return mutation;

}