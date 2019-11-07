import axios from 'axios';
import download from 'downloadjs';
import projectRouter from '../../../../02-portfolio-db/routes/api/projects';

export const baseURL = 'http://localhost:3000/api/';
const path = '/api/';

class ProjectService {
    static baseURL = baseURL;

    static resourcePath = path || "";

    constructor(api, demo = false, baseURLOverride) {
        this.api = api;
        this.demo = demo;
        this.baseURL = baseURLOverride;
    }

    getBaseURL = () => {
        return this.baseURL || ProjectService.resourcePath || ProjectService.baseURL;
    }

    async getProjects(paginateOptions) {
        const { data } = await axios.get(
            `${this.getBaseURL()}/projects?paginateOptions=${JSON.stringify(paginateOptions)}`
        );
        return data
    }

    async getProject(projectId) {
        const { data } = await axios.get(
            `${this.getBaseURL()}/${projectId}/projects/`
        );
        return data
    }
}

export default ProjectService;