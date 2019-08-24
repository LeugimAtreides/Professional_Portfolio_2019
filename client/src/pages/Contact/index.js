import React, { Component } from "react";
import ContactForm from "../../components/Contact-Form";

import Card from "../../components/Card";

class Contact extends Component {
    render(){
        return (
            <Card>
                <ContactForm />
            </Card>
        )
    }
}

export default Contact;