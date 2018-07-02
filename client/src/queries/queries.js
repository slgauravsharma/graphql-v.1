import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      isDeleted
      author {
        id
        name
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addEditBookMutation = gql`
  mutation(
    $name: String!
    $genre: String!
    $authorId: String!
    $bookId: String
  ) {
    addEditBook(
      name: $name
      genre: $genre
      authorId: $authorId
      bookId: $bookId
    ) {
      name
      id
    }
  }
`;

const deleteBookMutation = gql`
  mutation($bookId: String!) {
    deleteBook(bookId: $bookId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      genre
      name
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

export {
  getBooksQuery,
  getAuthorsQuery,
  addEditBookMutation,
  getBookQuery,
  deleteBookMutation
};
