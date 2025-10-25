import { useEffect } from 'react';
import request from '../utils/requester'
import { useRef } from 'react';
//import { UserContext } from '../contexts/UserContext';
import {useUserContext} from '../hooks/useUserContext';

const baseUrl = 'http://localhost:3030/users'

export const useLogin = () => {

   const abortRef = useRef(new AbortController())
   // call useRef() to declare a ref
    
     const login = async (email, password) => {
        return request.post(`${baseUrl}/login`, {email, password}, { signal: abortRef.current.signal })
     }

     useEffect(() => {     

      const abortController = abortRef.current;
      
       return () => abortController.abort()
       /*
       cleanup function will be called once, just before
       the component that uses useLogin is removed from the DOM(unmounted)
       */
     },[]);

     /*
     useEffect is tied to the lifecycle of the component that uses the hook.
     */

     return {
        login
     }

}

export const useRegister = () => {

   const register = (email,password) => {

      const payload = {
         email,
         password
      }
         return request.post(`${baseUrl}/register`, payload)
   }

   return {
      register
   }

}

export const useLogout = () => {

   const { accessToken } = useUserContext();
   const { userLogoutHandler } = useUserContext()

   useEffect(() => {

      if (!accessToken) {
         return;
      }

      const options = {
          headers: {
               'X-Authorization': accessToken
          }    
   }

   request.get(`${baseUrl}/logout`, null, options)
          .then(userLogoutHandler())

   },[accessToken, userLogoutHandler])

   return {
      isLoggedOut: !!accessToken
   }
   

  
}

/*
2 types of hooks:
onMount
onEvent
*/