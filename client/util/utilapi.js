import axios from "axios";

export default {
  getUser: function() {
    return axios.get("/apis/User");
  },
  saveUser: function(getData) {
    return axios.post("/apis/User", getData);
  },

  deleteUser: function(id) {
    return axios.delete("/apis/User/" + id);
  }

};