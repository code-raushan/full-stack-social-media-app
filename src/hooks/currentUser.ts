import { graphqlClient } from '@/clients/api';
import { useCurrentUserInfo } from '@/graphql/query/user';
import {useQuery} from '@tanstack/react-query';

export const useCurrentUser = () =>{
    const query = useQuery({
        queryKey: ["CURRENT_USER"],
        queryFn: ()=> graphqlClient.request(useCurrentUserInfo)
    })
    return {...query, user:query.data?.getCurrentUser}
}