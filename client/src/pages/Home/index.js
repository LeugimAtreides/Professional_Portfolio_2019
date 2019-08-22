import React, { Component } from "react";

// Components
import Wrapper from "../../components/Wrapper";
// import Video from "../../components/Video";
import Footer from "../../components/Footer";
import Pill from "../../components/Pill";

class Home extends Component {

    render () {
        return (
            <div className="container.fluid">
                <Wrapper>
                    <Pill />
                </Wrapper>
                <Footer />
            </div>
        )
    }
}

export default Home;