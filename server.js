import express from "express";
import cors from "cors";
import {graphqlHTTP } from "express-graphql";

import { GraphQLSchema, GraphQLObjectType, buildSchema } from "graphql";

import restaurantData  from './mock_data.json' assert {type: 'json'};
const quotesData = [
    {id: 1, title: "Never forget the one you made you you!", by: "Thomas.S"},
    {id: 2, title: "You first", by: "Ayelle.M"}, 
    {id: 3, title: "Say No!", by: "Marry"},
    {id: 4, title:"Keep your head down", by: "Fikru"}]

var schema = buildSchema(`
    type Query{
        categories: [Restaurant]
        category(code: String!): Restaurant
        quotes: [Quote]
        quote(id: Int!): Quote
        
    },
    
    type Quote{
        id: Int
        title: String, 
        by: String
    },

    type Mutation{
        addNewQuote(id: Int!, title: String!, by: String): Quote
    },
    type Restaurant{
        code: String,
        name: String,
        category: String,
        qty: Int,
        price: Float,
        childrens: [Restaurant]
        childrensCount: Int,
    }
    
`);


const getRestaurantData = ()=>restaurantData.map((res)=>{
        res['childrensCount'] = res.childrens.length;
        return res;
    });
const getSpecificCategory = (args)=>{
    return restaurantData.find((res)=>res.code===args.code);
}
const getQuotes = ()=>{
    return quotesData;
}
const getQuote = (args)=>{
    return quotesData.find((quote)=>quote.id===args.id);
}
const addNewQuote = (args)=>{
    
    quotesData.push({id: args.id, title: args.title, by: args.by});
    return quotesData.find((quote)=>quote.id==args.id);
}

//Root resolver
const root = {
    categories: getRestaurantData,
    category: getSpecificCategory,
    quote: getQuote,
    quotes: getQuotes,
    addNewQuote: addNewQuote,
}


const app = express();
app.use(cors());
app.use('/graphql',  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));



app.listen(6001, ()=>console.log("Server running at 6001"));