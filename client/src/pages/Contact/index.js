import React, { Component } from "react";
import ContactForm from "../../components/Contact-Form";
import "./style.css"
import Card from "../../components/Card";

class Contact extends Component {
    render(){
        return (
            <Card name="Shoot Me A Message!" className="contact-card">
                <ContactForm />
            </Card>
        )
    }
}

export default Contact;