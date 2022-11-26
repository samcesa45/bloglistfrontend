import axios from 'axios'
const baseUrl = '/api/blogs'

let token:string 

const setToken = (newToken:string) => {
    token = `bearer ${newToken}`
}
const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async(newBlog:object) => {
    const config = {
        headers:{
            Authorization:token
        }
    }
    const response = await axios.post(baseUrl,newBlog, config)
    return response.data
}

const update = async(id:string, newBlog:object) => {
    const response = await axios.put(`${baseUrl}/${id}`,newBlog)
    return response.data
}


export const blogService = {
    setToken,
    getAll,
    create,
    update
}