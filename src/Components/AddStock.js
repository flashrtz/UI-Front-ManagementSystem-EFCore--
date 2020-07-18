import React, { Component } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import * as ReactBootStrap from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import { BrowserRouter as Router,withRouter, Switch, Route, Link } from 'react-router-dom';

class AddStock extends Component {

state={

  id:"",
  itemName:"",
  qty:"",
  stockList:[],
  me: [],
  isbutton:false,

}

componentWillMount(){
 
  

   // fetch('https://api.mydomain.com')
      // .then(response => response.json())
      // .then(data => this.setState({ stockList:data }));
      axios.get(`http://localhost:5000/api/Inventory/GetAllInventory/`)
      .then(res => {
        const stockList = res.data;
        this.setState({ stockList });
      })



     let data =  sessionStorage.getItem("UserId");
    
    if(data == 'Viewer'){
      this.props.history.push('/Inventory');
      
      }


}

quantity = (e) =>{

  this.setState({
      qty : e.target.value,
  });

}

itemName = (e) =>{

  this.setState({
    itemName : e.target.value,
  });

}

//add Item

addItem = () => {
 
 
      axios.post('http://localhost:5000/api/Inventory/Insert/', {

        id:0,
        itemName : this.state.itemName,
        quantity : this.state.qty,
     
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  


}

formItemEditHandler = (id) =>{
  
  this.state.stockList.map((item) => {
    if (id == item.id) {

        this.setState({
            id: item.id,
           itemName:item.itemName,
           qty:item.quantity,
           isbutton:true
        });

    }

  });

}

editItem = () => {
  
  // e.preventDefault();
 
  axios.post('http://localhost:5000/api/Inventory/Update/',{
    id: this.state.id,
    itemName:this.state.itemName,
    quantity:this.state.qty
     
  })
  .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
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
                          <p className="text text-info">Are you sure you want to delete this Stock?</p>
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


  formItemDelHandler = () => {
    
    var id = this.state.id;
    axios.post(`http://localhost:5000/api/Inventory/Delete/?id=${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    
  }

renderGrid(player)
{
    let tableContent = player === undefined ? null : (
      player.map((item) => {

            return (
              <tr key = {item.id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td><a title="Edit " onClick={(event) => this.formItemEditHandler(item.id)} ><i className="i class="i class="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a></td>
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
                    <th>Item Name</th>
                    <th>Quantity</th>
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


  render() {

    let printContents = this.renderGrid(this.state.stockList);

    return (

<>
<div>
       
  <div id="form-main">
    <div id="form-div">
        <form >
            <p class="email">
             <input name="itemName" type="itemName" required  class="feedback-input" id="itemName" placeholder="Item Name" value={this.state.itemName} onChange ={(e) => {this.itemName(e)}} />
             </p>
             <p class="email">
             <input name="quantity" type="quantity" required  class="feedback-input" id="quantity" placeholder="Quantity" value={this.state.qty} onChange ={(e) => {this.quantity(e)}} />
             </p>
          
                
                 
                 <div class="submit" hidden={!this.state.isbutton}>
                    <button type="button" value ="Add" class="button-blue" onClick={this.editItem} > Edit</button>
                 </div>

            
                 <div class="submit" hidden ={this.state.isbutton}>
                    <button type="button" value ="Add" class="button-blue" onClick={this.addItem} > Add</button>
                      
                 </div>
        </form>
        </div>  <div>
        <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/>
<ReactBootStrap.Table striped bordered hover>
  
  {printContents}
 
</ReactBootStrap.Table>

     {/* <div  id="printContent" hidden>
       {printContents}
     </div> */}
    </div>  
  </div>
</div>
</>
    );
  }
}

export default AddStock;