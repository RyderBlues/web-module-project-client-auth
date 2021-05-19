import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';



const Login = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        credentials: {
            username: 'Lambda School',
            password: 'i<3Lambd4',
        }
    });
    

    const { push } = useHistory();

    const handleChange = (e) => {
        setCredentials({
                ...credentials,
                [e.target.name]: e.target.value
        })
    }

    const login = e => {

        e.preventDefault();
        setIsLoading(true);

        axios.post('http://localhost:5000/api/login', credentials)
          .then(res=>{
            setIsLoading(false);
            localStorage.setItem("token", res.data.payload);
            console.log(res);
            push('/friendslist');
          })
          .catch(err=>{
            setIsLoading(false);
            console.log(err);
          });
      };

      

    return(
        <div>
            <nav>
                {isLoading ? <div>Loading!</div>: null}

                <form onSubmit={login}>
                    <input 
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      placeholder="Username"
                      />
                    <input 
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    <button>Log in</button> 
                </form>
            </nav>
        </div>
    )
}

export default Login;