import { Auth } from "aws-amplify"
import { setEmailOnLogin } from "../slices/authSlice"
import { useAppDispatch } from "../hooks/hooks"
import React, { useState } from "react"


type RegisterForm = {
  err: any
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}
export const handleRegisterError = async ({ err, setErrorMessage } : RegisterForm) => {
  console.log(err)
  if (err.status == 429) setErrorMessage('Too many requests, please try again later')
  else if ('data' in err && err.data.message) setErrorMessage(err.data.message)
  else if (err.error) setErrorMessage(err.error)
  else (setErrorMessage(JSON.stringify(err) ))
}
    // set error handling for user exists 
    // invalid password 

