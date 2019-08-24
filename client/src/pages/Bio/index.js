import React, { Component } from "react";
import Profile from "../../assets/img/profile/LinkedIn-Profile.jpg";
import Card from "../../components/Card";
import "./style.css";

class Bio extends Component {
  render() {
    return (
      <Card name="About Me">
        <div className="media">
          <img className="d-flex align-self-center mr-3 about-me-pic" height="500" width="auto" src={Profile} alt="" />
          <div className="media-body align-middle">
            {/* <h5 class="mt-0 font-weight-bold">About Me</h5> */}
            <p className="bio-words">     
              <br />
              Hi, My name is Miguel Villarreal, I'm a software developer who specializes in mobile and web development.
              Currently I am a Teaching Assistant with Trilogy at the University of Central Florida Web Development Bootcamp. 
              I'm knowledgeable in all stages of advanced web development including front-end and back-end architecture.
              A lifetime ago I pursued a career in medicine and graduated from the University of Central Florida with a
              Biomedical Sciences degree. Now I'm pursuing a second bachelor's degree in information technology where I hope
              to use my past experiences, my love of medicine, and my new-found love of technology to 
              pave the way for healthcare software of the future
              <br />
              <br />
              {/* I enjoy coding in an assortment of technologies, including
              JavaScript, Node.js, SQL, React.js, Angular.js, MongoDB, and
              Express. I believe that a dilligent work ethic, the ability
              to tackle a problem from multiple viewpoints, and my belief
              that whatever I don't know I will gladly learn has allowed me to 
              be successful in both individual and team environments. */}
            </p>
          </div>
        </div>
      </Card>
    );
  }
}

export default Bio;
