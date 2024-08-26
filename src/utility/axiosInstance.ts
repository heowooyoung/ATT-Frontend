import env from "@/env"
import axios, { AxiosInstance } from "axios";

const djangoAxiosInst: AxiosInstance = axios.create({
    baseURL: env.api.MAIN_API_URL,
    timeout: 2500,
})

const fastapiAxiosInst: AxiosInstance = axios.create({
    baseURL: env.api.AI_BASE_URL,
    timeout: 10000, // 가끔 응답 오래걸리므로 2.5초 -> 10초로 하기
})


export default { djangoAxiosInst, fastapiAxiosInst }