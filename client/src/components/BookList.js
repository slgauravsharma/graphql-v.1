import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Table, Button } from 'antd'
import { getBooksQuery } from '../queries/queries'
import BookDetail from './BookDetail';


const onAction = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Button
        type='delete'
        style={{ color: 'black', height: '20px', width: '80px', background: '#c4c4d5', cursor: 'pointer' }}
      >Edit</Button>
      <Button
        type='delete'
        style={{ color: 'red', height: '20px', width: '80px', background: '#c4c4d5', marginLeft: '5px', cursor: 'pointer' }}
      >Remove</Button>
    </div>
  )
}

const columns = [
  {
    title: 'Book Name',
    dataIndex: 'name',
    key: 'name',
    className: 'center',
    width: 200
  },
  {
    title: 'Action',
    dataIndex: '',
    key: '',
    className: 'center',
    render: () => onAction(),
    width: 150
  }
]

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBookId: null
    }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Table
          onRow={(rData) => {
            return {
              onClick: () => {
                this.setState({ selectedBookId: rData.id })
              },
            }
          }}
          style={{ width: '40%', marginTop: '5px' }}
          rowKey={y => y.id}
          columns={columns}
          pagination={false}
          dataSource={this.props.data.loading ? [] : this.props.data.books}
        />
        <BookDetail bookId={this.state.selectedBookId} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
