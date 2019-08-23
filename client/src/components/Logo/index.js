import React from "react";
import siteLogo from "../../assets/img/logo/homelogo.png";
import "./style.css";

function Logo() {
    return (
        <div className="row.fluid logo-row">
            <div className="col-md-12 mb-4 text-center">
                <img src={siteLogo} alt="center logo" className="img-fluid logo mt-4" />
            </div>
        </div>
    )
}

export default Logo;