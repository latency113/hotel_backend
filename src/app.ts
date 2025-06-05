import { yoga } from "@elysiajs/graphql-yoga";
import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { jwt } from '@elysiajs/jwt'
import { routes } from "./routes";
import cors from "@elysiajs/cors";


export const app = new Elysia()
  .use(jwt({ secret: Bun.env.JWT_SECRET! }))
  .decorate('store', {
    user: undefined as { id: string; role: string } | undefined
  })
  .use(routes)
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia documentation",
          version: "0.1.0",
        },
      },
    })
  )
  .use(staticPlugin())
  .use(
    yoga({
      typeDefs: /* GraphQL */ `
        type Query {
          hi: String
        }
      `,
      resolvers: {
        Query: {
          hi: () => "Hello from Elysia",
        },
      },
    })
  )
  .get("/", () => "Hello Elysia")
