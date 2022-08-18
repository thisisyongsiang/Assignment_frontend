import React from "react";

const apiUrl = process.env.REACT_APP_APIURL;
class EditOrderForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={                
            custEmail: this.props.dataObj.custEmail,
            itemID: this.props.dataObj.itemID,
            quantity: this.props.dataObj.quantity,
            address: this.props.dataObj.address,
            orderDate: this.props.dataObj.order_date,
            shippingDate: this.props.dataObj.shipping_date,};
    }
    async editOrderOnServer(order){
        let objJson=JSON.stringify(order);
        let response=await fetch(`${apiUrl}shoporder/id`,
        {method:'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body:objJson});
        if (response.status === 200) {
            this.props.refreshFunc();
            this.props.closeModal();
          }
    }
    onSubmit=()=>{
        if (this.state.custEmail && this.state.itemID) {
            let order = {
                id: this.props.dataObj.id,
                custEmail: this.state.custEmail,
                itemID: this.state.itemID,
                quantity: this.state.quantity,
                address: this.state.address,
                orderDate: this.state.orderDate,
                shippingDate: this.state.shippingDate,
            };
            this.editOrderOnServer(order);
            }
    }
    handleChange = (event) => {
        let target = event.target;
        this.setState({
          [target.id]: target.value,
        });
      };
    
    render(){
        return(
            <div className="container">
            <h4>Edit Customer</h4>
            <hr />
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Customer Email</label>
                <div className="col-sm-10">
                    <input disabled={true} type="text" className="form-control" id='custEmail' value={this.state.custEmail} onChange={this.handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Item ID</label>
                <div className="col-sm-10">
                    <input type="text" disabled={true}  className="form-control" id='itemID' value={this.state.itemID} onChange={this.handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id='quantity' value={this.state.quantity} onChange={this.handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id='address' value={this.state.address} onChange={this.handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Order Date</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id='orderDate' value={this.state.orderDate} onChange={this.handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Shipping Date</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id='shippingDate' value={this.state.shippingDate} onChange={this.handleChange} />
                </div>
            </div>
            <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}
export default EditOrderForm;