import React from "react";

const apiUrl = process.env.REACT_APP_APIURL;
class EditItemForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={name:this.props.dataObj.name,
            price:this.props.dataObj.price};
    }
    async editItemOnServer(item){
        let custJson=JSON.stringify(item);
        console.log(custJson);
        let response=await fetch(`${apiUrl}item/id`,
        {method:'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body:custJson});
        if (response.status === 200) {
            this.props.refreshFunc();
            this.props.closeModal();
          }
    }
    onSubmit=()=>{
        if (this.state.name && this.state.price) {
            let item = {
                name: this.state.name,
                price: this.state.price,
                id:this.props.dataObj.id
            };
            this.editItemOnServer(item);
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
                <label htmlFor="" className="col-sm-2 col-form-label">Item Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id='name' value={this.state.name} onChange={this.handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="" className="col-sm-2 col-form-label">Item Price</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id='price' value={this.state.price} onChange={this.handleChange} />
                </div>
            </div>
            <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}
export default EditItemForm;