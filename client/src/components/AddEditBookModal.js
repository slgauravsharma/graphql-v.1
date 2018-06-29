import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Input, Select, Modal, message } from "antd";
import {
  getAuthorsQuery,
  addEditBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddEditBookModal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      bookName: "",
      genre: "",
      authorId: "",
      bookId: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const bookData = nextProps.bookData;
    this.setState({
      bookName: nextProps.isEditMode ? bookData.name : "",
      genre: nextProps.isEditMode ? bookData.genre : "",
      authorId: nextProps.isEditMode ? bookData.author.id : "",
      bookId: nextProps.isEditMode ? bookData.id : ""
    });
  }

  render() {
    const data = this.props.getAuthorsQuery;
    return (
      <div>
        <Modal
          title={this.props.isEditMode ? "Edit Book" : "Add Book"}
          visible={this.props.showModal}
          onOk={() => {
            this.onSaveBook();
          }}
          onCancel={() => {
            this.props.closeModal();
          }}
        >
          <div>
            <div style={{ marginBottom: "5px" }}>
              <span> Book Name: </span>
              <Input
                value={this.state.bookName}
                onChange={e => {
                  this.setState({ bookName: e.target.value });
                }}
                placeholder="book name"
                style={{ width: "260px" }}
                type="text"
              />
            </div>
            <div style={{ marginBottom: "5px" }}>
              <span style={{ marginRight: "7%" }}>Genre:</span>
              <Input
                value={this.state.genre}
                onChange={e => {
                  this.setState({ genre: e.target.value });
                }}
                placeholder="genre"
                style={{ marginLeft: "5px", width: "260px" }}
                type="text"
              />
            </div>
            <div style={{ marginBottom: "5px" }}>
              <span style={{ marginRight: "6.5%" }}>Author:</span>
              <Select
                onChange={val => {
                  this.setState({ authorId: val });
                }}
                value={this.state.authorId}
                style={{ marginLeft: "5px", width: "260px" }}
              >
                <Select.Option key="" value="">
                  Select author{" "}
                </Select.Option>
                {data.authors &&
                  data.authors.map((author, i) => {
                    return (
                      <Select.Option key={i} value={author.id}>
                        {author.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  onSaveBook = () => {
    this.props
      .addEditBookMutation({
        variables: {
          name: this.state.bookName,
          genre: this.state.genre,
          authorId: this.state.authorId,
          bookId: this.state.bookId
        },
        refetchQueries: [{ query: getBooksQuery }]
      })
      .then(resp => {
        this.setState({ bookName: "", genre: "", authorId: "" });
        message.success(
          !this.props.isEditMode
            ? "Book added successfully"
            : "Book updated successfully"
        );
        this.props.closeModal();
      });
  };
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addEditBookMutation, { name: "addEditBookMutation" })
)(AddEditBookModal);
