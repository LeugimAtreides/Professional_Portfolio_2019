import React from "react";
import logo from "../../assets/img/logo/homelogo.png/";

function Logo() {
    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <img src={logo} alt="center logo" className="img-fluid z-depth-1" />
            </div>
        </div>
    )
}

export default Logo;