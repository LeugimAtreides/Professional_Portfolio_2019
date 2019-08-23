import React, { Component } from "react";

// Components
import Wrapper from "../../components/Wrapper";
import Video from "../../components/Video";
import Footer from "../../components/Footer";
// import Pill from "../../components/Pill";
import PillTwo from "../../components/PillTwo";
import Logo from "../../components/Logo";
import "./style.css";

class Home extends Component {

    render () {
        return (
            <div className="container.fluid home">
                <Video />
                <Wrapper>
                    <Logo />
                    {/* <Pill /> */}
                    <PillTwo />
                </Wrapper>
                <Footer />
            </div>
        )
    }
}

export default Home;