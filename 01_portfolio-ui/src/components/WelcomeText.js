import React, { Component } from 'react';
import posed from 'react-pose';
import Redirect from 'react-router-dom';
const TextEntry = posed.div({
    visible: { opacity: 1},
    hidden: { opacity: 0}
})

class WelcomeText extends Component {
    componentDidMount() {
        setInterval(() => {
            this.setState(prevState => ({
                isVisible: !prevState.isVisible
            }))
        }, 7000);
    }

    routeToHome = () => {
        if (this.state.isVisible) {
            return <Redirect to="/home" />
        }
    }

    render() {
        const { isVisible } = this.state;
        return (
            <TextEntry pose={ isVisible ? 'visible' : 'hidden' } onClick={this.routeToHome} className="text-entry-div">Welcome</TextEntry>
        )
    }
}

export default WelcomeText;