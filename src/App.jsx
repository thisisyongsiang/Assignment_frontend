import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CustomerList from "./CustomerList";
import OrderList from "./OrderList";
import ItemList from "./ItemList";
import LoginButton from "./auth0/loginButton";
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from "./auth0/logoutButton";
import Wrapper from "./auth0/wrapper";
import { withAuth0 } from '@auth0/auth0-react';
import userEvent from "@testing-library/user-event";

const apiUrl = process.env.REACT_APP_APIURL;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={navActive:null};
    this.userExists=false;

  }
  navClickHandler=(navSelected)=>{
    this.setState({navActive:navSelected})
  }

  componentDidUpdate(){
    this.addUser();
  }
  async addUser(){
    if (this.props.auth0.user && !this.userExists){
      let userExists = await this.userExistsOnServer(this.props.auth0.user.email);
      if (!userExists){
        await this.addUserToServer({
          name:this.props.auth0.user.name,
          email:this.props.auth0.user.email
        })
      }
      this.userExists=true;
    }
  }
  async addUserToServer(user) {
    await fetch(apiUrl + "customer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
  async userExistsOnServer(email){
      let response=await fetch(apiUrl+'customer/email?cid='+email,{method:"GET"});
      let resJson=await response.json();
      if (!resJson)return false;
      if(resJson.length===0)return false;
      return true;
  }

  render() {
    const {user, isAuthenticated,isLoading } = this.props.auth0;
    return (
      <div className="container p-2">
        <div className="row" >
        <h1 onLoad={this.onAuthenticated}>The Shop</h1>
        <ul className="nav nav-tabs" id='headerbar'>
          <li className="nav-item">
            <button className={this.state.navActive==='items'?'nav-link active':'nav-link'} 
            onClick={()=>{this.navClickHandler('items')}} disabled={!isAuthenticated}>
              <h4>Items</h4>
            </button>
          </li>
          <li className="nav-item">
            <button className={this.state.navActive==='customers'?'nav-link active':'nav-link'} 
            onClick={()=>{this.navClickHandler('customers')}} disabled={!isAuthenticated}>
              <h4>Customers</h4>
            </button>
          </li>
          <li className="nav-item">
            <button className={this.state.navActive==='orders'?'nav-link active':'nav-link'} 
            onClick={()=>{this.navClickHandler('orders')}} disabled={!isAuthenticated}>
              <h4>Orders</h4>
            </button>
          </li>
          <li className="nav-item">
            <button className={this.state.navActive==='all'?'nav-link active':'nav-link'} 
            onClick={()=>{this.navClickHandler('all')}} disabled={!isAuthenticated}>
              <h4>All</h4>
            </button>
          </li>
          <div id="userAuthButton">
          <LogoutButton />
          </div>
        </ul>
        <div className="row">
          {isAuthenticated &&<div className="col-xs-12"> 
          <br />
          <h4>Welcome {user.name}</h4>
          <h5 className="text-muted">{user.email}</h5>
          </div>}
          <div className="col-xs-12 text-center" >
            <br />
            <Wrapper />
            <div id="LoginButton">
            {(!isAuthenticated &&!isLoading)&& <LoginButton />}
            </div>
          </div>
        </div>
        </div>
        {(this.state.navActive==='items' ||this.state.navActive==='all') && <ItemList />}
        {(this.state.navActive==='customers' ||this.state.navActive==='all') && <CustomerList />}
        {(this.state.navActive==='orders' ||this.state.navActive==='all') && <OrderList />}

      </div>
    );
  }
}
export default withAuth0(App);
