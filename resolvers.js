const authors = [
    {
      id: 1,
      name: "Jhon",
      age: 26,
      books: ["The Queen"]
    },
    {
      id: 2,
      name: "James",
      age: 28,
      books: ["The House"]
    },
    {
      id: 3,
      name: "Namine",
      age: 19,
      books: ["Lost in space"]
    }
  ];
  
  const resolvers = {
    Query: {
      authors: () => {
        return authors;
      },
      author: (root, { id }) => {
        return authors.find(author => author.id === id);
      }
    }
  };
  
  export default resolvers;
  