import React from "react";
import API from "../../utils/API.js";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked
    };
  
    this.handleClick = this.handleClick.bind(this);
  }

//
// componentDidUpdate(prevProps, prevState){
//   if(prevProps.liked !== this.props.liked || prevState.liked !==this.state.liked){
//     this.setState({liked: this.props.liked});
//   }
// }

  handleClick(postid) {

    this.likeunlike(postid);


  }

likeunlike(postid){
  if (!this.state.liked){
    API.like(postid, {currentuser: this.props.currentuser}).then(res=>res.json).catch(err=>console.log(err));

    API.addlike(postid).then(res=>res.json).catch(err=>console.log(err));
    this.setState({liked: true});
  }
  else if (this.state.liked){
    API.unlike(postid, {currentuser: this.props.currentuser}).then(res=>res.json).catch(err=>console.log(err));
    API.removelike(postid).then(res=>res.json).catch(err=>console.log(err));
    this.setState({liked: false});
  }
}
  render() {
    const i = this.state.liked ? 'fa fa-heart' : 'fa fa-heart-o';

    return (
        <span className = "likeybtn"><i className={i} onClick={()=>this.handleClick(this.props.id)}>
        </i>  {this.props.likeCount}</span>

    );
  }
}

export default LikeButton;
