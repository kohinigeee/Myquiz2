import FormData from "form-data"
import { AxiosRequestConfig } from "axios";

export const makeCORSRequest = ( request : AxiosRequestConfig ) => {
    request.withCredentials = true;

    return request
}

export const makeAxiosFormDataRequest = ( formData : FormData, req : AxiosRequestConfig ) => {
    req.headers = { ...formData.getHeaders }

    return makeCORSRequest(req)
}

export const makeFormDataFromObj = ( data : any ) : FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    })

    return formData
}