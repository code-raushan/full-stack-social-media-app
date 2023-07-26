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
)
