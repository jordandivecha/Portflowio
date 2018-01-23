import axios from "axios";

export default {

  // userFindByUsername: function(username) {
  //   return axios.get("/api/user/"+ username);
  // },
  // userFindByEmail: function (email){
  //   return axios.get("/api/user/" + email);
  // },

  userCreate: function(userobj) {

      return axios.post("/api/user", userobj);
  }

  postCreate: function (postobj){

      return axios.post ("/api/post", postobj);
  }

};
