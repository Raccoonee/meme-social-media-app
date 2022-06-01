/* global google */
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/youmemelogo.png'
import {client} from "../client"
import GoogleSignInClient from './GoogleSignInClient'


export const Login = () => {
  const [loaded, setLoaded] = useState(false)
  GoogleSignInClient(() => {
    setLoaded(true);
  })
  
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleResponseGoogle 
    })
    google.accounts.id.renderButton(
      document.getElementById("google-sign-in"),
      {theme: "outline", size: "large"}
    )
    
  }, [])

  const navigate = useNavigate()
  const handleResponseGoogle = (response) => {
    var userObject = jwt_decode(response.credential)
    console.log(userObject)


    localStorage.setItem('user', userObject)

    const {name, sub, picture} = userObject

  
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }
    console.log(doc)

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', {replace: true})
      })
  }
 
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0  bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt='background of person on phone'/>
          </div>
          <div className="shadow-2xl">
         
          <div id="google-sign-in"></div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
