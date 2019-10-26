import React, { Component } from "react";
import LogoImg from "../assets/img/logo/homelogo.png";
import posed from "react-pose";


const LogoDiv = posed.img({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});

class MyLogo extends Component {
  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        isVisible: !prevState.isVisible
      }));
    }, 5000);
  }

  render() {
      const { isVisible } = this.state;
      return (
          <LogoDiv src={LogoImg} pose={ isVisible ? 'visible' : 'hidden'} alt="logo" className="logo" />
      )
  }
}

export default MyLogo;
