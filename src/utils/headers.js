export default class Headers {

    static getHeaders = () => {
        var json = {
            "Content-Type": "application/json"
        };
        return json;
    }

    static getHeaders2 = () => {
        var json = {
            "Content-Type": "application/json",
            "Authorization" : sessionStorage.getItem('token')
        };
        return json;
    }

    static getHeaders3 = () => {
        var json = {
            "Content-Type": "multipart/form-data",
            "Authorization" : sessionStorage.getItem('token')
        };
        return json;
    }
    

}