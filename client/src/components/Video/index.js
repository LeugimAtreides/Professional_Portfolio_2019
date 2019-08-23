import React, { Component } from "react";
import videoSource from "../../assets/video/portfolio-video-background.mov";
import "./style.css"

class Video extends Component {
   render() {
       return (
           <video autoPlay muted loop id="bgvid">
               <source src={videoSource} type="video/mov" />
           </video>
       )
   }
}

export default Video; 