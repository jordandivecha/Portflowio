import axios from "axios";

export default {

  userFindByEmail: function(email) {

    return axios.get("/api/profile/"+email);
  },
  userFindById: function(userid) {

    return axios.get("/api/profile/"+userid);
  },

  userUpdate: function(userid, object){
    console.log(userid);
    return axios.post("/api/profile/"+userid, object);
  },

  userCreate: function(userobj) {

      return axios.post("/api/profile", userobj);
  },

  postCreate: function (postobj){

      return axios.post("/api/post", postobj);
  },

  getAllPosts: function (){
    return axios.get("/api/post");
  }

};
