import axios from "axios";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

export default {

  userFindByEmail: function(email) {

    return axios.get("/api/profile/"+email);
  },
  userFindById: function(userid) {

    return axios.get("/api/profile/"+userid);
  },
  profileFindByEmail: function(username) {

    return axios.get("/user/"+username);
  },


  userUpdate: function(userid, object){
    console.log(userid);
    return axios.post("/api/profile/"+userid, object);
  },

  userCreate: function(userobj) {

      return axios.post("/api/profile", userobj);
  },

  postCreate: function (postobj){

      return axios.post("/api/post/", postobj);
  },

  getAllPosts: function (){
    return axios.get("/api/post/");
  },

  getPostsById: function (userid){
    return axios.get("/api/post/"+userid);
  },

  follow: function (userid, currentuser){
    return axios.post("/user/"+userid, currentuser);
  },

  unfollow: function (userid, currentuser){

    return axios.delete("/user/"+userid, {data: currentuser});
  },
  like: function (postid, currentuser){

    return axios.post('/api/profile/like/'+ postid, currentuser);
  },
  unlike: function(postid, currentuser){

    return axios.delete('/api/profile/like/'+ postid, {data: currentuser});
  },
  addlike: function(postid){

    return axios.post('/api/post/like/'+ postid);
  },
  removelike: function(postid){

    return axios.put('/api/post/like/'+ postid);
  },
  likenotify: function(like, cb){
    socket.on('like', like=> cb(null, 'like'));
    socket.emit('likenotify', 1000);
  }

};
