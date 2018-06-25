import graphql from 'graphql';
import { find } from 'lodash'

import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } from 'graphql'
import { FilterRootFields } from 'graphql-tools';

// dummy data 
const books = [
    {name: 'The World', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'Rock', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'Blind women', genre: 'SC-FI', id: '3', authorId: '3'},
    {name: 'Old King', genre: 'He-Sha', id: '4', authorId: '4'},
    {name: 'Black Night', genre: 'Fantasy', id: '5', authorId: '1'},
    {name: 'Sun', genre: 'Fantasy', id: '6', authorId: '2'},
]

const authors = [
    {name: 'James', age: 44, id: '1'},
    {name: 'Juli', age: 36, id: '2'},
    {name: 'Kim', age: 56, id: '3'},
    {name: 'Cheoge', age: 56, id: '4'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
            return find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery
})
export default schema