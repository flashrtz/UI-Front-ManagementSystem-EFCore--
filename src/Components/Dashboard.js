import React, { Component } from 'react';
import SimpleImageSlider from 'react-simple-image-slider'


class Dashboard extends Component {

componentWillMount(){

sessionStorage.setItem("UserId","GG");

if(sessionStorage.getItem("UserId") != "admin"){

  this.props.history.push('/')
}

}


    render() {

       
      return (

<>
</>
 
      );
    }
  }
  
  export default Dashboard;