import React, { Component } from 'react';
// import Button from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ImageUploader from 'react-images-upload';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component{

     
   state={

            id:0,
            isModalOpen:false,
            categoryAnswer1:"",
            firstname:"",
            lastname:"",
            username:"",
            password:"",
            cfpassword:"",


            surveyList:[],
            pictures: [] ,


}

constructor(props) {
    super(props);
      
    }
componentWillUpdate() {

  axios.get(`http://localhost:5000/api/UserManagement/GetAllUsers/`)
    .then(res => {
      const userList = res.data;
      this.setState({ userList });
    })

}

handleOnChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);

}

validateUser(name,password){
  var isFound = false;

      this.state.userList.map((user) => {
         if(user.employeeNumber == name && user.password == password && user.category == "2"){
            window.sessionStorage.setItem("UserId","Viewer");
            isFound=true
            
         }
         else if(user.employeeNumber == name && user.password == password && user.category =="1"){

          window.sessionStorage.setItem("UserId","Manager");
          isFound=true
         }
         else if("admin" == name  &&  "admin" == password){

          window.sessionStorage.setItem("UserId","admin");
          isFound=true
         }
         else{
          isFound=false
         }


         if(isFound == true){
            return true
         }
         else {
           return false
         }

      });
    }
handleOnClick = () => {

  var isValid = false;
  isValid = this.validateUser(this.state.username,this.state.password);
  let checkuser = window.sessionStorage.getItem("UserId");
  if(checkuser == 'admin'){

   // console.log(this.state.username+this.state.password+"OK");
    this.props.history.push('/UserManagement');

   
  }
  else if (checkuser == 'Manager') {

    this.props.history.push('/AddStock');
  } 
  else if(checkuser == 'Viewer'){
    this.props.history.push('/Inventory');
  }
  else{
    window.alert("Invalid Credentials!")
  }
}

render() {

    const myStyle = {
        width: "400px",
     };

    return (
       <Router>
 <>
        <h1> LOGIN </h1> <br/>
        <div class="d-flex justify-content-center">
        <Form style={myStyle}>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" placeholder="Employee Number" name="username" value={this.state.username} onChange={this.handleOnChange} required/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleOnChange} required/>
        </Form.Group>

        </Form>
        </div>

        <br/>
        
        <br/> <br/>

        <Button variant="primary" type="submit" onClick = {this.handleOnClick}>
           LOGIN
        </Button>
 </>
 </Router>
 );
 }
 }

 
 