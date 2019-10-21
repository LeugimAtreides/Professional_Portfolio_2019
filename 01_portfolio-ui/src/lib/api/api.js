import UserService from './UserService';
import ProjectService from './ProjectService';

const DEMO = false;

export class Api {
    constructor(ipToken, demo = DEMO){
        this.token = ipToken;
        this.demo = demo;
        this.users = new UserService(this, demo);
        this.projects = new ProjectService(this, demo);
    }
}

export default Api;