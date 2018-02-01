import React from "react";
import API from "../../utils/API.js";
class LikeButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      liked: !this.state.liked
    });


    // update db here, send to your likes
  }

  render() {
    const i = this.state.liked ? 'fa fa-heart' : 'fa fa-heart-o';
    const label = this.state.liked ? 'UNLIKE' : 'LIKE'
    return (
        <span className = "likeybtn"><i className={i} onClick={this.handleClick}>
        </i>{label}</span>

    );
  }
}

export default LikeButton;
