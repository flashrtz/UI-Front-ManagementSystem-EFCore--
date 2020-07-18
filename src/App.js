import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,withRouter, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import Dashboard from './Components/Dashboard';
import AddStock from './Components/AddStock';
import Report from './Components/Report';
import Login from './Components/Authorization/Login';
import UserManagement from './Components/UserManagement';

class App extends Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
  return (
    <Router>
    <div className="App">
      <div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<div class="p-4 pt-5">
		  		<a href="#" class="img logo rounded-circle mb-5" style={{backgroundImage: "url(../public/images/logo.jpg);"}}></a>
	        <ul class="list-unstyled components mb-5">
	         
            <li>
	              <Link to={'/Inventory'} className="nav-link">Inventory</Link>
	          </li>
            <li>
	              <Link to={'/UserManagement'} className="nav-link">User Management</Link>
	          </li>
            <li>
	              <Link to={'/AddStock'} className="nav-link">Add Stock</Link>
	          </li>
            <li>
              <Link to={'/Report'} className="nav-link">Report</Link>
	           
	          </li>
	         
	        </ul>

	        <div class="footer">
	        	<p>
              Made by Iman Dissanayake for Empite Technologies.
						 </p>
	        </div>

	      </div>
    	</nav>

        
      <div id="content" class="p-4 p-md-5">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fa fa-bars"></i>
              <span class="sr-only">Toggle Menu</span>
            </button>
            <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
              
                <li class="nav-item">
                    <a class="nav-link" href="/Dashboard">LogOut</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
           
              <Route exact path='/Dashboard' component={Dashboard} />
              <Route exact path='/Report' component={Report} />
              <Route exact path='/Inventory' component={Inventory} />
              <Route exact path='/AddStock' component={AddStock} />
              <Route exact path='/UserManagement' component={UserManagement} />
              <Route exact path='/' component={Login} />

        </Switch>
     
      </div>
		</div>
    </div>
    </Router>
  );
}
}
export default App;
