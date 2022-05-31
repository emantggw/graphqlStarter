import logo from './logo.svg';
import './App.css';

import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import Categories from './Components/GetCategories';


const errorLink = onError(({graphqlErrors, networkError})=>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      console.log(`Grahpql error ${message}`)
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:6001/graphql"})
])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})
function App() {
  return <ApolloProvider client={client}>
    <Categories/>
  </ApolloProvider>
}

export default App;
