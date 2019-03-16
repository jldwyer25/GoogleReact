import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Thumbnail from "../components/Thumbnail";


class Books extends Component {
  state = {
  books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
      
       {!this.state.books.length ? (
        <h1 className="text-center">No Books to Display</h1>
      ) : (
        <List>
            {this.state.books.map(item => {
                return (
                    <ListItem key={item.id}>
                        <Container>
                            <Row>
                                <Col size="xs-4 sm-2">
                                    <Thumbnail src={item.image} />
                                </Col>
                                <Col size="xs-8 sm-9">
                                    <h3>{item.title}</h3>
                                    <h4>{item.author}</h4>
                                    <p>Description: {item.description}</p>
                                    <a rel="noreferrer noopener" target="_blank" href={item.link}>
                                        Go to Book!
                                    </a>
                                    <DeleteBtn onClick={() => this.deleteBook(item._id)} />
                                </Col>
                            </Row>
                        </Container>
                    </ListItem>
                );
            })}
             </List>
      )}
      </Container>
    );
  }
}

export default Books;
