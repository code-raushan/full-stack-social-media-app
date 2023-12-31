import { graphql } from '../../gql'
export const getAllPostsQuery = graphql(`#graphql
    query GetAllPosts {

        getAllPosts {
        id
        content
        imageURL
        author {
            id
            firstName
            lastName
            profileImg
        }
        }
}
`);

export const getSignedURLForPostQuery = graphql(`
    
    query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForPost(imageName: $imageName, imageType: $imageType)
    }
`)