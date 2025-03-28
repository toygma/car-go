import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_REACT_APP_BASE_URL,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_REACT_GRAPHQL_WS_URI,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;

export const clearApolloCache = async () => {
  try {
    await client.clearStore();
  } catch (error) {
    console.error("Apollo Cache temizlenirken hata oluştu:", error);
  }
};
