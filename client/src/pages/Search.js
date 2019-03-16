import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { BookList, BookListItem } from "../components/BookList";
import Button from "../components/Button"
import Thumbnail from "../components/Thumbnail";

class Search extends Component {
    state = {
        searchText: "",
        searchResults: [],
    }

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get recipes update the recipes state
        event.preventDefault();
        API.searchBooks(this.state.searchText)
            .then(res => {
                console.log('res', res)
                this.setState({ searchResults: res.data.items })
            })
            .catch(err => console.log(err));
    };

    saveBook = (book) => {
        const bookToSave = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.previewLink,
        }
        API.saveBook(bookToSave);
    }


    render() {
        return (
            <Container fluid>
                <Jumbotron>
                    <h1>What Books Should I Read?</h1>
                </Jumbotron>
                <form>
                    <Input
                        value={this.state.searchText}
                        onChange={this.handleInputChange}
                        name="searchText"
                        placeholder="ENTER BOOK IDIOT"
                    />
                    <FormBtn
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg">
                        Search
                      </FormBtn>
                </form>
                {!this.state.searchResults.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
                <List>
                    {this.state.searchResults.map(item => {
                        return (
                            <ListItem key={item.id}>
                                <Container>
                                    <Row>
                                        <Col size="xs-4 sm-2">
                                            <Thumbnail src={item.volumeInfo.imageLinks.thumbnail} />
                                        </Col>
                                        <Col size="xs-8 sm-9">
                                            <h3>{item.volumeInfo.title}</h3>
                                            <h4>{item.volumeInfo.authors}</h4>
                                            <p>Description: {item.volumeInfo.description}</p>
                                            <a rel="noreferrer noopener" target="_blank" href={item.volumeInfo.previewLink}>
                                                Go to Book!
                                            </a>
                                            <Button onClick={(event)=>{event.preventDefault();
                                                this.saveBook(item)}}>
                                                Save
                                                </Button>
                                        </Col>
                                    </Row>
                                </Container>




                                {/* title={item.volumeInfo.title}
                        author={item.volumeInfo.authors}
                        href={item.volumeInfo.previewLink}
                        description={item.volumeInfo.description}
                        thumbnail={item.volumeInfo.imageLinks.thumbnail}
                        buttonText="Save"
                        buttonFunc={(item)=>this.saveBook(item)} */}
                            </ListItem>
                        );
                    })}
                     </List>
              )}
            </Container>
        );
    }
}

export default Search