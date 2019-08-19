import axios from "axios";

export default {
    // Get projects from database
    getAllProjects: function() {
        return axios.get("/api/projects")
    },

    getProjectByTech: function(q) {
        return axios.get("/api/projects", { params: { q: "technology" + q } });
    }
}