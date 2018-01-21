// will require cards
import "./Home.css";
import React from  "react";

class Home extends React.Component {
  constructor(props){
    super(props);
this.state = {
  loggedin: props.auth

};}

button =() => {
  if (this.state.loggedin){
  return( <button type="button" className="btn btn-info"onClick={this.props.authlogout}>Logout</button>);
  }
  else{
    return(<button type="button" className="btn btn-info"onClick={this.props.authlogin}>Login</button>);

  }
}
  render(){
    return(
      <div>
      {this.button()}
    </div>
      )

  }
}
export default Home;
