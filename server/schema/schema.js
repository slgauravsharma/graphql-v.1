import graphql from "graphql";
import { find, filter } from "lodash";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from "graphql";
import mongoose from "mongoose";
import { FilterRootFields } from "graphql-tools";
import Author from "../models/author";
import Book from "../models/book";

// // dummy data
// const books = [
//     {name: 'The World', genre: 'Fantasy', id: '1', authorId: '1'},
//     {name: 'Rock', genre: 'Fantasy', id: '2', authorId: '2'},
//     {name: 'Blind women', genre: 'SC-FI', id: '3', authorId: '3'},
//     {name: 'Old King', genre: 'He-Sha', id: '4', authorId: '4'},
//     {name: 'Black Night', genre: 'Fantasy', id: '5', authorId: '1'},
//     {name: 'Sun', genre: 'Fantasy', id: '6', authorId: '2'},
// ]

// const authors = [
//     {name: 'James', age: 44, id: '1'},
//     {name: 'Juli', age: 36, id: '2'},
//     {name: 'Kim', age: 56, id: '3'},
//     {name: 'Cheoge', age: 56, id: '4'}
// ]

const bookType = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: authorType,
      resolve(parent, args) {
        // return find(authors, {id: parent.authorId})
        return Author.findById(parent.authorId);
      }
    }
  })
});

const authorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        // return filter(books, {authorId: parent.id})
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    book: {
      type: bookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return find(books, {id: args.id})
        return Book.findById(args.id);
      }
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //  return find(authors, {id: args.id})
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        //   return books
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent, args) {
        //  return authors
        return Author.find({});
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addAuthor: {
      type: authorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addEditBook: {
      type: bookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
        bookId: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (args.bookId) {
          const id = args.bookId;
          return Book.findOne({ _id: args.bookId })
            .then(res => {
              if (res) {
                return Book.findByIdAndUpdate(
                  id,
                  { $set: args },
                  {},
                  (err, resp) => {
                    if (err) {
                      return err;
                    }
                    return resp;
                  }
                );
              } else {
                throw "NO_BOOK_FOUND";
              }
            })
            .catch(err => {
              return err;
            });
        } else {
          console.log("args-----  ", args);
          const book = new Book({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId
          });
          return book.save();
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation
});
export default schema;
