import React, { Component } from "react";
import VideoBackground from "./src/components/VideoBackground";
import Home from "./containers/Home";
import MyLogo from "./src/components/MyLogo";
import WelcomeText from "./src/components/WelcomeText";
import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  componentDidMount = () => {
    setTimeout(this.toggleReadyState, 7000);
  };

  toggleReadyState = () => {
    this.setState(prevState => ({
      ready: !prevState.ready
    }));
  };

  render() {
    return (
      <div className="layout-main">
        <VideoBackground>
          <MyLogo isVisible={false} />
          {this.state.ready ? (<div>
            <WelcomeText />
          </div>) : (<div style={{display: "hidden"}}>
          </div>)}
        </VideoBackground>
      </div>
    );
  }
}

export default Layout;
