import React from "react";
import Container from "./modal/container";


const apiUrl =process.env.REACT_APP_APIURL;

class AddOrder extends React.Component {
    constructor(props) {
      super(props);
      this.state = { inputid: "", inputCustEmail: "", inputItemId: "" , inputQuantity: "", inputAddress: "", inputOrderDate: "", inputShippingDate: ""};
    }
    async addItemToServer(item) {
      let response = await fetch(apiUrl + "shoporder/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.status === 200) {
        this.props.getOrderFromServer();
        this.setState({ inputid: "", inputCustEmail: "", inputItemId: "" , inputQuantity: "", inputAddress: "", inputOrderDate: "", inputShippingDate: "" });
      }
    }
    clickHandler = () => {
      if (this.state.inputid && this.state.inputCustEmail && this.state.inputItemId&& this.state.inputQuantity) {
        if (this.state.inputItemId.length !== 6) {
          alert("Item ID must be length of 6 characters");
          return;
        }
        if (this.state.inputQuantity <= 0) {
          alert("quantity must be positive and non-zero");
          return;
        }

        let order = {
          id: this.state.inputid,
          custEmail: this.state.inputCustEmail,
          itemID: this.state.inputItemId,
          quantity: this.state.inputQuantity,
          address: this.state.inputAddress,
          order_date: this.state.inputOrderDate,
          shipping_date: this.state.inputShippingDate,
        };
        this.addItemToServer(order);
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
            <label htmlFor="inputid" className="col-sm-1 col-form-label">
              Order ID
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="inputid"
                value={this.state.inputid}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputCustEmail" className="col-sm-1 col-form-label">
              Customer Email
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="inputCustEmail"
                value={this.state.inputCustEmail}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputItemId" className="col-sm-1 col-form-label">
              Item ID
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="inputItemId"
                value={this.state.inputItemId}
                onChange={this.handleChange}
              />
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="inputQuantity" className="col-sm-1 col-form-label">
              Quantity
            </label>
            <div className="col-sm-5">
              <input
                type="number"
                className="form-control"
                id="inputQuantity"
                value={this.state.inputQuantity}
                onChange={this.handleChange}
              />
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="inputAddress" className="col-sm-1 col-form-label">
              Address
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                value={this.state.inputAddress}
                onChange={this.handleChange}
              />
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="inputOrderDate" className="col-sm-1 col-form-label">
              Date Of Order
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="inputOrderDate"
                value={this.state.inputOrderDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="inputShippingDate" className="col-sm-1 col-form-label">
              Date of Shipping
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="inputShippingDate"
                value={this.state.inputShippingDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-xs-12">
            <button className="btn btn-primary" onClick={this.clickHandler}>
              Add Order to List
            </button>
          </div>
        </div>
      );
    }
  }
class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state={orders:[],
                addingItem:false};
    this.getOrderFromServer=this.getOrderFromServer.bind(this);
  }
  componentDidMount(){
    this.getOrderFromServer()
  }

  async getOrderFromServer(){
    let response= await fetch(apiUrl+'shoporder/all',{method:'GET'});
    let orders=await response.json();
    this.setState({orders:orders});
  }
  async deleteOrderFromServer(orderId) {
    let response = await fetch(apiUrl + `shoporder/id?orderid=${orderId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      this.getOrderFromServer();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Orders </h3>
          <button
            className={
              !this.state.addingItem ? "btn btn-primary" : "btn btn-secondary"
            }
            onClick={() =>
              this.setState({ addingItem: !this.state.addingItem })
            }
          >
            {!this.state.addingItem ? "Add Order" : "Cancel Adding"}
          </button>
          {this.state.addingItem && (
            <AddOrder getOrderFromServer={this.getOrderFromServer} />
          )}
          <br />
          <br />
          {this.state.orders.map((order, index) => {
            return (
              <div className="card" key={order.id}>
                <div className="card-body">
                <div className="row row-2" id='cornerbuttons'>
                    <Container 
                    dataObj={order} 
                    buttonText='Edit' 
                    formType='order'
                    refreshFunc={this.getOrderFromServer} />
                        <button className="btn btn-danger col m-1" onClick={()=>{this.deleteOrderFromServer(order.id)}}>Delete</button>   
                    </div>
                  <h6 className="card-title">Order id : {order.id}</h6>
                  <hr />
                  <div className="card-text">
                  <div className="row row-cols-6">
                    <div className="col">Customer Email : <br /> {order.custEmail}</div>
                    <div className="col">Order Quantity : <br />{order.quantity}</div>
                    <div className="col">ItemID : <br /> {order.itemID}</div>
                    <div className="col">Address : <br /> {order.address}</div>
                    <div className="col">Order Date : <br /> {order.order_date}</div>
                    <div className="col">Shipping Date : <br /> {order.shipping_date}</div>
                  </div>
                  </div>


                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default OrderList;
