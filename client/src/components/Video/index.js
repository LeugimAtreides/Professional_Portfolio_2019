'use strict';

import React, { Component } from "react";

class Video extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: "../../assets/video/portfolio-video-background.mov"
        }
    }

    render () {
        return (
            <video className="video-fluid z-depth-1" loop muted autoPlay>
                <source src={this.state.videoURL} type="video/mov" />
            </video>
        )
    }
}

export default Video; 