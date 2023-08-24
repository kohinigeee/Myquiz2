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
