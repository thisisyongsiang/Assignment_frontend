import { render } from "@testing-library/react";
import React from "react";
import Container from "./modal/container";
const apiUrl = process.env.REACT_APP_APIURL;

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputid: "", inputname: "", inputprice: "" };
  }
  async addItemToServer(item) {
    let response = await fetch(apiUrl + "item/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    let data = await response.json();
    if (response.status === 200) {
      this.props.getItemsFromServer();
      this.setState({ inputid: "", inputname: "", inputprice: "" });
    }
  }
  clickHandler = () => {
    if (this.state.inputname && this.state.inputid && this.state.inputprice) {
      if (this.state.inputid.length !== 6) {
        alert("Item ID must be length of 6 characters");
        return;
      }
      if (this.state.inputprice <= 0) {
        alert("Price must be positive and non-zero");
        return;
      }
      let item = {
        name: this.state.inputname,
        id: this.state.inputid,
        price: this.state.inputprice,
      };
      this.addItemToServer(item);
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
            Item Name
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
          <label htmlFor="inputprice" className="col-sm-1 col-form-label">
            Item Price
          </label>
          <div className="col-sm-5">
            <input
              type="number"
              className="form-control"
              id="inputprice"
              value={this.state.inputprice}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="inputid" className="col-sm-1 col-form-label">
            Item ID
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

        <div className="col-xs-12">
          <button className="btn btn-primary" onClick={this.clickHandler}>
            Add Item to List
          </button>
        </div>
      </div>
    );
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], addingItem: false };
    this.getItemsFromServer = this.getItemsFromServer.bind(this);
  }
  componentDidMount() {
    this.getItemsFromServer();
  }

  async getItemsFromServer() {
    let response = await fetch(apiUrl + "item/all", { method: "GET" });
    let items = await response.json();
    this.setState({ items: items });
  }
  async deleteItemFromServer(itemId) {
    let response = await fetch(apiUrl + `item/id?itemid=${itemId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      this.getItemsFromServer();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Items </h3>
          <button
            className={
              !this.state.addingItem ? "btn btn-primary" : "btn btn-secondary"
            }
            onClick={() =>
              this.setState({ addingItem: !this.state.addingItem })
            }
          >
            {!this.state.addingItem ? "Add Item" : "Cancel Adding"}
          </button>
          {this.state.addingItem && (
            <AddItem getItemsFromServer={this.getItemsFromServer} />
          )}
          <br />
          <br />
          {this.state.items.map((item, index) => {
            return (
              <div className="card" key={item.id}>
                <div className="card-body">
                  <div className="row row-2" id="cornerbuttons">
                  <Container buttonText='Edit'
                    formType='item'
                    dataObj={item}
                    refreshFunc={this.getItemsFromServer}/>
                    <button
                      className="btn btn-danger col m-1"
                      onClick={() => {
                        this.deleteItemFromServer(item.id);
                      }}
                    >
                      Delete Item
                    </button>
                  </div>

                  <h6 className="card-title">Item name : {item.name}</h6>
                  <div className="card-text">
                    <h6>Item price : ${item.price}</h6>
                    <h6>Item id : {item.id}</h6>
                  </div>
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

export default ItemList;
