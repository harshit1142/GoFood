import React from "react";
import  ReactDOM from "react-dom";

const MODAL_STYLES ={
    position:'relative',
    top:'0%',
    left:'0%',
    backgroundColor:'',
    transform:'translate(10%,0%)',
    zIndex:10,
    height:'90%',
    width:'90%',
    overflowY:'scroll'
}
const OVERLAY_STYLES ={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'black',
    transform:'translate(0%,10%)',
    zIndex:10,
    height:"100%",
    width:"100%"
}

export default function Model({children,onClose}){
   return ReactDOM.createPortal(
   <>
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <button className="btn btn-danger fs-4" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    </>,
    document.getElementById("cart-root")
   )
}