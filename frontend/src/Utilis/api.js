import axios from "axios"



const URL="https://url-shortener-jsff.onrender.com"

export const CreateShortenerURL=(obj)=>{
    return   axios.post(URL+"/add",obj)
}

export const GetShortenerURL=()=>{
    return   axios.get(URL+"/get")
}