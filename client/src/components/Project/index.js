import React from "react";
import { ListItem } from "../List";
import "./style.css";

function Project({ name, description, image, technologies, link }) {
    return (
        <ListItem>
            <div className="row flex-wrap-reverse">
                <div className="col-md-8">
                    <h3 className="font-italic">{name}</h3>
                </div>
                <div className="col-md-4">
                    <div className="btn-container">
                        <a className="btn btn-light" target="_blank" rel="noopener noreferrer" href={link}>
                            View
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p className="font-italic small"> Made with: {technologies}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-4 md-2">
                    <img className="img-thumbnail img-fluid w-100" src={image} alt={name} />
                </div>
                <div className="col-12 col-sm-8 col-md-10">
                    <p>{description}</p>
                </div>
            </div>
        </ListItem>
    );
}

export default Project;