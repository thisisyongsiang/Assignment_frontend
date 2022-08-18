import React from "react";

const apiUrl = process.env.REACT_APP_APIURL;
class EditCustomerForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={name:this.props.dataObj.name,
                    email:this.props.dataObj.email};
        this.initEmail=this.props.dataObj.email;
    }
    async editCustomerOnServer(customer){
        let custJson=JSON.stringify(customer);
        console.log(custJson);
        let response=await fetch(`${apiUrl}customer/email`,
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
        if (this.state.name && this.state.email) {
            let customer = {
                name: this.state.name,
                email: this.state.email,
            };
            this.editCustomerOnServer(customer);
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
                <label htmlFor="" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id='name' value={this.state.name} onChange={this.handleChange} />
                </div>
            </div>

            <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}
export default EditCustomerForm;