import React from "react";


class LinkBuilder extends React.Component {
  constructor (props){
    super(props);
  };


linker (props) {
  if (this.props.href.startsWith('https://') || this.props.href.startsWith('http://' || this.props.href.startsWith('mailto'))){
    return (
      <a id = {this.props.id} href = {this.props.href}><i className = {this.props.i}></i>{this.props.title}</a>
    );
  }
  else{

    return(

      <a id = {this.props.id} href = {'https://'+this.props.href} > <i className = {this.props.i}></i>{this.props.title}</a>
    );
  }
}

render(){
  if (this.props.href){
  return(

    this.linker()
  )
}
else {
  return (null)
}
}
};

export default LinkBuilder;
