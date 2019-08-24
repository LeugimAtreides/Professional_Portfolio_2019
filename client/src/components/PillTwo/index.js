import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Bio from "../../pages/Bio";
import Contact from "../../pages/Contact";
import Projects from "../../pages/Projects";
// import Card from "../../components/Card";
import "./style.css";

class PillTwo extends Component {
  render() {
    return (
      <Router>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills nav-justified">
              <li className="nav-item">
                <NavLink
                  onClick={this.toggleNav}
                  className={
                    window.location.pathname === "/bio"
                      ? "nav-link one active center-router"
                      : "nav-link one center-router"
                  }
                  to="/bio"
                >
                  <span className="fontPill">Bio</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.toggleNav}
                  className={
                    window.location.pathname === "/projects"
                      ? "nav-link two active center-router"
                      : "nav-link two center-router"
                  }
                  to="/projects"
                >
                 <span className="fontPill">Projects</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.toggleNav}
                  className={
                    window.location.pathname === "/contact"
                      ? "nav-link three active center-router"
                      : "nav-link three center-router"
                  }
                  to="/contact"
                >
                 <span className="fontPill">Contact</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="tab-content thingy">
            {/* <div className="tab-pane fade" role="tabpanel"> */}
              <Switch>
                <Route exact path="/bio" component={Bio} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/contact" component={Contact} />
              </Switch>
            {/* </div> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default PillTwo;
