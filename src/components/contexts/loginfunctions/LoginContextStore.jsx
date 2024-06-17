import React ,{useState}from 'react'
import { LoginContext } from './LoginContext'
import axios from 'axios';
function LoginContextStore( { children } ) {

    const [loginStatus,setLoginStatus] = useState(false);
    const [currentUser,setCurrentUser] = useState({});
    const [error,setError] = useState("");
    const login =(userLogIndata)=>{
        axios.post('http://localhost:4000/user-api/login-user',userLogIndata)
        .then(response=>{
            if(response.data.message==="login success")
                {
                    setCurrentUser({...response.data.loggedUserDetails});

                    setLoginStatus(true);

                    setError("")

                    localStorage.setItem("token",response.data.token);

                    
                }
            else
            {
                setError(response.data.message)
            }
        })
        .catch(
            err=>{
                setError(err.message)
            }
        )
    }


    const logout = () =>{
        localStorage.clear();

        setLoginStatus(false);
    }


  return (
    <LoginContext.Provider value={[currentUser,error,loginStatus,login,logout]}>
      { children }
    </LoginContext.Provider>
  )
}

export default LoginContextStore
