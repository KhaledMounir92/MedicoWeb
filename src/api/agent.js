import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate  } from "react-router-dom"
const sleep=(delay)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
    
}
axios.defaults.baseURL='https://medicoapii.herokuapp.com/'
axios.interceptors.request.use(config=>{
    const token=localStorage.getItem("token")

    if (token) config.headers.Authorization=`Bearer ${token}`
    return config;
}

)
axios.interceptors.response.use(async response=>{
   
        await sleep(1000)
        return response;
    
},(error)=>{
    return Promise.reject(error)
})
const responseBody=(response)=>response.data
const request={
    get:(url)=>axios.get(url).then(responseBody),
    del:(url,body)=>axios.delete(url,body).then(responseBody),
    post:(url,body)=>axios.post(url,body).then(responseBody),
    put:(url,body)=>axios.put(url,body).then(responseBody),
    patch:(url,body)=>axios.patch(url,body).then(responseBody),

}

const account={
    login:(user)=>request.post('signin',user)

}
const role={
    
    getAll:()=>request.get('role/getAllRoles')
}
const admin={
    getAll:()=>request.get('admin/getAllAdmins'),
    edit:(admin)=>request.patch(`admin/editAdmin`,admin),
    delete:(body)=>request.del(`admin/deleteAdmin`,body),
    add:(admin)=>request.post(`signup`,admin)


}

const agent={
    account,
    admin,
    role
}
export default agent
