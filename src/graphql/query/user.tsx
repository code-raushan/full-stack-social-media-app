import { graphql } from "../../gql";

export const VerifyGoogleToken = graphql(`#graphql
    query VerifyGoogleTokenQuery($token: String!) {
        verifyGoogleToken(token: $token)
}
`)
export const useCurrentUserInfo = graphql(`#graphql
    query GetCurrentUser{
        getCurrentUser{
            id
            email
            firstName
            lastName
            profileImg
            posts {
                id
                imageURL
                content
                author {
                    id
                    firstName
                    lastName
                    profileImg
                } 
            }
        }
    }
    
`
);
export const getUserByIdQuery = graphql(`#graphql
    query GetUserById($id: ID!) {
        getUserById(id: $id){
            id
            firstName
            lastName
            posts{
                id
                imageURL
                content
                author {
                    id
                    firstName
                    lastName
                    profileImg
                }
            }
        }
       
    }
 

`)
