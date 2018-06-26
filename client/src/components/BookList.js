import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

class BookList extends Component {
  listBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading books... </div>;
    } else {
      return data.books.map((book, i) => {
        return <li key={i}> {book.name}</li>;
      });
    }
  }

  render() {
    return (
      <div className="BookList">
        <span>Books</span>
        <ul>{this.listBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
