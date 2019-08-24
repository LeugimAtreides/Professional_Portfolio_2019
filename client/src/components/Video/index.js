import React, { Component } from "react";
import videoSource from "../../assets/video/background2.mp4";
import "./style.css"

class Video extends Component {
   render() {
       return (
           <video autoPlay muted loop id="bgvid">
               <source src={videoSource} type="video/mp4" />
           </video>
       )
   }
}

export default Video; 