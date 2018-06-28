import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Table, Icon, Tooltip } from "antd";
import { getBooksQuery } from "../queries/queries";
import BookDetail from "./BookDetail";
import AddEditBookModal from "./AddEditBookModal";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: {},
      selectedBookId: null,
      showModal: false,
      isEditMode: false
    };
  }

  render() {
    const columns = [
      {
        title: "Book Name",
        dataIndex: "name",
        key: "name",
        className: "center",
        width: 150
      },
      {
        title: "Genre",
        dataIndex: "genre",
        key: "genre",
        className: "center",
        width: 150
      },
      {
        title: "Action",
        dataIndex: "",
        key: "",
        className: "center",
        render: rowData => onAction(rowData),
        width: 150
      }
    ];
    const onAction = rowData => {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Icon
            type="edit"
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              this.setState({
                showModal: true,
                isEditMode: true,
                bookData: rowData
              });
            }}
          />
          <Icon
            type="delete"
            style={{ color: "red", marginLeft: "20px", cursor: "pointer" }}
            onClick={() => {}}
          />
        </div>
      );
    };
    const selectedBook = this.state.selectedBook;
    const selBookId = selectedBook && selectedBook.id;
    return (
      <div>
        <center>
          <Tooltip title="Add Book">
            <Icon
              style={{ color: "green", cursor: "pointer" }}
              type="plus-circle-o"
              onClick={() => {
                this.setState({ showModal: true, isEditMode: false });
              }}
            />
          </Tooltip>
        </center>
        <div style={{ display: "flex" }}>
          <Table
            onRow={rData => {
              return {
                onClick: () => {
                  this.setState({ selectedBook: rData });
                }
              };
            }}
            style={{ width: "50%", marginTop: "5px" }}
            rowKey={y => y.id}
            columns={columns}
            pagination={false}
            dataSource={this.props.data.loading ? [] : this.props.data.books}
          />
          <BookDetail style={{ width: "50%" }} bookId={selBookId} />
          <AddEditBookModal
            bookData={this.state.bookData}
            isEditMode={this.state.isEditMode}
            showModal={this.state.showModal}
            closeModal={this.closeModal}
          />
        </div>
      </div>
    );
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };
}

export default graphql(getBooksQuery)(BookList);
