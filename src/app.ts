import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import {PingResolver} from './resolvers/ping'
import { ProductoResolver } from './resolvers/ProductResolver'
import {buildSchema} from 'type-graphql'

export async function startSever() {
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers:[PingResolver, ProductoResolver]
        }),
        context:({req,res})=>({req,res})
    })

server.applyMiddleware({app, path:'/graphql'})

return app;
}

