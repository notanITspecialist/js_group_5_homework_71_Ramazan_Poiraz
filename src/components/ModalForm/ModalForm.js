import React from 'react';
import './ModalForm.css'
import Backdrop from "../Backdrop/Backdrop";

const ModalForm = props => {
    return (
        <>
            <div className="Modal" style={{
                opacity: props.show ?'1':'0',
                transform: props.show ? 'translateY(0vw)' : 'translateY(-100vw)'
            }}>
                <span className="ModaTitle">Add dish <button className='ModalButton ModalButtonClose' onClick={props.close}>Close</button> </span>
                <div>{props.children}</div>
            </div>
            <Backdrop show={props.show} close={props.close}/>
        </>
    );
};

export default ModalForm;