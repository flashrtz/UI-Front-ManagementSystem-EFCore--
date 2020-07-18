import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';

import { BrowserRouter as Router,withRouter, Switch, Route, Link } from 'react-router-dom';
class Inventory extends Component {

state={

  itemName:"",
  quantity:"",
  inventoryList:[],

}


componentWillMount(){

  axios.get(`http://localhost:5000/api/Inventory/GetAllInventory/`)
  .then(res => {
    const inventoryList = res.data;
    this.setState({ inventoryList });
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

    let printContents = this.renderGrid(this.state.inventoryList);

    return (


      <>
   <div>
      
<ReactBootStrap.Table striped bordered hover>
  
  {printContents}

</ReactBootStrap.Table>

     {/* <div  id="printContent" hidden>
       {printContents}
     </div> */}
</div>   
  
       </>

    );
  }
}

export default Inventory;