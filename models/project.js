const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    technologies: { type: Array, required: true },
    link: { type: String, required: true }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;