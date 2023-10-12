import axios from "axios";


export default axios.create({
    baseURL: "https://anjaandonovski-001-site1.btempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});