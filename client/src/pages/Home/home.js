import React, { Component } from "react";

// Components
import Wrapper from "../../components/Wrapper";
import Video from "../../components/Video";
import Footer from "../../components/Footer";
import Pill from "../../components/Pill";

class Home extends Component {

    render () {
        return (
            <Wrapper>
                <Video />
                    <Pill />
                <Footer />
            </Wrapper>
        )
    }
}

