import React, { Component } from "react";
import "./style.css";
import FormValidator from "../../utils/FormValidator";
import axios from "axios";

class ContactForm extends Component {

  constructor() {
    super();

    this.validator = new FormValidator([
      { field: "name", method: "isEmpty", validWhen: false, message: "Please provide a name"},
      { field: "subject", method: "isEmpty", validWhen: false, message: "Please provide a subject"},
      { field: "email", method: "isEmpty", validWhen: false, message: "Please provide an email address"},
      { field: "email", method: "isEmail", validWhen: true, message: "That is not valid email"},
      { field: "message", method: "isEmpty", valideWhen: false, message: "Please provide a message"}
    ]);

    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      validation: this.validator.isValid(),
    };

    this.submitted = false;

  }


  sendEmail = () => {

    axios({
      method: "post",
      url: "mail.php",
      data: {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
      if (res.data) {

        this.setState({
          projects: []
        });

      

      }
    }).catch(err => console.log(err))
  };

  onHandleContactFormSubmit = event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      this.sendEmail();
    }
  };

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    let validation = this.submitted ?
                      this.validator.validate(this.state) :
                      this.state.validation

      return (
          <section className="mb-4">

              {/* Section Heading */}
              <h2 className="h1-responsive font-weight-bold text-center my-4">Contact Us</h2>

              {/* Section Description */}
              <p className="text-center w-responsive mx-auto mb-5">Shoot me a message! I will reply with great speed</p>

              <div className="row">

                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                        <div className="row">

                            <div className="col-md-6">
                                <div className={validation.name.isInvalid && "has-error md-form mb-0"}>
                                    <input type="text" id="name" value={this.state.name} onChange={this.handleFormChange} name="name" className="form-control" />
                                    <label htmlFor="name" className="">Your name</label>
                                    <span className="help-block">{validation.name.message}</span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className={validation.email.isInvalid && "has-error md-form mb-0"}>
                                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleFormChange} className="form-control" />
                                    <label htmlFor="email" className="">Your email</label>
                                    <span className="help-block">{validation.email.message}</span>
                                </div>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12">
                                <div className={validation.subject.isInvalid && "has-error md-form mb-0"}>
                                    <input type="text" id="subject" name="subject" value={this.state.subject} onChange={this.handleFormChange} className="form-control" />
                                    <label htmlFor="subject" className="">Subject</label>
                                    <span className="help-block">{validation.subject.message}</span>
                                </div>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12">

                                <div className={validation.message.isInvalid && "has-error md-form"}>
                                    <textarea type="text" id="message" name="message" value={this.state.message} onChange={this.handleFormChange} rows="2" className="form-control md-textarea"></textarea>
                                    <label htmlFor="message">Your message</label>
                                    <span className="help-block">{validation.message.message}</span>
                                </div>

                            </div>
                        </div>
                    </form>

                    <div className="text-center tet-md-left">
                        <button className="btn btn-primary" onClick={this.onHandleContactFormSubmit}>
                            Send message
                        </button>
                    </div>

                </div>

                    <div className="col-md-3 text-center">
                        <ul className="list-unstyled mb-0">
                            <li>
                                <i className="fas fa-map-marker-alt fa-2x"></i>
                                <p>Oviedo, FL, 32765</p>
                            </li>

                            <li>
                                <i className="fas fa-phone mt-4 fa-2x"></i>
                                <p>+1 (904) 501-8415</p>
                            </li>

                            <li>
                                <i className="fas fa-envelope mt-4 fa-2x"></i>
                                <p>m.villarrea789@hotmail.com</p>
                            </li>
                        </ul>
                    </div>


                </div>
              
          </section>
      )
  }
}

export default ContactForm;