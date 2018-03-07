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
  },
  //function to save user account changes
  saveUserChange: function(userInfo, userId){
    return axios.post("/user/update",{userInfo:userInfo,userId:userId});
  },
  //function to signup new user
  signUpNewUser: function(newUser){
    return axios.post("/user/signup",newUser);
  },
  //gets all the questions for a product
  getQuestions: function(prodId){
    return axios.get("/questions/"+prodId);
  },
  //gets all the questions for a product
  getSpecificQuestion: function(qId,pId){
    return axios.get("/questions/"+pId+"/"+qId);
  },
  //gets all the answers for a question
  getAnswers: function(questId){
    return axios.get("/answers/"+questId);
  },
  //gets a specified answer
  getSpecificAnswer: function(questId,answerId){
    return axios.get("/answers/"+questId+"/"+answerId);
  },
  //gets all products based on categories and/or search term
  getProdCategorySearch: function(category,search){
    console.log(category)
    return axios.get("/prod/search",{
      params:{
          category:category,
          search:search
        }
      }
    )
  },
  //gets the highest bid for a product
  getHighestBid: function(prodId){
    return axios.get("/bids",{
      params:{
          prodId:prodId
        }
      }
    )
  },
  //function to get the lat and lon with google api
  getLatLon: function(loc){
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        key:process.env.REACT_APP_GOOGLEMAP,
        address:loc
      }
    });
  },
  //function to get the sell history for a user
  getSellHistory: function(id){
    return axios.get('/user/sellhistory/'+id);
  },
  //function to get the buy history for a user
  getBuyHistory: function(id){
    return axios.get('/user/buyhistory/'+id);
  }
};