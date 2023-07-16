import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

// we can make use this graphql client to make requests.
export const graphqlClient = new GraphQLClient(
  "http://localhost:8000/graphql",
  {
    headers: () => ({
        Authorization: isClient
          ? `Bearer ${window.localStorage.getItem("__app_token")}`
          : "",
      }),
  }
);
