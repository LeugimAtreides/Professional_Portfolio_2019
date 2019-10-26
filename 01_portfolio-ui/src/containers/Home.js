import React, { Component } from 'react';
import VideoBackground from '../components/VideoBackground'
import { Link, Router, Route } from 'react-router-dom';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ready: false
        }
    }

    toggleReadyState = () => {
        this.setState(prevState => ({
            ready: !prevState.ready
        }))
    }

    render() {
        return(
            <div className="home-container">
                <VideoBackground>
                    
                </VideoBackground>
            </div>
        )
    }
}

export default Home