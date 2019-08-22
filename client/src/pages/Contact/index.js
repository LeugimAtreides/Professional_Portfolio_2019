import React, { Component } from "react";
import ContactForm from "../../components/Contact-Form";

import Wrapper from "../../components/Wrapper";

class Contact extends Component {
    render(){
        return (
            <Wrapper>
                <ContactForm />
            </Wrapper>
        )
    }
}

export default Contact;