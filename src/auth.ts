import {NextAuthOptions} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { FaildLogin, SuccessLogin } from './app/_type/AuthInterface'

export  const authOptions:NextAuthOptions={
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/login'
    },
    providers:[
        Credentials({
            name:"Credentials",
            credentials:{
                email:{},
                password:{}
            },
            authorize:async (credentials)=>{

                const resp =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
                    method:'POST',
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    }),
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                const payload:FaildLogin | SuccessLogin =await resp.json()
                console.log(payload);
                
                if('token' in payload){

                    return {
                        id:payload.user.email,
                        name:payload.user.name,
                        email:payload.user.email,
                        user: payload.user,
                        token:payload.token
                    }
                }else{
                    throw new Error('Invalid credentials')
                }
            }
        })
    ],
    callbacks:{
        jwt:({token , user})=>{
            if(user){

                token.user= user.user
                token.token= user.token
            }
            return token
        },
        session:({session , token})=>{
            session.user = token.user
            return session
        }
    }
}