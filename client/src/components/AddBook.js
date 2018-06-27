import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Button, Input } from 'antd'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            bookName: '',
            genre: '',
            authorId: ''
        }
    }

    render() {
        const data = this.props.getAuthorsQuery
        return (
            <div style={{ display: 'flex' }}>
                <Input
                    value={this.state.bookName}
                    onChange={(e) => { this.setState({ bookName: e.target.value }) }}
                    placeholder="book name"
                    style={{ width: '100px', height: '20px' }}
                    type="text"
                />
                <Input
                    value={this.state.genre}
                    onChange={(e) => { this.setState({ genre: e.target.value }) }}
                    placeholder="genre"
                    style={{ marginLeft: '5px', width: '100px', height: '20px' }}
                    type="text"
                />
                <select onChange={(e) => { this.setState({ authorId: e.target.value }) }}
                    value={this.state.authorId}
                    style={{ marginLeft: '5px', width: '100px', height: '26px', background: '#c4c4d5' }}>
                    <option key="" value="">select author-</option>
                    {data.authors && data.authors.map((author, i) => {
                        return <option key={i} value={author.id}>{author.name}</option>
                    })}
                </select>
                <Button
                    style={{ marginLeft: '5px', background: '#c4c4d5' }}
                    onClick={this.onAddBook}>
                    Add Book
                </Button>
            </div>
        )
    }

    onAddBook = () => {
        this.props.addBookMutation({
            variables: {
                name: this.state.bookName,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        }).then(
            resp => {
                this.setState({
                    bookName: '',
                    genre: '',
                    authorId: ''
                })
            }
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)