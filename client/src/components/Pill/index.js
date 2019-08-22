import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import Home from "../../pages/Home";
import Bio from "../../pages/Bio";
import Contact from "../../pages/Contact";
import Projects from "../../pages/Projects";

 
class Pill extends Component {
    render() {
        return (
            <HashRouter>
                <div className="row">
                    <div className="col-md-12 col-lg-8 col-xl-6">
                        <ul className="nav md-pills nav-justified pills-rounded pills-purple-gradient">

                            <li className="nav-item">
                                <NavLink className="nav-link" data-toggle="tab" href="#bio" to="/bio">Bio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" data-toggle="tab" href="#projects" to="/projects">Projects</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" data-toggle="tab" href="#contact" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade" id="bio" role="tabpanel">
                            <Route path="/bio" component={Bio} />
                        </div>
                        <div className="tab-pane fade" id="projects" role="tabpanel">
                            <Route path="/projects" component={Projects} />
                        </div>
                        <div className="tab-pane fade" id="contact" role="tabpanel">
                            <Route path="/contact" component={Contact} />
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Pill;