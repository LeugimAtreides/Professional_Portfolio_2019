import React from "react";
import Wrapper from "../../components/Wrapper"
import LostImage from "../../assets/img/404-image/404image.png";


function NotFound() {
    return (
        <Wrapper>
            <div className="row">
                <div className="col-md-12">
                    <div className="jumbotron">
                        <h1 className="text-center">Error 404: Lost in Space</h1>
                        <h1 className="text-center">
                            <span role="img" aria-label="Lost astronaut Emoji">
                                <img src={LostImage} alt="Lost astronaut" />
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default NotFound;