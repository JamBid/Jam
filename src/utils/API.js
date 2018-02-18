import axios from "axios";

export default {
  // Gets all books
  getRecentProducts: function() {
    return axios.get("/prod/recent");
  },
  // Gets the product with the given id
  getBook: function(id) {
    return axios.get("/prod/" + id);
  }
};