import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getBooks: function(query) {
    return axios.get("/api/books", { params: { q: query } });
  },
  deleteBook: function(id) {
    return axios.delete(`/api/books/${id}`);
  },
  searchBooks: function(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  }
};
