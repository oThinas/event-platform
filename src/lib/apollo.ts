import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4nmq1f60f3r01xp5j738rd9/master',
  cache: new InMemoryCache()
})