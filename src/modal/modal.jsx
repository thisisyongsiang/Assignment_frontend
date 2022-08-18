import React from "react";
import ReactDOM  from "react-dom";
import FocusTrap from "focus-trap-react";
import EditCustomerForm from "./editCustomer";
import EditItemForm from "./editItem";
import EditOrderForm from "./editOrder";
class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        console.log(this.props.formType);
        return( ReactDOM.createPortal(
            <FocusTrap>
                <aside className="modal-cover" 
                onClick={this.props.onClickOutside}
                onKeyDown={this.props.onKeyDown}
                >
                <div className="modal-area" ref={this.props.modalRef}>
                <button className="btn-close _modal-close"
                onClick={this.props.closeModal}
                ref={this.props.buttonRef}></button>

                <div className="container modal-body">
                    {this.props.formType==='customer'?                    
                            <EditCustomerForm dataObj={this.props.dataObj}
                            refreshFunc={this.props.refreshFunc}
                            closeModal={this.props.closeModal}/>:null}
                    {this.props.formType==='item'?                    
                            <EditItemForm dataObj={this.props.dataObj}
                            refreshFunc={this.props.refreshFunc}
                            closeModal={this.props.closeModal}/>:null}
                    {this.props.formType==='order'?                    
                            <EditOrderForm dataObj={this.props.dataObj}
                            refreshFunc={this.props.refreshFunc}
                            closeModal={this.props.closeModal}/>:null}
                </div>

                </div>
                </aside>
            </FocusTrap>,
            document.body
        
        )
        );
    }
}

export default Modal;