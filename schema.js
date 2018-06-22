import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from "./resolvers.js";
const typeDefs = `type Author {
    id: Int
    age: Int
    name: String
    books: [String]
 }
    type Query {
        authors: [Author]
        author(id: Int): Author
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });

export default schema;
