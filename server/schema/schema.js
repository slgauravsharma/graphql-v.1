import graphql from "graphql";
import { find, filter } from "lodash";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean
} from "graphql";
import mongoose from "mongoose";
import { FilterRootFields } from "graphql-tools";
import Author from "../models/author";
import Book from "../models/book";

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
    },
    isDeleted: { type: GraphQLBoolean }
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
        return Book.findById(args.id);
      }
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return Book.find({ isDeleted: false });
      }
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent, args) {
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
          const book = new Book({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId
          });
          return book.save();
        }
      }
    },
    deleteBook: {
      type: bookType,
      args: {
        bookId: { type: GraphQLString }
      },
      resolve(parent, args) {
        const id = args.bookId;
        return Book.findOne({ _id: args.bookId })
          .then(res => {
            // if (res) {
            //   return Book.remove({ _id: args.bookId }, (err, resp) => {
            //     if (!err) {
            //       return resp;
            //     } else {
            //       throw "NO_BOOK_FOUND";
            //     }
            //   }).catch(err => {
            //     throw err;
            //   });
            // } else {
            //   return "Book not present this id";
            // }
            if (res) {
              return Book.findByIdAndUpdate(
                id,
                { $set: { isDeleted: true } },
                {},
                (err, resp) => {
                  if (err) {
                    throw err;
                  }
                  return resp;
                }
              );
            } else {
              throw "Book not present this id";
            }
          })
          .catch(err => {
            return err;
          });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation
});
export default schema;
