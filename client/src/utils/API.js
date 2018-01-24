import axios from "axios";

export default {

  userFindByEmail: function(email) {
    console.log('sendin it to the back');
    return axios.get("/api/profile/"+email);
  },


  userCreate: function(userobj) {

      return axios.post("/api/profile", userobj);
  },

  postCreate: function (postobj){

      return axios.post("/api/post", postobj);
  }

};
