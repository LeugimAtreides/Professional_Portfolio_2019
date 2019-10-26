import React, { Component } from 'react';
import posed from 'react-pose';

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

    render() {
        const { isVisible } = this.state;
        return (
            <TextEntry pose={ isVisible ? 'visible' : 'hidden' } className="text-entry-div">Welcome</TextEntry>
        )
    }
}

export default WelcomeText;