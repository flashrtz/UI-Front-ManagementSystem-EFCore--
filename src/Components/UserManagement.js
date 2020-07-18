import React, { Component } from 'react';
import SimpleImageSlider from 'react-simple-image-slider'
import * as ReactBootStrap from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {CommonGet, CommonPost,CommonUpdateById} from "../config";
import axios from 'axios';


class UserManagement extends Component {


state = {

      id:"",
      employeeName:"",
      category:"",
      empCode:"",
      userList:[],
      isLoaded:false,
      password:"",
      isbutton:false,
}


componentWillMount(){
    let data =  sessionStorage.getItem("UserId");
    
    if(data == 'Viewer' ){
      this.props.history.push('/Inventory');
      
      }
      if(data == 'Manager'){
        this.props.history.push('/AddStock');
        
        }
    axios.get(`http://localhost:5000/api/UserManagement/GetAllUsers/`)
    .then(res => {
      const userList = res.data;
      this.setState({ userList });
    })

}

employeeName = (e) =>{
  
      this.setState({
          employeeName : e.target.value,
      });
    
    }
    
    
    
empCode = (e) =>{
    
      this.setState({
            empCode : e.target.value,
      });
}

password = (e) =>{
    
    this.setState({
        password : e.target.value,
    });
}


formItemDeleteHandler = (id) => {
    this.setState({
        id:id
    })
      confirmAlert({
          customUI: ({ onClose }) => {
              return (
                  <div className='custom-ui'>
                      <center className="wellb">
                          <h3 className="text text-danger text20">Confirm to Delete</h3>
                          <p className="text text-info">Are you sure you want to disable this User?</p>
                          <br />
                          <button className="btn btn-info" onClick={onClose}>No</button>
                          <button type="submit"
                              className="btn btn-warning m20"
                              onClick={() => {
                                
                                this.formItemDelHandler();
                                  onClose();
                              }}>
                              Yes, Delete it!
                          </button>
                      </center>
                  </div>
              );
          }
      });
  };


addItem=()=> {

      var obj= {};

      obj.employeeName = this.state.employeeName;
      obj.employeeNumber = this.state.empCode;
      obj.category = this.state.category;

     
      axios.post('http://localhost:5000/api/UserManagement/Insert/', {
        id:0,
        employeeName : this.state.employeeName,
        employeeNumber : this.state.empCode,
        category : this.state.category,
        password :this.state.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  
  
     
  }

  editItem = () => {
  
    axios.post('http://localhost:5000/api/UserManagement/Update/',{
        id:this.state.id,
        employeeName : this.state.employeeName,
        employeeNumber : this.state.empCode,
        category : this.state.category,
        password:this.state.password,
       
    })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    

  }

  formItemDelHandler = () => {
    
    var id = this.state.id;
    axios.post(`http://localhost:5000/api/UserManagement/Delete/?id=${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  formItemEditHandler = (id) =>{

    this.state.userList.filter((item)=>{
        if(item.id == id){
            return item
        }
    })
    .map((item) => {

        this.setState({
            id:item.id,
            employeeName:item.employeeName,
            empCode:item.employeeNumber,
            category:item.category,
            isbutton :true

        })

    })


  }

  renderGrid(player)
  {
      let tableContent = player === undefined ? null : (
        player.map((item) => {
  
              return (
                <tr key = {item.id}>
                <td>{item.employeeName}</td>
                <td>{item.employeeNumber}</td>
                <td>{item.category}</td>
            
                <td><a title="Edit " onClick={(event) => this.formItemEditHandler(item.id)} ><i className="i class="i class="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i></a></td>
                <td><a title="Delete " onClick={(event) => this.formItemDeleteHandler(item.id)} ><i className="fa fa-trash fa-2x fore-color-cyan icon-blue"></i> </a></td>
            </tr>
              
              
              );
          })
      );   
      return(
          <div class="table-responsive" style={{ overflow: "hidden" }}>
              <table id="example1" className="table table-condensed tfont" style={{ fontSize: "12" }}>
                  <thead>
                      <tr>
                      <th>Employee Name</th>
                      <th>Employeee Number</th>
                      <th>Designation</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                      {tableContent}
                  </tbody>
              </table>
              <br/><br/><br/><br/>
          </div>
      );
  };
  

  resetHandler = () => {


    this.setState({

        id:"",
        employeeName:"",
        category:"",
        empCode:"",
        password:"",
        isbutton:false,

    })

  }



render() {

      let printContents = this.renderGrid(this.state.userList);

       
      return (

<>
<div id="form-main">
    <div id="form-div">
        <form >
             
           
            <p class="email">
            
             <input name="employeeName" type="employeeName" required  class="feedback-input" id="employeeName" placeholder="Employee Name" value={this.state.employeeName} onChange ={(e) => {this.employeeName(e)}} />
             </p>
            
             <p class="email">
            
            <input name="empCode" type="empCode" required  class="feedback-input" id="empCode" placeholder="Employee Number" value={this.state.empCode} onChange ={(e) => {this.empCode(e)}} />
            </p>
            
            <p class="email">
            
            <input name="emppassword" type="password" required  class="feedback-input" id="password" placeholder="Employee Password" value={this.state.password} onChange ={(e) => {this.password(e)}} />
            </p>
         
            <p class="Category">
                            <select id="category" name="category"  value={this.state.category} onChange={(e) => this.setState({ category:e.target.value})}>
                                <option value="-1">-Select the Type-</option>
                                <option value="1">Manager</option>
                                <option value="2">Viewer</option>
                            </select>
        
            </p>
            
                 <div class="submit" hidden={!this.state.isbutton}>
                    <button type="button" value ="Add" class="button-blue" onClick={this.editItem} > Edit</button>
                 </div>

            
                 <div class="submit" hidden ={this.state.isbutton}>
                    <button type="button" value ="Add" class="button-blue" onClick={this.addItem} > Add</button>
                      
                 </div>
        </form>
        </div>  
          <div>
        <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/>
<ReactBootStrap.Table striped bordered hover>

  {printContents}

</ReactBootStrap.Table>
<div class="submit">
                    <button type="button" value ="Add" class="button-blue" onClick={this.resetHandler} > Clear</button>
                      
                 </div>
     {/* <div  id="printContent" hidden>
       {printContents}
     </div> */}
</div>  
    </div>
 
</>
 
      );
    }
  }
  
  export default UserManagement;