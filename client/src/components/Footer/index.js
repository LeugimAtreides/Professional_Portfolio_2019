import React from "react";


// Icons or Logos
import facebookLogo from "../../assets/img/icons/facebook-icon.jpg";
import gitHubLogo from "../../assets/img/icons/github.png";
import linkedInLogo from "../../assets/img/icons/linkedin.png";
import stackOverFlowLogo from "../../assets/img/icons/stackover2.png";



function Footer() {
    return (
        <footer className="page-footer font-small black pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-12 mt-md-0 mt-3">

                        {/* Content */}

                        <h5 className="text-uppercase">Website by M.E. Villarreal</h5>
                        <p>For more information on working with us here at Villarreal Web Designs please visit our contact us page</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-12 mb-md-0 mb-3">

                        <h5 className="text-uppercase">Reach out!</h5>
                    </div>

                    <div className="col-md-12 mb-md-0 mb-3">

                        <a className="navbar-brand" href="https://www.facebook.com/Villarreal-Web-Designs-472584256858091/?modal=admin_todo_tour">
                            <img src={facebookLogo} alt="Facebook Logo" />
                        </a>

                        <a className="navbar-brand" href="https://github.com/LeugimAtreides">
                            <img src={gitHubLogo} alt="GitHub Logo" />
                        </a>

                        <a className="navbar-brand" href="https://www.linkedin.com/in/miguel-villarreal-90b271b1/">
                            <img src={linkedInLogo} alt="LinkedIn Logo" />
                        </a>

                        <a className="navbar-brand" href="https://stackoverflow.com/users/11558771/miguel-villarreal">
                            <img src={stackOverFlowLogo} alt="Stack Overflow Logo" />
                        </a>

                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div class="footer-copyright text-center py-3">
                © 2019 Copyright: Villarreal Web Designs
            </div>
        </footer>
    )
}

export default Footer;