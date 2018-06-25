import mongoose from 'mongoose';
import authorModal from './models/author.js'

// const authors = [
//     {
//       id: 1,
//       name: "Jhon",
//       age: 26,
//       books: ["The Queen"]
//     },
//     {
//       id: 2,
//       name: "James",
//       age: 28,
//       books: ["The House"]
//     },
//     {
//       id: 3,
//       name: "Namine",
//       age: 19,
//       books: ["Lost in space"]
//     }
//   ];
  
  const resolvers = {
    Query: {
      authors: () => {
        // return authors;
        return authorModal.find({}) 
      },
      authorsAge: (root, {age}) => {
        return authorModal.find({age: age}) 
      },
      author: (root, { id }) => {
        // return authors.find(author => author.id === id);
        return authorModal.findOne({id: id})
      },
    },
    Mutation: {
      addAuthor: (root, {name, age, books}) => {
        const author = new authorModal({age: age, name: name, books: books});
        return author.save()
      }, 
      deleteAuthor: (root, {id}) => {
       // return authorModal.remove({id: id});
      return authorModal.findOneAndRemove({id: id})
      },
      updateAuthor: (root, {id, name}) => {
        return authorModal.findOneAndUpdate({id: id}, {name: name});
      }
    }
  };
  
  export default resolvers;
  