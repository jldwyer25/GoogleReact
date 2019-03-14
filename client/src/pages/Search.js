import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import {BookList, BookListItem} from "../components/BookList";

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
                console.log('res',res)
                this.setState({ searchResults: res.data.items })
            })
            .catch(err => console.log(err));
    };

    saveBook = (book) => {
        
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
                <BookList>
                  {this.state.searchResults.map(item => {
                    return (
                      <BookListItem
                        title={item.volumeInfo.title}
                        author={item.volumeInfo.authors}
                        href={item.volumeInfo.previewLink}
                        description={item.volumeInfo.description}
                        thumbnail={item.volumeInfo.imageLinks.thumbnail}
                      />
                    );
                  })}
                </BookList>
            </Container>
        );
    }
}

export default Search