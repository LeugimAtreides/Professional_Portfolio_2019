import React from "react";
import "./style.css";
// Icons or Logos
// import facebookLogo from "../../assets/img/icons/facebook-icon-v2.jpg";
// import gitHubLogo from "../../assets/img/icons/github.png";
// import linkedInLogo from "../../assets/img/icons/linkedin.png";
// import stackOverFlowLogo from "../../assets/img/icons/stackover2.png";



function Footer() {
    return (
        <footer className="page-footer font-small black fixed-bottom">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-12 mt-md-0 mt-3">

                        {/* Content */}

                        <h5 className="text-uppercase text-center">Website by M.E. Villarreal</h5>
                        <p className="text-center">For more information on working with us here at Villarreal Web Designs please visit our contact us page</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-12 mb-md-0 mb-3">

                        {/* <h5 className="text-uppercase">Reach out!</h5> */}
                    </div>

                    <div className="col-md-12 mb-md-0 mb-3 text-center">

                        <a className="navbar-brand" href="https://www.facebook.com/Villarreal-Web-Designs-472584256858091/?modal=admin_todo_tour">
                            <i className="fab fa-facebook-square"></i>
                        </a>

                        <a className="navbar-brand" href="https://github.com/LeugimAtreides">
                            <i className="fab fa-github-square"></i>
                        </a>

                        <a className="navbar-brand" href="https://www.linkedin.com/in/miguel-villarreal-90b271b1/">
                            <i className="fab fa-linkedin"></i>
                        </a>

                        <a className="navbar-brand footer images" href="https://stackoverflow.com/users/11558771/miguel-villarreal">
                            <i className="fab fa-stack-overflow"></i>
                        </a>

                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-copyright text-center py-3">
                © 2019 Copyright: Villarreal Web Designs
            </div>
        </footer>
    )
}

export default Footer;