import axios from "axios";

export default {
  // Gets all recent products
  getRecentProducts: function() {
    return axios.get("/prod/recent");
  },
  // Gets the product with the given id
  getProduct: function(id) {
    return axios.get("/prod/" + id);
  },
  //gets a specific user info
  getUser: function(id) {
    return axios.get("/user/" + id);
  },
  //function to get userId
  logUserIn: function(userName, password) {
    return axios.post("/user",{userName:userName, password:password});
  }
};