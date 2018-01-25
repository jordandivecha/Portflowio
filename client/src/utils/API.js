import axios from "axios";

export default {

  userFindByEmail: function(email) {

    return axios.get("/api/profile/"+email);
  },

  userUpdate: function(email){
    return axios.post("/api/profile/"+email)
  }

  userCreate: function(userobj) {

      return axios.post("/api/user", userobj);
  },

  postCreate: function (postobj){

      return axios.post("/api/post", postobj);
  }

};
