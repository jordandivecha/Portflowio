import axios from "axios";

export default {

  userFindByEmail: function(email) {

    return axios.get("/api/profile/"+email);
  },

  userUpdate: function(id, object){
    console.log('got to API');
    return axios.post("/api/profile/"+id, object);
  },

  userCreate: function(userobj) {

      return axios.post("/api/profile", userobj);
  },

  postCreate: function (postobj){

      return axios.post("/api/post", postobj);
  }

};
