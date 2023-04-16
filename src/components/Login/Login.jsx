import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider,getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';


const Login = () => {

    const [user,setUser] = useState(null)

    const auth = getAuth(app);
    console.log(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn=()=>{
        signInWithPopup(auth,provider)
        .then(result=>{
            const logInUser = result.user;
            console.log(logInUser)
            setUser(logInUser)
           
        })
        .catch(error=>{
            console.log("error",error.message)
        })
     }

     const handleGoogleSignOut=()=>{
        signOut(auth)
        .then(result=>{
            console.log("signOut result",result)
            setUser(null)
        })
        .catch(error=>{
            console.log(error)
        })

     }


    return (
        <div>
             {  user ? <button onClick={handleGoogleSignOut}>Google Signout</button>:
                <button onClick={handleGoogleSignIn}>Google Login</button> 
                 
             } 
 
            <div>
                {
                    user &&
                      <h1>User : {user.displayName}</h1>
                }
                  
            </div>
        </div>
    );
};

export default Login;