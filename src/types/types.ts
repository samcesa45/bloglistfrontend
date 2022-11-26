export type BlogProps = {
    id:string,
    title:string,
    author:string,
    url:string,
    likes:number
}

export type UserProps ={
    username:string,
    name:string,
    password:string,
    token:string
}

export type NotificationProps = {
    error:string,
    success:string
}