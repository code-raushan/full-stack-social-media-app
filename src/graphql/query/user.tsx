import { graphql } from "../../gql";

export const VerifyGoogleToken = graphql(`#graphql
    query VerifyGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
}
`)
