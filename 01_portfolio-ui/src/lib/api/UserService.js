import axios from 'axios';
import download from 'downloadjs';

export const baseURL = 'http://localhost:3000/api/';
const path = '/api';


class UserService {

    static baseURL = baseURL;

    static resourcePath = path || "";

    constructor(api, demo = false, baseURLOverride) {
        this.api = api;
        this.demo = demo;
        this.baseURL = baseURLOverride;
    }
    
    getBaseURL = () => {
        return this.baseURL || UserService.resourcePath || UserService.baseURL;
    }

    async genVisitorKey(ipAddress) {
        const { data } = await axios.get(
            this.getBaseURL() + `users/genVisitorKey/${ipAddress}`
        );

        return data
    }

    async isMe(){
        const { data } = await axios.get(
            this.getBaseURL() + `users/me`
        );

        return data
    }

}

export default UserService