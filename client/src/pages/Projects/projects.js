import React, { Component } from "react";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Project from "../../components/Project";
import { List } from "../../components/List";

import API from "../../utils/API";

class Projects extends Component {
  state = {
    projects: [],
    q: "",
    message: "Search Projects Based on Technology"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getProjects = () => {
    API.getProjectByTech(this.state.q)
      .then(res =>
        this.setState({
          [name]: value
        })
      )
      .catch(() =>
        this.setState({
          projects: [],
          message: "No Project Found, Try a Different Technology"
        })
      );
  };

  getAllProjects = () => {
      API.getAllProjects()
        .then(res => 
            this.setState({
                projects: res.data
            })
        )
        .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
      event.preventDefault();
      this.getProjects
  };

  handleButtonSubmit = event => {
      event.preventDefault();
      this.getAllProjects;
  }

  render() {
      return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Card title="Personal Projects">
                        <Form
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleFormSubmit}
                            q={this.state.q}
                        />
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Card title="Results">
                        {this.state.projects.length ? (
                            <List>
                                {this.state.projects.map(project => (
                                    <Project
                                        key={project.id}
                                        name={project.name}
                                        description={project.description}
                                        image={project.image}
                                        technologies={project.technologies.join(", ")}
                                        linke={project.link}
                                    />
                                ))}
                            </List>
                        ) : (
                            <h2 className="text-center">{this.state.message}</h2>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
  }
}

export default Projects;