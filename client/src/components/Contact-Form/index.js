import React, { Component } from "react";
import "./style.css";

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    message: ""
  };

  validateForm = () => {
    if (this.state.name == "") {
      document.getElementById("status").innerHTML = "Name cannot be empty";
      return false;
    }

    if (this.state.email == "") {
      document.getElementById("status").innerHTML = "Email cannot be empty";
      return false;
    } else {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.state.email)) {
        document.getElementById("status").innerHTML = "Email format invalid";
        return false;
      }
    }

    if (this.state.subject == "") {
      document.getElementById("status").innerHTML = "Subject cannot be empty";
      return false;
    }

    document.getElementById("status").innerHTML = "Sending...";
    document.getElementById("contact-form").submit();
  };

  sendEmail = () => {
    $.ajax({
      url: "mail.php",
      type: "POST",
      data: formData,
      success: function(data, textStatus, jqXHR) {
        $("#status").text(data.message);
        if (data.code)
          //If mail was sent successfully, reset the form.
          $("#contact-form")
            .closest("form")
            .find("input[type=text], textarea")
            .val("");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $("#status").text(jqXHR);
      }
    });
  };

  onHandleContactFormSubmit = () => {
    this.validateForm().then(this.sendEmail);
  };

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
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
                                <div className="md-form mb-0">
                                    <input type="text" id="name" value={this.state.name} onChange={this.handleFormChange} name="name" className="form-control" />
                                    <label for="name" className="">Your name</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="md-form mb-0">
                                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleFormChange} className="form-control" />
                                    <label for="email" className="">Your email</label>
                                </div>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <input type="text" id="subject" name="subject" value={this.state.subject} onChange={this.handleFormChange} className="form-control" />
                                    <label for="subject" className="">Subject</label>
                                </div>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-12">

                                <div className="md-form">
                                    <textarea type="text" id="message" name="message" value={this.state.message} onChange={this.handleFormChange} rows="2" className="form-control md-textarea"></textarea>
                                    <label for="message">Your message</label>
                                </div>

                            </div>
                        </div>
                    </form>

                    <div className="text-center tet-md-left">
                        <a className="btn btn-primary" onClick={this.onHandleContactFormSubmit}>
                            Send message
                        </a>
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