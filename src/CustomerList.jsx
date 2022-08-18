import React from "react";
import Container from "./modal/container";
const apiUrl = process.env.REACT_APP_APIURL;
class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputname: "", inputemail: "" };
  }
  async addItemToServer(item) {
    let response = await fetch(apiUrl + "customer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.status === 200) {
      this.props.getCustomers();
      this.setState({ inputname: "", inputemail: "" });
    }
  }
  clickHandler = () => {
    if (this.state.inputname && this.state.inputemail) {
      let customer = {
        name: this.state.inputname,
        email: this.state.inputemail,
      };
      this.addItemToServer(customer);
    }
  };
  handleChange = (event) => {
    let target = event.target;
    this.setState({
      [target.id]: target.value,
    });
  };
  render() {
    return (
      <div className="row pt-3">
        <h5>Add Item</h5>
        <div className="mb-3 row">
          <label htmlFor="inputname" className="col-sm-1 col-form-label">
            Customer Name
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputname"
              value={this.state.inputname}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="inputemail" className="col-sm-1 col-form-label">
            Customer Email
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputemail"
              value={this.state.inputemail}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="col-xs-12">
          <button className="btn btn-primary" onClick={this.clickHandler}>
            Add Customer to List
          </button>
        </div>
      </div>
    );
  }
}
class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customerItems: [],
      selectedIndex: -1,
      addingItem: false,
    };
    this.getCustomers=this.getCustomers.bind(this);
  }

  async getCustomers() {
    let response = await fetch(apiUrl + "customer/all", { method: "GET" });
    let data = await response.json();
    this.setState({ customers: data });
  }

  componentDidMount() {
    this.getCustomers();
  }
  onSelectCust(custEmail, index) {
    if (index != this.state.selectedIndex) {
      this.getCustomerBoughtItems(custEmail, index);
    } else {
      this.setState({
        customerItems: [],
        selectedIndex: -1,
      });
    }
  }
  async getCustomerBoughtItems(custEmail, index) {
    let response = await fetch(
      apiUrl + `customer/email/items?cid=${custEmail}`
    );
    let data = await response.json();
    this.setState({ customerItems: data, selectedIndex: index });
  }
  async deleteCustomerFromServer(custEmail) {
    let response = await fetch(apiUrl + `customer/email?cid=${custEmail}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      this.getCustomers();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Customers </h3>
          <button
            className={
              !this.state.addingItem ? "btn btn-primary" : "btn btn-secondary"
            }
            onClick={() =>
              this.setState({ addingItem: !this.state.addingItem })
            }
          >
            {!this.state.addingItem ? "Add Customer" : "Cancel Adding"}
          </button>
          {this.state.addingItem && (
            <AddCustomer getCustomers={this.getCustomers} />
          )}
          <br />
          <br />
          {this.state.customers.map((customer, index) => {
            return (
              <div className="card" key={customer.email}>
                <div className="card-body">
                  <div className="row row-2" id="cornerbuttons">
                    <Container buttonText='Edit'
                    formType='customer'
                    dataObj={customer}
                    refreshFunc={this.getCustomers}/>
                    <button
                      className="btn btn-danger col m-1"
                      onClick={() => {this.deleteCustomerFromServer(customer.email)}}
                    >
                      Delete
                    </button>
                  </div>
                  <h6 className="card-title">{customer.name}</h6>
                  <h6 className="card-subtitle text-muted">{customer.email}</h6>
                  <a
                    href="#"
                    className="stretched-link"
                    data-toggle="tooltip"
                    title="Display Items Bought"
                    onClick={(event) => {
                      event.preventDefault();
                      this.onSelectCust(customer.email, index);
                    }}
                  ></a>
                  <ItemsDisplay
                    toDisplay={index === this.state.selectedIndex}
                    items={this.state.customerItems}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <br />
      </div>
    );
  }
}

function ItemsDisplay(props) {
  if (props.toDisplay) {
    if (props.items.length > 0) {
      return (
        <div>
          <br />
          <h6 className="card-title">Purchased Items</h6>
          {props.items.map((item) => {
            return (
              <div className="card" key={item.id}>
                <div className="card-body">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="card-text">
                    price : ${item.price}
                    <br />
                    total quantity : {item.totalQuantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h6 className="card-title">No Items Purchased</h6>
        </div>
      );
    }
  }
}

export default CustomerList;
