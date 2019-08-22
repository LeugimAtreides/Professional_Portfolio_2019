import React, { Component } from "react";
import Profile from "../../assets/img/profile/LinkedIn-Profile.jpg";

class Bio extends Component {

    render() {
        return (
            <div class="media">
                <img class="d-flex align-self-center mr-3" src={Profile} alt=""/>
                <div class="media-body">
                    <h5 class="mt-0 font-weight-bold">About Me</h5>
                    <p>
                        I am an experienced web developer and graduate from the University of Central Florida proficient in all stages of advanced web development. Knoledgeable in user interface, testing, and debugging processes.
                        I bring forth expertise in design, installation, testing, and and maintenance of web systems. Equipped with a diverse and promising skill-set.

                        <br />
                        Well versed in an assortment of technologies, including JavaScript, Node.js, SQL, React.js, Angular.js, MongoDB, and Express.
                        I am able to effectively self-manage during independent projects, as well as collaborate in a team setting

                    </p>
                </div>
            </div>
        )
    }
}

export default Bio;