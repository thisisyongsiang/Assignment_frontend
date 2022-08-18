import React from "react";
import Modal from "./modal";
class Container extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShown:false
        };
    }

    showModal = () => {
        this.setState({ isShown: true }, () => {
        this.closeButton.focus();
        this.toggleScrollLock();
        });
    };

    toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
    };

    closeModal = () => {
        this.setState({ isShown: false });
        this.TriggerButton.focus();
        this.toggleScrollLock();
        };
    
    onKeyDown = (event) => {
        if (event.keyCode === 27) {
            this.closeModal();
            }
            };

    onClickOutside = (event) => {
        if (this.modal && this.modal.contains(event.target)) return
        this.closeModal();
    };
    render(){
        return(
            <React.Fragment>
                <button className="btn btn-primary col m-1 " onClick={this.showModal} ref={(n) => (this.TriggerButton = n)}>
                   {this.props.buttonText}
                </button>
            {this.state.isShown?(<Modal
            formType={this.props.formType}
            refreshFunc={this.props.refreshFunc}
            dataObj={this.props.dataObj} 
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            closeModal={this.closeModal}
            onSubmit={this.props.onSubmit}
            modalRef={(n)=>{this.modal=n}}
            buttonRef={(n) => (this.closeButton = n)} 
            />)
            :null}
            </React.Fragment>
        );
    }
}
export default Container;