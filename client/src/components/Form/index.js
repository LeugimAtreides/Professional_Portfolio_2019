import React from "react";

function Form({ q, handleInputChange, handleFormSubmit, handleButtonSubmit }) {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="Query">
                    <strong>Project</strong>
                </label>
                <input
                    className="form-control"
                    id="Title"
                    type="text"
                    value={q}
                    placeholder="Search for a technology to find a matching project"
                    name="q"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="pull-right">
                <button
                    onClick={handleFormSubmit}
                    type="submit"
                    className="btn btn-lg btn-danger float-right"
                >
                    Search
                </button>
            </div>
            <div className="pull-right">
                <button
                    onClick={handleButtonSubmit}
                    type="submit"
                    className="btn btn-lg btn-danger float-right"
                >
                    Show All
                </button>
            </div>
        </form>
    );
}

export default Form;