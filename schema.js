import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from "./resolvers.js";
const typeDefs = `type Author {
    id: String
    age: Int
    name: String
    books: [String]
 }
    type Query {
        authors: [Author]
        authorsAge(age: Int): [Author]
        author(id: String): Author
    }

    type Mutation {
        addAuthor(name: String!, age: Int!, books: [String]!): Author
        deleteAuthor(id: String!): Author
        updateAuthor(id: String!, name: String!): Author
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export default schema;
