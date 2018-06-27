import React, { Component } from "react";
import { graphql } from "react-apollo";
// import { Alert } from 'antd'
import { getBookQuery } from '../queries/queries'

class BookDetail extends Component {
    render() {
        const data = this.props.data
        const books = this.props.bookId && !data.loading && data.book.author.books.map((book, i) => {
            return book.name
        })
        return (
            <div>{
                this.props.bookId && !data.loading && (
                    <div>
                        <b><span>Book Detail</span></b>
                        <div >
                            <div>Name: {data.book.name}</div>
                            <div>Genre: {data.book.genre}</div>
                            <div>Author:-</div>
                            <div>Name: {data.book.author.name}</div>
                            <div>Age: {data.book.author.age}</div>
                            <div>Books: {books.toString()}</div>
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail)