import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';



class Report extends Component {

  state={
 
    inventoryList:[],
    emaillist:[],
    emaillistsongle:"",


}

constructor(props) {
super(props);

}
componentWillMount(){

  let data =  sessionStorage.getItem("UserId");
    
  if(data == 'Viewer'){
    this.props.history.push('/Inventory');
    
    }
  axios.get(`http://localhost:5000/api/Inventory/GetAllInventory/`)
  .then(res => {
    const inventoryList = res.data;
    this.setState({ inventoryList });
  })

}
renderPRDetailDispatchTableForPrint(player)
{
    let tableContent = player === undefined ? null : (
      player.map((player) => {

            return (
              <tr>
              <td>{player.itemName}</td>
              <td>{player.quantity}</td>
              
            </tr>
            
            );
        })
    );   
   // <td>{moment(asset.requestedDate).format("DD/MM/YYYY")}</td>
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
            <div className="row noauto" >
                <div className="col-4"> <label>Generated By:Iman</label> </div>
    <div className="col-4"> <label>Generated Date: {moment().format("DD-MM-YYYY")} </label> </div>
    <div className="col-4"> <label>Generated Time: {moment().format("hh:mm:ss")} </label> </div>
                
            </div> 
        </div>
    );
};

emaillist= () => {

  let email = this.state.emaillist;

  email.push(this.state.emaillistsongle);
  this.setState({
    emaillist:email
  })
window.alert(this.state.emaillistsongle + " is added!");

}

sendEmail = () => {

  console.log(this.state.emaillist);

    // let dataString = this.state.inventoryList.toString();
 
let dataString = this.state.inventoryList.map((val,index) =>{

  return val.itemName + ":" +val.quantity +" ||"
  

})
window.alert(dataString);
  axios.post(`http://localhost:5000/api/Mail/SendMail`,{

  recipients:this.state.emaillist,
  subject:"Report Summary",
  content:dataString.toString()

  })
  .then(res => {
    console.log(res);
    console.log(res.data);
  })

 // window.alert("Email Sent!");
}


    render() {

      let printContents = this.renderPRDetailDispatchTableForPrint(this.state.inventoryList);


      return (
     <div>
       <h2>Summary Report</h2>
       <br/><br/>
       <div>
       {printContents}
       </div>
     <div  id="printContent" hidden>
       {printContents}
     </div> 
     <div>
  
<button type="submit" class="btn btn-info pull-right left" value="Print" onClick={(event) => this.printHandler(event)} ><i class="fa fa-print"></i> Print </button>
  </div>
     <br/> <br/> <br/>
     <p class="email">
             <input name="emaillist" type="emaillist" required  class="feedback-input" id="emaillist" placeholder="Sender Email Address" value={this.state.emaillistsongle} onChange ={(e) => this.setState({emaillistsongle:e.target.value})} />
             </p>
          
                
                 
                  <div >
                    <button type="button" value ="Add"  onClick={this.emaillist} > Add Email</button>
                 </div> 

           <br/>
                 <div >
                    <button type="button" value ="Add" onClick={this.sendEmail} > Send Email</button>
                      
                 </div>


</div>
      );
    }
  }
  
  export default Report;